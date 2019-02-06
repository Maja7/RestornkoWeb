
function Logout() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
         window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/';
    }

}

function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

        }

    });

  document.getElementById('btnLogout').addEventListener('click', Logout, false);

}

window.onload = function () {
     
    initApp();
      firebase.auth().onAuthStateChanged(firebaseUser => {
	  if(firebaseUser){
		console.log(firebaseUser);
		document.getElementById('btnLogout').addEventListener('click', Logout, false);
	  }else{
		  console.log('not logged in');
		  window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/';
	  }
  });
};
