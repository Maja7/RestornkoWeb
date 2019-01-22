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

function Registriraj() {
    var ime = document.getElementById('ime').value;
    var prezime = document.getElementById('prezime').value;
    var korime = document.getElementById('korime').value;
    var email = document.getElementById('email').value;
    var lozinka = document.getElementById('lozinka').value;
    var tip = document.getElementById('tip').value;



    var uid = firebase.database().ref().child('user').push().key;

    var data = {
        korisnik_id: uid,
        ime: ime,
        prezime: prezime,
        korime: korime,
        email: email,
        lozinka: lozinka,
        tipKorinsika: tip

    }

    var updates = {};
    updates['/user/' + uid] = data;
    firebase.database().ref().update(updates);

    firebase.auth().createUserWithEmailAndPassword(email, lozinka).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    alert('Korisnik je uspješno registriran');
    reload_page();
}

 