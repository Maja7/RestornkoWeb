
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

function UnesiRestoran() {
    var oib = document.getElementById('oib').value;
    var naziv = document.getElementById('naziv').value;
    var adresa = document.getElementById('adresa').value;
    var broj = document.getElementById('brojmjesta').value;

    UploadFiles(datoteke, oib);
    var data = {
        resotran_id: oib,
        Naziv: naziv,
        BrojMjesta: broj,
        Adresa: adresa

    }

    var updates = {};
    updates['/restoran/' + oib] = data;
    firebase.database().ref().update(updates);



    alert('The user is created successfully!');
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