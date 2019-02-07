var database;

function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var korisnickoIme = user.korisnickoIme;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.putanjaSlike;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

        } else {

        }

    });
	
}


window.onload = function () {
     
    initApp();
      firebase.auth().onAuthStateChanged(firebaseUser => {
	  if(firebaseUser){
		var database = firebase.database();
		var uid = firebase.auth().currentUser.uid;
		const podaci = getElementById('korisnik');
		const dbRef = firebase.database().ref().child('user');
		const dbRefUser = dbRef.child(uid);
		
		dbRefUser.on('child_added',snap => {
			podaci.innerHTML = snap.val();
		});
		
		 
		  document.getElementById('slikaKorisnika').style.backgroundImage = "url(images/avatar.png)";
		  document.getElementById('position').innerHTML = 'moderator';
	  }else{
		  console.log('not logged in');
	  }
  });
};