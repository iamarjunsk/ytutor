  var db = firebase.firestore();
function logIn(){
    
    var em=document.getElementById('txtEmail').value;
   var ps=document.getElementById('txtPass').value;
   //     alert(ps);
  var pss;
 
    var docRef = db.collection("Tutor").doc(em).get().then(function(doc) {
    if (doc.exists) {
         
        pss = doc.data().password;
       // alert(pss);
        if(pss == ps){
        localStorage.setItem("user", em);
        window.open("tutor.html");

        }
        else{
            alert("Password Missmatch");
        }

    } else {
        // doc.data() will be undefined in this case
        alert("No such User found!");
    }
}).catch(function(error) {
    alert("Error getting document:", error);
});
   
    
}
function userPro(a){
    //var a=us;
    if(a.length < 5){               window.location.replace("TutorLogin.html");
    }
    var docRef = db.collection("Tutor").doc(a);

docRef.get().then(function(doc) {
    if (doc.exists) {
       //window.alert(doc.data().name);
       document.getElementById('PName').innerHTML=doc.data().name;
        document.getElementById('PEmail').innerHTML=doc.data().email;
         document.getElementById('PPhone').innerHTML=doc.data().pno;
         document.getElementById('PDist').innerHTML=doc.data().district;

        document.getElementById('PCity').innerHTML=doc.data().taluk;
        document.getElementById('PTown').innerHTML=doc.data().village;
        document.getElementById('PQuali').innerHTML=doc.data().qualific;
       document.getElementById('propic').src=doc.data().pic;
        document.getElementById('icard').src=doc.data().aadhaar;
        document.getElementById('qual').src=doc.data().prof;
       



    } else {
        // doc.data() will be undefined in this case
        console.log(a+":No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

}
function edit(usr){
   document.getElementById('varify').style.display="none"; document.getElementById('edit').style.display="block";
    
    
 
    
 /*var docRef = db.collection("Tutor").doc(usr);

docRef.get().then(function(doc) {
    if (doc.exists) {
       //window.alert(doc.data().name);
       
         document.getElementById('txtPno').innerHTML=doc.data().pno;
         document.getElementById('PDist').innerHTML=doc.data().district;

        document.getElementById('txtCity').innerHTML=doc.data().city;
        document.getElementById('txtTown').innerHTML=doc.data().town;
        document.getElementById('Qualific').innerHTML=doc.data().qualific;
       document.getElementById('output1').src=doc.data().pic;
       
     
    } else {
        // doc.data() will be undefined in this case
        console.log(a+":No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});*/
    
}
function update(usr){
     var pw=document.getElementById("txtPassWord").value;
    var rpw=document.getElementById("txtRPassword").value;
   
    if(pw==rpw){
   
    
    var district=document.getElementById("txtDistrict").value;
    var city=document.getElementById("txtCity").value;
    var town=document.getElementById("txtTown").value;
    var ph=document.getElementById("txtPno").value;
    var propic = document.getElementById('output1').src; 
        quali=document.getElementById('Qualific').value;
    if(pw=="" || district=="" || city =="" || town=="" || propic =="" || quali ==""){
        window.alert("All field required");
        return;
    }
    if(ph.length != 10){
        window.alert("Phone number require 10 digits");
        return;
    }
        
       
       var userRef = db.collection("Tutor").doc(usr);
return userRef.update({
        password: pw,
        district: district,
        taluk: city,
        village: town,
        pno: ph,
        pic: propic,
        aadhaar: adhr,
        qualific:quali
})
.then(function() {
    window.alert("Updated");
    window.location.replace("TutorLogin.html");
    
})
.catch(function(error) {
    // The document probably doesn't exist.
    window.alert("Error on varification : ", error);
});     
    }
    else{
        window.alert("Password Miss match");
    }
}
var dp = function(file,ig) {
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      var output = document.getElementById(ig);
      output.src = dataURL;

    
    };
    reader.readAsDataURL(input.files[0]);
  
  }
function logout(){
    localStorage.setItem("user", "");
   window.location.replace("TutorLogin.html");
}