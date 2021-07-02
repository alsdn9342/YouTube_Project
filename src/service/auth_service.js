import firebase from 'firebase';
import firebaseApp from './firebase'


class AuthService {
  
    login(providerName){
      const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
      return firebaseApp.auth().signInWithPopup(authProvider);
    }

    logout() {
      firebase.auth().signOut();
    }

    //Check if user is signed in or not. 
    onAuthChange(onUserChanged){
      firebase.auth().onAuthStateChanged(user => {
        onUserChanged(user);
      })

    }
}

export default AuthService;