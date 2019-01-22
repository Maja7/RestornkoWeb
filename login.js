


function toggleSignIn() {
    if (firebase.auth().currentUser) {

        firebase.auth().signOut();
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';




    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        alert(email + " " + password);
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            alert("uspjesno");
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                alert('Pogreša lozinka.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;


        });

    }
    document.getElementById('quickstart-sign-in').disabled = true;
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

            document.getElementById('quickstart-sign-in-status').textContent = 'Prijavljen';
            document.getElementById('quickstart-sign-in').textContent = 'Odjavi';

            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');


        } else {

            document.getElementById('quickstart-sign-in').textContent = 'Prijavi';
            document.getElementById('quickstart-sign-in-status').textContent = 'Odjavljen';
            document.getElementById('quickstart-sign-in').textContent = 'Prijavi';
            document.getElementById('quickstart-account-details').textContent = 'null';



        }

        document.getElementById('quickstart-sign-in').disabled = false;

    });

  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);

}







window.onload = function () {
     
    initApp();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
        } else {
            document.getElementById("res").hidden = true;
        }
    });
};
