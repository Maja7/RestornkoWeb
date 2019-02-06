
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
var tblUsers = document.getElementById('tbl_users_list');
var databaseRef = firebase.database().ref('users/');
var rowIndex = 1;

databaseRef.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var row = tblUsers.insertRow(rowIndex);
        var cellId = row.insertCell(0);
        var cellName = row.insertCell(1);
        cellId.appendChild(document.createTextNode(childKey));
        cellName.appendChild(document.createTextNode(childData.user_name));

        rowIndex = rowIndex + 1;
    });
});

window.onload = function () {
     
    initApp();
      firebase.auth().onAuthStateChanged(firebaseUser => {
	  if(firebaseUser){
		  console.log(firebaseUser);
		  
		  
		  
		  document.getElementById('korisnik').innerHTML = firebaseUser.email;
		  document.getElementById('slikaKorisnika').style.backgroundImage = "url(images/avatar.png)";
		  document.getElementById('position').innerHTML = 'moderator';
	  }else{
		  console.log('not logged in');
	  }
  });
};