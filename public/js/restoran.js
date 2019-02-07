var count=0;
var tblUsers = document.getElementById('tbl_users_list');
var databaseRef = firebase.database().ref('users/');
var databaseRefRest = firebase.database().ref('restoran/');
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

function UnesiRestoran() {
    
		const dbRef = firebase.database().ref().child('restoran');
		
		dbRef.on('value',function(snap){
			count++;
		});
		
	count++;
	console.log(count);
    var naziv = document.getElementById('nazivRestorana').value;
    var adresa = document.getElementById('adresa').value;
    var kontakt = document.getElementById('kontakt').value;
	var weblink = document.getElementById('weblink').value;
	var opis = document.getElementById('opis').value
	var slika = document.getElementById('file-input');

    UploadFiles(datoteke, count);
    var data = {
        adresa: adresa,
        kontakt: kontakt,
		nazivRestorana: naziv,
		opis: opis,
		restoranId: count,
		slika: "gs://hr-foi-restoranko.appspot.com/restorani/"+count+".jpg",
		webLink: weblink

    }

    var updates = {};
    updates['/restoran/' + count] = data;
    firebase.database().ref().update(updates);


    alert('Restoran je uspješno kreiran!');
    reload_page();
}


var datoteke = [];

function FileDialog() {
    $('#file-input').trigger('click');
    var inputElement = document.getElementById('file-input');
    inputElement.onchange = function (event) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(inputElement.files[inputElement.files.length - 1]);
        fileReader.onloadend = function (event) {
            $('#file-list').append("<li id='" + this.value + "'><img height='50px' width='50px' src='" + event.target.result + "' alt='" + this.value + "'></li>&nbsp;&nbsp;");
            datoteke.push(inputElement.files[0]);
        };
    };
}

function UploadFiles(datoteke, resID) {
    for (var i = 0; i < datoteke.length; i++) {
        Upload(datoteke[i], resID);
    }

}
function Upload(datoteka, resID) {
    try {
        var storageReference = firebase.storage().ref("slikeRestorana/" + resID + "/" + datoteka.name);
        storageReference.put(datoteka);
    } catch (exception) {
        alert("exception.message");
    }
}
window.onload = function () {
     
      firebase.auth().onAuthStateChanged(firebaseUser => {
	  if(firebaseUser){
		
		var uid = firebase.auth().currentUser.uid;
		document.getElementById('btnRestoran').addEventListener('click', UnesiRestoran, false);
	  
	  }else{
		  console.log('not logged in');
		  window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/';
	  }
  });
};