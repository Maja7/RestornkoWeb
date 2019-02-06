(function(){
  const config = {
    apiKey: "AIzaSyAJOh_OdCF1wWXpSgNl3J9WDr4jsUpXYcg",
    authDomain: "hr-foi-restoranko.firebaseapp.com",
    databaseURL: "https://hr-foi-restoranko.firebaseio.com/",
    projectId: "hr-foi-restoranko",
    storageBucket: "hr-foi-restoranko.appspot.com",
  };
  firebase.initializeApp(config);
  
  const userEmail = document.getElementById('email');
  const userPassword = document.getElementById('lozinka');
  const btnLogin = document.getElementById('prijava');
  
  btnLogin.addEventListener('click', e => {
	  const email = userEmail.value;
	  const pass = userPassword.value;
	  const auth = firebase.auth();
	  
	  const promise = auth.signInWithEmailAndPassword(email,pass);
	 
	 promise.catch(e => console.log(e.message));
  });
  
  
  firebase.auth().onAuthStateChanged(firebaseUser => {
	  if(firebaseUser){
			console.log(firebaseUser);
			
			window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/pocetna.html';
	  }if (errorCode === 'auth/wrong-password') {
			alert('Pogreša lozinka.');
      } else {
			alert('Neuspješna prijava.');
      }
  });
  
  
}());

function Logout(){
	firebase.auth().signOut();
	  window.location.href = 'https://hr-foi-restoranko.firebaseapp.com/';
}