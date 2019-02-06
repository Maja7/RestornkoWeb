
function SignIn() {
    if (firebase.auth().currentUser) {

        firebase.auth().signOut();
        document.getElementById('email').value = '';
        document.getElementById('lozinka').value = '';

    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('lozinka').value;
        
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/';
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                alert('Pogreša lozinka.');
            } else {
                alert(errorMessage);
            }
            console.log(error);


        });

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

        } else {

        }

    });

  document.getElementById('prijava').addEventListener('click', SignIn, false);

}

window.onload = function () {
     
    initApp();
      firebase.auth().onAuthStateChanged(firebaseUser => {
	  if(firebaseUser){
		  //console.log(firebaseUser);
		  window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/pocetna.html';
	  }else{
		  console.log('not logged in');
	  }
  });
};
