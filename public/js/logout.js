
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

}
var datoteke = [];
const refRest = firebase.database().ref().child('restoran');
	
	
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

function UnesiRestoran() {
const ref = firebase.database().ref();
var id;
ref.child("restoran").on("value", function(snapshot) {
  id = snapshot.numChildren();
})
id++; 
    var naziv = document.getElementById('naziv').value;
    var adresa = document.getElementById('adresa').value;
    var kontakt = document.getElementById('kontakt').value;
	var weblink = document.getElementById('weblink').value;
	var opis = document.getElementById('opis').value;
	

	
   var data = {
        
		adresa: adresa,
        kontakt: kontakt,
		nazivRestorana: naziv,
		opis: opis,
		restoranId: id,
		slika: "gs://hr-foi-restoranko.appspot.com/restorani/"+id+".jpg",
		webLink: weblink

    };
   	UploadFiles(datoteke, id);
	
    var updates = {};
    updates['/restoran/'+id] = data;
    firebase.database().ref().update(updates);
	
    alert('Restoran je uspješno kreiran!');
    window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/restoran.html';
}

function UploadFiles(datoteke, id) {
    for (var i = 0; i < datoteke.length; i++) {
		id= id+i;
        Upload(datoteke[i], id);
    }

}
function Upload(datoteka, id) {
    try {
        var storageReference = firebase.storage().ref("restorani/" + id +".jpg");
        storageReference.put(datoteka);
    } catch (exception) {
        alert("exception.message");
    }
}
window.onload = function () {
    
    initApp();
      firebase.auth().onAuthStateChanged(firebaseUser => {
	  if(firebaseUser){
		//console.log(firebaseUser);
		
		var uid = firebase.auth().currentUser.uid;
		const podaci = document.getElementById('korisnik');
		const email = document.getElementById('position');
		const slika = document.getElementById('slikaKorisnika');
		const dbRef = firebase.database().ref().child('user');
		const dbRefUser = dbRef.child(uid);
		const stRef = firebase.storage().ref();
		
		
		dbRefUser.on('value',snap => {
			
			podaci.innerHTML = snap.child('ime').val() + " " + snap.child('prezime').val();
			email.innerHTML=snap.child('email').val();
			var korIme = snap.child('korisnickoIme').val();
			slika.style.backgroundImage = "url(images/avatar.png)";
		});
		
		const dbRefRec = firebase.database().ref().child('recenzije');
		
		dbRefRec.on('child_added',snap => {
			var restoran = snap.child('nazivRestorana').val();
			var ocjena = snap.child('recenzijaLjestvica').val();
			var info = snap.child('recenzijaPovratnaInfo').val();
			
			$("#recenzija").append("<tr><td>"+restoran+"</td><td>"+ocjena+"</td><td>"+info+"<td></tr>");
		});
		
		const dbRefRez = firebase.database().ref().child('rezervacija');
		
		dbRefRez.on('value',function(snapshot) {
			snapshot.forEach(function(childSnapshot){
				var childKey = childSnapshot.key;
				const dbRefRezSt = firebase.database().ref().child('rezervacija/'+childKey);
				dbRefRezSt.on('child_added',snap => {
					var restoran = snap.child('nazivRestorana').val();
					var ID = snap.child('rezervacijaId').val();
					var korisnik = snap.child('korisnik').val();
					var dolazak = snap.child('dolazak').val();
					var odlazak = snap.child('odlazak').val();
					var potvrda = snap.child('potvrdaDolaska').val();
					$("#rezervacije").append("<tr><td>"+ID+"</td><td>"+restoran+"</td><td>"+korisnik+"</td><td>"+dolazak+"</td><td>"+odlazak+"</td><td>"+potvrda+"<td></tr>");
				});
			});
		});
		
		document.getElementById('btnLogout').addEventListener('click', Logout, false);
	  }else{
		  console.log('not logged in');
		  window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/';
	  }
  });
};
