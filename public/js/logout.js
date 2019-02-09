var string="";
function Logout() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
         window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/';
    }

}

function prikaziJelovnik(id){
	$("#jelovnik tr").remove();
	document.getElementById("podaciMeni").innerHTML = " ";
	document.getElementById("prikazJelovnika").style.display = "block";
	document.getElementById("prikazMenija").style.display = "none";
	document.getElementById('jela').innerHTML = " ";
	const dbRefJelo = firebase.database().ref().child('rezerviraniJelovnici');
		
	dbRefJelo.on('child_added',snap => {
		var rezervacija = snap.child('rezervacijaId').val();
		if(rezervacija == id){
			var idJelovnika = snap.child('jelovnikId').val();
			var kolicina = snap.child('kolicina').val();
			$("#jelovnik").append("<tr><td><button type='button' style='width:100%;' onclick='prikaziMeni("+idJelovnika+")'>"+idJelovnika+"</td><td>"+kolicina+"</td></tr>");
		}
	
	});
}


function prikaziMeni(id){
	document.getElementById('jela').innerHTML = " ";
	document.getElementById("podaciMeni").innerHTML = " ";
	document.getElementById("prikazMenija").style.display = "block";
		string = " ";
	const dbRefMeni = firebase.database().ref().child('jelovnik');
	dbRefMeni.on('child_added',snap => {
		var meniId = snap.child('jelovnikId').val();
		if(meniId == id){
			var naziv = snap.child('naziv').val();
			var cijena = snap.child('cijena').val();
			
			document.getElementById("podaciMeni").innerHTML = "Meni: "+ naziv + ", " + cijena +"kn";
			jeloJelovnik(meniId);
		}
	});
		document.getElementById('jela').innerHTML =string;
}
function jeloJelovnik(id){
	const dbRefMeniJela = firebase.database().ref().child('jeloNaJelovniku');
	dbRefMeniJela.on('child_added',snap => {
		var idJelovnik = snap.child('jelovnikId').val();
		if(idJelovnik == id){
			var idJelo = snap.child('jeloId').val();
			prikaziJelo(idJelo);
		}
	});
}
function prikaziJelo(id){
	const dbRefJelo = firebase.database().ref().child('jelo');
	dbRefJelo.on('child_added',snap => {
		var idJela = snap.child('jeloId').val();
		if(idJela == id){
			var naziv = snap.child('nazivJela').val();
			if(string.includes(naziv) == false){
				string += naziv + "<br>";
			}
		}
	});
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

function KreirajMeni(){
	const ref = firebase.database().ref();
	var idMeni;
	ref.child("jelovnik").on("value", function(snapshot) {
		idMeni = snapshot.numChildren();
	});
	idMeni++; 
	var nazivMenija = document.getElementById('nazivMenija').value;
    var cijena = document.getElementById('cijena').value;
    var restoran = document.getElementById('listaRestorani').value;

	firebase.database().ref('jelovnik').child(idMeni).set({
		cijena: cijena,
		jelovnikId: idMeni,
		naziv: nazivMenija,
		restoranId: restoran
	});
	
    alert('Jelovnik je uspješno kreiran!');
    document.getElementById('nazivMenija').value = " ";
	document.getElementById('nazivMenija').placeholder = "Naziv menija";
	document.getElementById('cijena').value = " ";
	document.getElementById('cijena').placeholder = "Cijena menija (kn)";
}

function KreirajJelo(){
	const ref = firebase.database().ref();
	var idJelo;
	ref.child("jelo").on("value", function(snapshot) {
		idJelo = snapshot.numChildren();
	});
	idJelo++; 
	var nazivJela = document.getElementById('nazivJela').value;
	
	firebase.database().ref('jelo').child(idJelo).set({
		jeloId: idJelo,
		nazivJela: nazivJela
	});
	
    alert('Novo jelo je uspješno kreirano!');
    document.getElementById('nazivJela').value = " ";
	document.getElementById('nazivJela').placeholder = "Naziv jela";
}

function DodatiJelo(){
	const ref = firebase.database().ref();
	var idJnJ;
	ref.child("jeloNaJelovniku").on("value", function(snapshot) {
		idJnJ = snapshot.numChildren();
	});
	idJnJ++; 
    var jelo = document.getElementById('listaJela').value;
    var meni = document.getElementById('listaMenija').value;
	
	firebase.database().ref('jeloNaJelovniku').child(idJnJ).set({
		jeloId: jelo,
		jelovnikId: meni
	});

	 alert('Jelo je uspješno dodano na jelovnik!');
}

function UnesiRestoran() {
	const ref = firebase.database().ref();
	var id;
	ref.child("restoran").on("value", function(snapshot) {
		id = snapshot.numChildren();
	});
	id++; 
    var naziv = document.getElementById('naziv').value;
    var adresa = document.getElementById('adresa').value;
    var kontakt = document.getElementById('kontakt').value;
	var weblink = document.getElementById('weblink').value;
	var opis = document.getElementById('opis').value;
	
	firebase.database().ref('restoran').child(id).set({
		adresa: adresa,
        kontakt: kontakt,
		nazivRestorana: naziv,
		opis: opis,
		restoranId: id,
		slika: "gs://hr-foi-restoranko.appspot.com/restorani/"+id+".jpg",
		webLink: weblink
	});

	UploadFiles(datoteke, id);
    alert('Restoran je uspješno kreiran!');
    window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/restoran.html';
}

function UploadFiles(datoteke, id) {
    for (var i = 0; i < datoteke.length; i++) {
        Upload(datoteke[i], id);
    }

}
function Upload(datoteka, id) {
    try {
        var storageReference = firebase.storage().ref("restorani/" +datoteka.name);
        storageReference.put(datoteka);
    } catch (exception) {
        alert("exception.message");
    }
}
window.onload = function () {
    
    initApp();
	if(window.location.href == "https://hr-foi-restoranko.firebaseapp.com/rezervacije.html"){
		document.getElementById("prikazJelovnika").style.display = "none";
		document.getElementById("prikazMenija").style.display = "none";
		document.getElementById("podaciMeni").innerHTML = " ";
	}
	
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
			
			$("#recenzija").append("<tr><td>"+restoran+"</td><td>"+ocjena+"</td><td>"+info+"</td></tr>");
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
					if(potvrda == 0){
						potvrda = "Korisnik nije došao";
					}else{
						potvrda = "Korisnik je potvrdio dolazak";
					}
										
					$("#rezervacije").append("<tr><td><button type='button' style='width:100%;' onclick='prikaziJelovnik("+ID+")'>"+ID+"</button></td><td>"+restoran+"</td><td>"+korisnik+"</td><td>"+dolazak+"</td><td>"+odlazak+"</td><td>"+potvrda+"</td></tr>");
					
				});
			});
		});
		
		if(window.location.href == "https://hr-foi-restoranko.firebaseapp.com/meni.html"){
		
			const dbRefRest = firebase.database().ref().child('restoran');
			dbRefRest.on('child_added',snap => {
				var nazivRestorana = snap.child('nazivRestorana').val();
				var idRestorana = snap.child('restoranId').val();
				$("#listaRestorani").append("<option value='"+idRestorana+"'>"+nazivRestorana+"</option>");
			});
		
			const dbRefJelo = firebase.database().ref().child('jelo');
			dbRefJelo.on('child_added',snap => {
				var idJ = snap.child('jeloId').val();
				var nazivJ = snap.child('nazivJela').val();
				$("#listaJela").append("<option value='"+idJ+"'>"+nazivJ+"</option>");
			});

			const dbRefMen = firebase.database().ref().child('jelovnik');
			dbRefMen.on('child_added',snap => {
				var idM = snap.child('jelovnikId').val();
				var nazivM = snap.child('naziv').val();
				$("#listaMenija").append("<option value='"+idM+"'>"+nazivM+"</option>");
			});
		}
		
		document.getElementById('btnLogout').addEventListener('click', Logout, false);
	  }else{
		  console.log('not logged in');
		  window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/';
	  }
  });
};
