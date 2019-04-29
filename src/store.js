import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tours: [
      //   {
      //     imageUrl:
      //       "https://www.bikeandrollnyc.com/wp-content/uploads/photo-1459508583695-86e229e8855a.jpg",
      //     date: "2019-05-12",
      //     id: 1,
      //     title: "Central Park Tour",
      //     description: `Experience hidden Central Park locations only a true New York City historian can help you find.
      // Visit some of Central Park's least-trafficked, truly historic and most beautiful locations all above 100th Street.`
      //   },
      //   {
      //     imageUrl:
      //       "http://mustseeplaces.eu/wp-content/uploads/2017/07/brooklyn-bridge.jpg",
      //     date: "2019-05-05",
      //     id: 2,
      //     title: "Brooklyn Bridge Walking Tour",
      //     description: `Discover New York's vibrant nightlife on a
      // guided walking tour at night of the East River waterfront and the iconic Brooklyn Bridge.`
      //   }
    ],
    user: null,
 
  },
  mutations: {
    registerForTour(state, payload){
       //get id for the tour for which user is registered
       const id = payload.id
       if (state.user.registeredTours.findIndex(tour=> tour.id ===id)>=0){
         return 
       }
       state.user.registeredTours.push(id)
       state.user.fbKeys[id] = payload.fbKey
    },
    unRegisterFromTour(state, payload){
        const registeredTours = state.user.registeredTours
        console.log('PAYLOAD', payload)
        console.log('REGISTEREDTOURS', registeredTours)
        console.log('USER', state.user)
        for (let i=0; i<registeredTours.length; i++) {
          if (registeredTours[i] === payload) {
            console.log('!!!!!!!!!!!!!!!!!!!!', i)
            registeredTours.splice(i, 1);

          }
      }
    
      //  registeredTours.splice(registeredTours.findIndex(tour=> tour.id ===payload), 1)
        Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedTours(state, payload) {
      state.tours = payload;
    },
    createTour(state, payload) {
      state.tours.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    updateTourData (state, payload) {
      const tour = state.tours.find(tour => {return tour.id === payload.id})
      if (payload.title) {
        tour.title = payload.title
      }
      if (payload.description) {
        tour.description = payload.description
      }
    }
  },
  actions: {
    registerUserForTour ({commit, getters}, payload){
      const user = getters.user
     
       firebase.database().ref('/users/'+ user.id).child('/registration/') //nodes
       .push(payload).then((data)=>{
         commit('registerForTour', {id:payload, fbKey: data.key})
       }).catch(error=>  {console.log(error)})
    },
    unRegisterUserFromTour ({commit, getters}, payload){
      const user = getters.user
      const fbKey = user.fbKeys[payload]

     // firebase.database().ref('/users/'+ user.id + '/registration/').child(fbKey) 
     firebase.database().ref('/users/'+ user.id + '/registration/').child(fbKey).remove().then(()=>{
         commit('unRegisterFromTour',payload)
       }).catch(error=>  {console.log(error)})

    },
    loadTours({ commit }) {
      firebase.database().ref("tours").once("value").then(data => {
          const tours = [];
          const obj = data.val();
          for (let key in obj) {
            tours.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              creatorId: obj[key].creatorId
            });
          }
          commit("setLoadedTours", tours);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createTour({ commit, getters }, payload) {
      const tour = {
        title: payload.title,
        description: payload.description,
        imageUrl: payload.imageUrl,
        date: payload.date,
        creatorId: getters.user.id
      };
      firebase.database() .ref("tours").push(tour).then(data => {
          console.log(data);
          const key = data.key;
          //const key =  Math.floor(100000 + Math.random() * 900000)
          commit("createTour", { ...tour, id: key });
        })
        .catch(error => console.log(error));
    },

    signUserUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
         
          const newUser = {
            id: user.uid,
            registeredTours: [],
            fbKeys:{}
          };
          commit("setUser", newUser);
        })
        .catch(error => {
        
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
    
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user => {
       
          const newUser = {
            id: user.uid,
            registeredTours: [],
            fbKeys:{}
          };
          commit("setUser", newUser);
        })
        .catch(error => {
        
          console.log(error);
        });
    },

    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, registeredTours: [],   fbKeys:{} });
    },

    fetchUser ({commit, getters}) {
          firebase.database().ref('/users/'+ getters.user.id + '/registration/').once('value')
          .then(data => {
            const valuess = data.val()
            let registeredTours = []
            let obj = {}
            for (let key in valuess ) {
              registeredTours.push(valuess[key])
              obj[valuess[key]] = key
            }
          //  console.log(registeredTours)
          //  console.log(obj)
          const updatedUser = {
            id: getters.user.id,
            registeredTours: registeredTours,
            fbKeys: obj
          }
          commit('setUser', updatedUser)
          }).catch(error => {console.log(error)})
    },

    SIGNOUT({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },

    updateTour({commit}, payload ) {
      const updatedTour = {}
      if (payload.title) {
        updatedTour.title = payload.title
      }
      if (payload.description) {
        updatedTour.description = payload.description
      }
      firebase.database().ref('tours').child(payload.id).update(updatedTour)
      .then(() => {commit ('updateTourData', payload)}).catch(error=> {console.log(error)})
    }
  },
  getters: {
    getTours(state) {
      return state.tours.sort((a, b) => {
        return a.date > b.date;
      });
    },
    featuredTours(state, getters) {
      return getters.getTours.slice(0, 5);
    },
    getTour(state) {
      return id => {
        return state.tours.find(tour => {
          return tour.id === id;
        });
      };
    },
    user(state) {
      return state.user;
    }
  }
});
