import Rebase from 're-base';
import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyA28eqlVDlLfNeVeCvdCCNaPuTtIax1qYw",
    authDomain: "catch-of-the-day-akshat.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-akshat.firebaseio.com"
}) 


const base = Rebase.createClass(firebaseApp.database());


export { firebaseApp };

export default base;
