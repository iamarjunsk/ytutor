//window.alert("Hello! I am an alert box!!");
//import firebase from 'firebase';
//import 'forebase/storage';


    var db = firebase.firestore();


function checkUSer(ema){
    var docRef = db.collection("Tutor").doc(ema);

docRef.get().then(function(doc) {
    if (doc.exists) {
        alert("User already exist");
        document.getElementById('btnSave').disabled=true;
    } else {
        // doc.data() will be undefined in this case
        document.getElementById('btnSave').disabled=false;
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    

}

//admin Logout
function adLout(){
    localStorage.setItem("admin","");
    window.location.replace("adminLog.html");
}
$(document).ready(function(){
    $('#schOp').hide();
    $('#scieOp').hide();
});
$('#txtTut').change(function(){
    if($('#txtTut').val()=="1to10"){
        $('#schOp').show();
    }
    else{
        $('#schOp').hide();
    }
    if($('#txtTut').val()=="science"){
        $('#scieOp').show();
    }
    else{
        $('#scieOp').hide();
    }
    
});


function save() {
     //loader
     
     var dob=document.getElementById("txtDob").value;
     console.log(dob);
    // alert($('#Maths').is(":checked"));
    var Maths=$('#Maths').is(":checked");
    var Science=$('#Science').is(":checked");
    var Social=$('#Social').is(":checked");
    var Computer=$('#Computer').is(":checked");

    var ScMaths=$('#ScMaths').is(":checked");
    var ScPh=$('#Physics').is(":checked");
    var ScChe=$('#Chemistry').is(":checked");
    var ScBio=$('#Biology').is(":checked");
    var sub={
        Maths:Maths,
        Science:Science,
        Social:Social,
        Computer:Computer
    }
    var ScSub={
        Maths:ScMaths,
        Physics:ScPh,
        Chemistry:ScChe,
        Biology:ScBio
    }
    var extra=$('#txtExt').val();
    console.log(extra)
    
    var pw=document.getElementById("txtPassWord").value;
    var rpw=document.getElementById("txtRPassword").value;
    if(pw==rpw){
    var name=document.getElementById("txtName").value.toUpperCase();
    var email = document.getElementById("txtEmail").value;
    var district=document.getElementById("txtDistrict").value;
    var city=document.getElementById("txtTaluk").value;
    var town=document.getElementById("txtVill").value;
    var schOp=document.getElementById("schOp").value;
    var ph=document.getElementById("txtPno").value;
    // var propic = document.getElementById('output1').src; 
    // var adhr = document.getElementById('output2').src;
    var cert = document.getElementById('output3').src;
    if(cert.toString().toString().indexOf("image")!=5){
        alert("Image not in currect format");
    }
    var quali=document.getElementById('Qualific').value;
    var dob=document.getElementById("txtDob").value;
        var tution=document.getElementById('txtTut').value;
         if(pw=="" || name=="" || email=="" || district=="" || city =="" || town=="" || quali== "" || tution == "" || cert==""){
        window.alert("All field required");
        return;
    }
    else{
        document.getElementById('btnSave').disabled;
        document.getElementById('ldr').style.visibility = "visible";
       
        
    }
    if(ph.length != 10){
        window.alert("Phone number require 10 digits");
        return;
    }
    
        
    var data = {
        name: name,
        email: email,
        password: pw,
        district: district,
        taluk: city,
        village: town,
        pno: ph,
        prof: cert,
        varify: "false",
        qualific:quali,
        forMon:0,
        getMon:0,
        tution: tution,
        dob: dob,
        schOp: sub,
        ScOp:ScSub,
        extra: extra
    };
    console.log(data);
    
    db.collection("Tutor").doc(email).set(data,{ merge: true }).then(function() {
    window.alert("Document successfully written!");
        window.location.replace("tutprof.html")
}).catch(function(error){
        window.alert(error);
    });
    }
    else{
        window.alert("Password Miss match");
    }
    localStorage.setItem("user", email);
}
const list_var=document.querySelector("#list_var");
const list_non=document.querySelector("#list_non_var");
function retrieve(ch) {
    //var ch=localStorage.getItem("admin");
    //alert(ch);
    if(ch.length<5){
        window.location.replace("adminLog.html");
    }
 db.collection("Tutor").onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
           if(change.type === "added"){
                var element = document.getElementById(change.doc.data().email);
                if(change.doc.data().varify=='true'){
                    list_var.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                if(change.doc.data().varify=='false'){
                    list_non.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify+"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                
            }
            if (change.type === "modified") {
                var element = document.getElementById(change.doc.data().email);
element.parentNode.removeChild(element);
                              if(change.doc.data().varify=='true'){
                    list_var.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                if(change.doc.data().varify=='false'){
                    list_non.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
            }
            }
                                          
        );
    });
}
function del(usr){
    //alert(usr);
    db.collection("Tutor").doc(usr).delete().then(function() {
        window.alert(usr + "Document successfully deleted!");
        window.location.replace("admYT.html");
    }).catch(function(error) {
        window.alert("Error removing document: ", error);
    });
    
}
function delet(ob){
 /*
*/  window.alert();
    var a=ob.parentNode;
    a=a.parentNode;
    a=a.parentNode;
    alert(a.id);
    db.collection("Tutor").doc(a.id).delete().then(function() {
    window.alert(a.id + "Document successfully deleted!");
    a.parentElement.removeChild(a);
}).catch(function(error) {
    window.alert("Error removing document: ", error);
});
    
}

var dp = function(file,ig) {
    var input = file.target;
    // console.log(input);
    
    var reader = new FileReader();
    // reader.onload = function(){
        reader.onload = event =>{
      var dataURL = reader.result;
      var output = document.getElementById(ig);
      const image=new Image();
      image.src=event.target.result;
      image.onload=()=>{
          const elem=document.createElement('canvas');
          elem.width=500;
          elem.height=500;
          const ctx=elem.getContext('2d');
          ctx.drawImage(image,0,0,500,500);
          const newDataUrl=ctx.canvas.toDataURL(image,"image/jpeg",0.3);
          output.src=newDataUrl;
          console.log(newDataUrl);
        //   if(newDataUrl.toString().indexOf("image")!=5){
        //       alert("You are uploaded id in incorrect format");
        //       $('#btnSave').disabled();
        //   }
         
      } 
    };
    reader.readAsDataURL(input.files[0]);
  
}

function userProf(usr){
    window.open("tutadminprof.html");
   // window.location.replace("UserProfile.html");
    var a=usr.parentNode;
    a=a.parentNode;
    a=a.parentNode;
    localStorage.setItem("user", a.id);
   // us=a.id;
}
function userPro(a){
  //  alert(a);
    //var a=us;
    if(a.length < 5){               window.location.replace("TutorLogin.html");
    }
    var docRef = db.collection("Tutor").doc(a);

docRef.get().then(function(doc) {
    if (doc.exists) {
        if(doc.data().varify == 'true'){
            document.getElementById('btnVry').disabled=true;
        }
       //window.alert(doc.data().name);
      // document.getElementById('propic').src=doc.data().pic;
        document.getElementById('PName').innerHTML=doc.data().name;
        document.getElementById('PEmail').innerHTML=doc.data().email;
        document.getElementById('PPhone').innerHTML=doc.data().pno;
        document.getElementById('PDist').innerHTML=doc.data().district;
        document.getElementById('PCity').innerHTML=doc.data().taluk;
        document.getElementById('PTown').innerHTML=doc.data().village;
        document.getElementById('PQuali').innerHTML=doc.data().qualific;
        document.getElementById('PTuit').innerHTML=doc.data().tution;
        document.getElementById('PDob').innerHTML=doc.data().dob;
        
        if(doc.data().tution=='1to10'){
            if(doc.data().schOp.Maths==true){
                $('#dataPart').html($('#dataPart').html()+"Subjects:<h4 class=' m-3'>Maths</h4>");
            }
            if(doc.data().schOp.Science==true){
                $('#dataPart').html($('#dataPart').html()+"Subjects:<h4 class=' m-3'>Science</h4>");
            }
            if(doc.data().schOp.Social==true){
                $('#dataPart').html($('#dataPart').html()+"Subjects:<h4 class=' m-3'>Social</h4>");
            }
            if(doc.data().schOp.Computer==true){
                $('#dataPart').html($('#dataPart').html()+"Subjects:<h4 class=' m-3'>Computer</h4>");
            }
            
        }
        if(doc.data().tution=='science'){
            console.log(doc.data().ScOp.Physics);
            $('#dataPart').html($('#dataPart').html()+"<h4>Subjects:</h4>");
            if(doc.data().ScOp.Physics==true){
                $('#dataPart').html($('#dataPart').html()+"<h6 class=' m-3'>Physics</h6>");
            }
            if(doc.data().ScOp.Maths==true){
                $('#dataPart').html($('#dataPart').html()+"<h6 class=' m-3'>Maths</h6>");
            }
            if(doc.data().ScOp.Chemistry==true){
                $('#dataPart').html($('#dataPart').html()+"<h6 class=' m-3'>Chemistry</h6>");
            }
            if(doc.data().ScOp.Biology==true){
                $('#dataPart').html($('#dataPart').html()+"<h6 class=' m-3'>Biology</h6>");
            }
            
        }
       // document.getElementById('icard').src=doc.data().aadhaar;
        document.getElementById('qual').src=doc.data().prof;
        document.getElementsByName("btnVry").id=doc.data.email;
        document.getElementById('monGetData').innerHTML=doc.data().getMon;
        document.getElementById('monPayData').innerHTML=doc.data().forMon;
        


    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});



}

function varify(usr){
   // var a=usr.id;
    window.alert(usr);
    var userRef = db.collection("Tutor").doc(usr);
    return userRef.update({
    varify: "true",
    prof: ""
})
.then(function() {
    window.alert("Varification Updated");
})
.catch(function(error) {
    // The document probably doesn't exist.
    window.alert("Error on varification : ", error);
});    
}



//Search list

function selectSh(){
    var st=document.getElementById("seltMthd").value;
    
  if(st=='district'){
      document.getElementById("txtTaluk").disabled=true; 
      document.getElementById('txtVill').disabled=true;
      document.getElementById("txtDistrict").innerHTML="<option value=''>Select District</option><option value='Thiruananthapuram'>Thiruananthapuram</option>      <option value='Kollam'>Kollam</option>      <option value='Alappuzha'>Alappuzha</option>      <option value='Pathanamthitta'>Pathanamthitta</option>      <option value='Kottayam'>Kottayam</option>      <option value='Idukki'>Idukki</option>      <option value='Ernakulam'>Ernakulam</option>      <option value='Thrissur'>Thrissur</option>           <option value='Palakkad'>Palakkad</option>      <option value='Malappuram'>Malappuram</option>      <option value='Kozhikode'>Kozhikode</option>      <option value='Wayanad'>Wayanad</option>      <option value='Kannur'>Kannur</option>      <option value='Kasargod'>Kasargod</option>";
  }
    if(st=='taluk'){
        document.getElementById('txtTaluk').disabled=false;
         document.getElementById('txtVill').disabled=true;
         document.getElementById("txtDistrict").innerHTML="<option value='Thiruananthapuram'>Thiruananthapuram</option><option value='Kollam'>Kollam</option>          <option value='Alappuzha'>Alappuzha</option>          <option value='Pathanamthitta'>Pathanamthitta</option>          <option value='Kottayam'>Kottayam</option>          <option value='Idukki'>Idukki</option>          <option value='Ernakulam'>Ernakulam</option>          <option value='Thrissur'>Thrissur</option>               <option value='Palakkad'>Palakkad</option>          <option value='Malappuram'>Malappuram</option>          <option value='Kozhikode'>Kozhikode</option>          <option value='Wayanad'>Wayanad</option>          <option value='Kannur'>Kannur</option>          <option value='Kasargod'>Kasaragod</option>";

    }
    if(st=='village'){
        document.getElementById('txtTaluk').disabled=false;
         document.getElementById('txtVill').disabled=false;
         document.getElementById("txtDistrict").innerHTML="<option value='Thiruananthapuram'>Thiruananthapuram</option><option value='Kollam'>Kollam</option>          <option value='Alappuzha'>Alappuzha</option>          <option value='Pathanamthitta'>Pathanamthitta</option>          <option value='Kottayam'>Kottayam</option>          <option value='Idukki'>Idukki</option>          <option value='Ernakulam'>Ernakulam</option>          <option value='Thrissur'>Thrissur</option>               <option value='Palakkad'>Palakkad</option>          <option value='Malappuram'>Malappuram</option>          <option value='Kozhikode'>Kozhikode</option>          <option value='Wayanad'>Wayanad</option>          <option value='Kannur'>Kannur</option>          <option value='Kasargod'>Kasaragod</option>";

    }
  

}



const list_search=document.querySelector("#list_search");
const list_nonvar=document.querySelector("#list_non_varify");
function srch() {
    var st=document.getElementById("seltMthd").value;
    
    if(st=='district'){
        
    var dist=document.getElementById("txtDistrict").value;
        list_nonvar.innerHTML="";
        list_search.innerHTML="";
 db.collection("Tutor").where(st,"==",dist).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
            var cr=document.getElementById('txtTut').value;
           // alert(cr);
           // alert(change.doc.data().tution);
            if(cr == change.doc.data().tution){
            if(change.type === "added"){
                var element = document.getElementById(change.doc.data().email);
                if(change.doc.data().varify=='true'){
                    list_search.innerHTML+=" <div class='card col-md-6 col-sm-11' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                if(change.doc.data().varify=='false'){
                    list_nonvar.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify+"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                
            }
            if (change.type === "modified") {
                var element = document.getElementById(change.doc.data().email);
element.parentNode.removeChild(element);
                              if(change.doc.data().varify=='true'){
                    list_search.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                if(change.doc.data().varify=='false'){
                    list_nonvar.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
            }
            }
        }                              
        );
    });
    }
    else if(st=='taluk'){
    var dist=document.getElementById("txtTaluk").value;
    list_nonvar.innerHTML="";
    list_search.innerHTML="";
 db.collection("Tutor").where(st,"==",dist).onSnapshot(function(querySnapshot) {
     
        querySnapshot.docChanges().forEach(function(change) {
            var cr=document.getElementById('txtTut').value;
            // alert(cr);
            // alert(change.doc.data().tution);
             if(cr == change.doc.data().tution){
             if(change.type === "added"){
                 var element = document.getElementById(change.doc.data().email);
                 if(change.doc.data().varify=='true'){
                     list_search.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                 if(change.doc.data().varify=='false'){
                     list_nonvar.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify+"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                 
             }
             if (change.type === "modified") {
                 var element = document.getElementById(change.doc.data().email);
 element.parentNode.removeChild(element);
                               if(change.doc.data().varify=='true'){
                     list_search.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                 if(change.doc.data().varify=='false'){
                     list_nonvar.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
             }
             }
            }
                                          
        );
    });
}
     else{
    var dist=document.getElementById("txtVill").value;
    list_nonvar.innerHTML="";
    list_search.innerHTML="";
 db.collection("Tutor").where(st,"==",dist).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change) {
            var cr=document.getElementById('txtTut').value;
            // alert(cr);
            // alert(change.doc.data().tution);
             if(cr == change.doc.data().tution){
             if(change.type === "added"){
                 var element = document.getElementById(change.doc.data().email);
                 if(change.doc.data().varify=='true'){
                     list_search.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                 if(change.doc.data().varify=='false'){
                     list_nonvar.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify+"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                 
             }
             if (change.type === "modified") {
                 var element = document.getElementById(change.doc.data().email);
 element.parentNode.removeChild(element);
                               if(change.doc.data().varify=='true'){
                     list_search.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
                 if(change.doc.data().varify=='false'){
                     list_nonvar.innerHTML+=" <div class='card' id='"+change.doc.data().email+"'><div class='card_title'><h3 class='titleText'>" + change.doc.data().name + "</h3></div><div class='card_data'>" + change.doc.data().email + "<br>" + change.doc.data().district + "<br>" + change.doc.data().taluk + "<br>" + change.doc.data().village + "<br>" + change.doc.data().pno +"<br>"+ change.doc.data().qualific +"<br>"+change.doc.data().varify +"</div><div class='card_button' id='3'><center><button id='varify' onclick='userProf(this)'>View</button><br></center></div></div>";}
             }
             }
            }
                                          
        );
    });
}
}

var adm="non";
function logIn(){
   // setad();
    var em=document.getElementById('txtId').value;
   var ps=document.getElementById('txtPass').value;
   //     alert(ps);
  var pss;
 
    var docRef = db.collection("admin").doc(em).get().then(function(doc) {
    if (doc.exists) {
         
        pss = doc.data().password;
        //alert(pss);
        if(pss == ps){
        localStorage.setItem("admin","loginad");
        window.location.replace("admYT.html");

        }
        else{
            alert("Password Missmatch");
        }

    } else {
        // doc.data() will be undefined in this case
        alert("No such Admin found!");
    }
}).catch(function(error) {
    alert("Error getting document:", error);
});
   
    
}

function taluk(){
    var dt = document.getElementById('txtDistrict').value;
   
    if(dt=="Thiruananthapuram"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Thiruvananthapuram'>Thiruvananthapuram</option><option value='Chirayinkeezhu'>Chirayinkeezhu</option><option value='Neyyattinkara'>Neyyattinkara</option><option value='Nedumangadu'>Nedumangadu</option>";
        
    }
    if(dt=="Kollam"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Kollam'>	Kollam</option><option value='Kunnathoor'>Kunnathoor</option><option value='Karunagappally'>Karunagappally</option><option value='Kottarakkara'>Kottarakkara</option><option value='Punalur'>Punalur</option><option value='Pathanapuram'>Pathanapuram</option>";
        
    }
    if(dt=="Pathanamthitta"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Adoor'>	Adoor</optoin><option value='Konni'>Konni</optoin><option value='Kozhencherry'>Kozhencherry</optoin><option value='Ranni'>Ranni</option><option value='Mallappally'>Mallappally</option><option value='Thiruvalla'>	Thiruvalla</option>";
    }
    
    if(dt=="Alappuzha"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Chenganoor'>	Chenganoor</option><option value='Mavelikkara'>	Mavelikkara</option><option value='Karthikappally'>Karthikappally </option><option value='Kuttanad'>Kuttanad</option><option value='Ambalappuzha'>	Ambalappuzha</option><option value='Cherthala'>Cherthala</option>";
    }
    
    if(dt=="Kottayam"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Changanasserry'>	Changanasserry</option><option value='Kottayam'>		Kottayam</option><option value='Vaikom'>Vaikom</option><option value='Meenachil'>Meenachil</option><option value='Kanjirappally'>	Kanjirappally</option>";
    }

     if(dt=="Idukki"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Peermade'>	Peermade</option><option value='Udumbanchola'>	Udumbanchola</option><option value='Idukki'>Idukki</option><option value='Thodupuzha'>Thodupuzha</option><option value='Devikulam'>Devikulam </option>";
    }
    
    if(dt=="Ernakulam"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Kothamangalam'>	Kothamangalam</option><option value='Muvattupuzha'>	Muvattupuzha</option><option value='Kunnathunad'>Kunnathunad </option><option value='Kanayannur'>Kanayannur</option><option value='Kochi'>Kochi</option><option value='Paravur'>Paravur</option><option value='Aluva'>Aluva</option>";
    }
    
    if(dt=="Thrissur"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Mukundapuram'>	Mukundapuram</option><option value='Kodungallur'>Kodungallur </option><option value='Thrissur'>Thrissur</option><option value='Chavakkad'>Chavakkad</option><!--<option value='Kunnamkulam'>Kunnamkulam</option>--><option value='Thalapilly'>Thalapilly</option>";
    }
    
    if(dt=="Palakkad"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Alathur'>Alathur</option><option value='Chittur'>Chittur</option><option value='Palakkad'>Palakkad</option><option value='Pattambi'>Pattambi</option><option value='Ottapalam'>Ottapalam</option><option value='Mannarkkad'>Mannarkkad</option>";
    }
    
    if(dt=="Malappuram"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Perinthalmanna'>	Perinthalmanna</option><option value='Nilambur'>Nilambur</option><option value='Ernad'>Ernad</option><option value='Kondotty'>Kondotty</option><option value='Ponnani'>Ponnani</option><option value='Tirur'>Tirur</option><option value='Tirurangadi'>Tirurangadi</option>";
    }
    
     if(dt=="Kozhikode"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Kozhikode'>	Kozhikode</option><option value='Thamarassery'>Thamarassery</option><option value='Koyilandy'>Koyilandy</option><option value='Vadakara'>Vadakara</option>";
    }
    
    if(dt=="Wayanad"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Vythiri'>	Vythiri </option><option value='Sulthan_Bathery'>Sulthan Bathery</option><option value='Mananthavady'>Mananthavady</option>";
    }
    
    if(dt=="Kannur"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Thalassery'>	Thalassery</option><option value='Iritty'>Iritty</option><option value='Kannur'>Kannur</option><option value='Taliparamba'>Taliparamba</option><option value='Payyannur'>Payyannur</option>";
    }
    
    if(dt=="Kasargod"){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value='Hosdurg'>	Hosdurg</option><option value='Vellarikundu'>Vellarikundu</option><option value='Kasargod'>Kasargod</option><option value='Manjeshwaram'>Manjeshwaram</option>";
    }
    if(dt==""){
        document.getElementById('txtTaluk').innerHTML="<option value=''>Select taluk</option><option value=''>Select taluk</option>";
        
    }
}
function vill(){
    var tal=document.getElementById('txtTaluk').value;
    if(tal=="Thiruvananthapuram"){
        document.getElementById('txtVill').innerHTML="<option value='Andoorkonam'>Andoorkonam</option><option value='Attipra'>Attipra</option><option value='Ayiroopara'>Ayiroopara</option><option value='Cheruvakkal'>Cheruvakkal</option><option value='Kadakampally'>Kadakampally</option><option value='Kadinamkulam'>Kadinamkulam</option><option value='Kalliyoor'>Kalliyoor</option><option value='Kazhakoottam'>Kazhakoottam</option><option value='Keezhthonakkal'>Keezhthonakkal</option><option value='Kowdiar'>Kowdiar</option><option value='Kudappanakunnu'>Kudappanakunnu</option><option value='Manacaud'>Manacaud</option><option value='Melthonnakkal'>Melthonnakkal</option><option value='Menamkulam'>Menamkulam</option><option value='Muttathara'>Muttathara</option><option value='Nemom'>Nemom</option><option value='Pallipuram'>Pallipuram</option><option value='Pangappara'>Pangappara</option><option value='Pattom'>Pattom</option><option value='Peroorkada'>Peroorkada</option><option value='Pettah'>Pettah</option><option value='Sasthamangalam'>Sasthamangalam</option><option value='Thirumala'>Thirumala</option><option value='Thiruvallam'>Thiruvallam</option><option value='Thycaud'>Thycaud</option><option value='Uliyazhthura'>Uliyazhthura</option><option value='Ulloor'>Ulloor</option><option value='Vanchiyoor'>Vanchiyoor</option><option value='Vattiyoorkavu'>Vattiyoorkavu</option><option value='Veiloor'>Veiloor</option><option value='Venganoor'>Venganoor</option>";
    }
     if(tal=="Chirayinkeezhu"){
        document.getElementById('txtVill').innerHTML="<option value='Alamcode'>Alamcode</option><option value='Attingal'>Attingal</option><option value='Attingal-Avanavancherry'>Attingal-Avanavancherry</option><option value='Ayiroor'>Ayiroor</option><option value='Azhoor'>Azhoor</option><option value='Chemmaruthy'>Chemmaruthy</option><option value='Edakkode'>Edakkode</option><option value='Edava'>Edava</option><option value='Elamba-Mudakkal'>Elamba-Mudakkal</option><option value='Kadakkavoor'>Kadakkavoor</option><option value='Karavaram'>Karavaram</option><option value='Keezhattingal'>Keezhattingal</option><option value='Kilimanoor'>Kilimanoor</option><option value='Kizhuvalam-Koonthalloor'>Kizhuvalam-Koonthalloor</option><option value='Koduvazhannoor'>Koduvazhannoor</option><option value='Kudavoor'>Kudavoor</option><option value='Madavoor'>Madavoor</option><option value='Manamboor'>Manamboor</option><option value='Nagaroor'>Nagaroor</option><option value='Navaikulam'>Navaikulam</option><option value='Ottoor'>Ottoor</option><option value='Pallickal'>Pallickal</option><option value='Pazhayakunnummel'>Pazhayakunnummel</option><option value='Pulimath'>Pulimath</option><option value='Sarkara-Chirayinkeezhu'>Sarkara-Chirayinkeezhu</option><option value='Vakkom'>Vakkom</option><option value='Varkala'>Varkala</option><option value='Vellalloor'>Vellalloor</option><option value='Vettoor-Cherunniyoor'>Vettoor-Cherunniyoor</option>";
}
    
    if(tal=="Nedumangadu"){
        document.getElementById('txtVill').innerHTML="<option value='Anad'>Anad</option><option value='Aruvikkara'>Aruvikkara</option><option value='Aryanad'>Aryanad</option><option value='Kallara'>Kallara</option><option value='Karakulam'>Karakulam</option><option value='Koliyakode'>Koliyakode</option><option value='Kurupuzha'>Kurupuzha</option><option value='Manikkal'>Manikkal</option><option value='Mannoorkara'>Mannoorkara</option><option value='Nedumangad'>Nedumangad</option><option value='Nellanad'>Nellanad</option><option value='Palode'>Palode</option><option value='Panavoor'>Panavoor</option><option value='Peringamala'>Peringamala</option><option value='Perumkulam'>Perumkulam</option><option value='Pullampara'>Pullampara</option><option value='Theakada'>Theakada</option><option value='Thennoor'>Thennoor</option><option value='Tholicode'>Tholicode</option><option value='Uzhamalackal'>Uzhamalackal</option><option value='Vamanapuram'>Vamanapuram</option><option value='Vattappara'>Vattappara</option><option value='Veeranakavu'>Veeranakavu</option><option value='Vellanad'>Vellanad</option><option value='Vembayam'>Vembayam</option><option value='Vithura'>Vithura</option>";
}
    
    if(tal=="Neyyattinkara"){
        document.getElementById('txtVill').innerHTML="<option value='Amboori'>Amboori</option><option value='Anavoor'>Anavoor</option><option value='Athiyannur'>Athiyannur</option><option value='Chenkal'>Chenkal</option><option value='Kallikkad'>Kallikkad</option><option value='Kanjiramkulam'>Kanjiramkulam</option><option value='Karode'>Karode</option><option value='Karumkulam'>Karumkulam</option><option value='Keezharoor'>Keezharoor</option><option value='Kollayil'>Kollayil</option><option value='Kottukal'>Kottukal</option><option value='Kovalam'>Kovalam</option><option value='Kulathoor'>Kulathoor</option><option value='Kulathummal'>Kulathummal</option><option value='Kunnathukal'>Kunnathukal</option><option value='Malayinkeezhu'>Malayinkeezhu</option><option value='Maranalloor'>Maranalloor</option><option value='Neyyattinkara'>Neyyattinkara</option><option value='Ottasekharamangalam'>Ottasekharamangalam</option><option value='Pallichal'>Pallichal</option><option value='Parassala'>Parassala</option><option value='Parasuvaikkal'>Parasuvaikkal</option><option value='Perumkadavila'>Perumkadavila</option><option value='Thirupuram'>Thirupuram</option><option value='Thiruvananthapuram'>Thiruvananthapuram</option><option value='Vazhichal'>Vazhichal</option><option value='Vellarada'>Vellarada</option><option value='Vilappil'>Vilappil</option><option value='Vilavoorkkal'>Vilavoorkkal</option>";
    }
    //kollam
    if(tal=='Kollam'){
        document.getElementById('txtVill').innerHTML="<option value='Shakthikulangara'>Shakthikulangara</option><option value='Thrikkadavoor'>Thrikkadavoor</option><option value='Thrikkaruva'>Thrikkaruva</option><option value='Mandrothuruth'>Mandrothuruth</option><option value='East Kallada'>East Kallada</option><option value='Mulavana'>Mulavana</option><option value='Perinad'>Perinad</option><option value='Panayam'>Panayam</option><option value='Kilikollur'>Kilikollur</option><option value='Mangad'>Mangad</option><option value='Kottamkara'>Kottamkara</option><option value='Elampallur'>Elampallur</option><option value='Nedumpana'>Nedumpana</option><option value='Pallimon'>Pallimon</option><option value='Thrikkovilvattom'>Thrikkovilvattom</option><option value='Thazhuthala'>Thazhuthala</option><option value='Vadakkevila'>Vadakkevila</option><option value='Mundakkal'>Mundakkal</option><option value='Eravipuram'>Eravipuram</option><option value='Mayyanad'>Mayyanad</option><option value='Adichanallur'>Adichanallur</option><option value='Meenad'>Meenad</option><option value='Chirakkara'>Chirakkara</option><option value='Paravoor'>Paravoor</option><option value='Kottappuram'>Kottappuram</option><option value='Poothakulam'>Poothakulam</option><option value='Parippally'>Parippally</option><option value='Kalluvathukkal'>Kalluvathukkal</option><option value='Kollam East'>Kollam East</option><option value='Kollam West'>Kollam West</option><option value='Perayam'>Perayam</option>";
        
    }
    if(tal=='Kottarakkara'){
        document.getElementById('txtVill').innerHTML="<option value='Pavithreswaram'>Pavithreswaram</option><option value='Puthur'>Puthur</option><option value='Ezhukone'>Ezhukone</option><option value='Kareepra'>Kareepra</option><option value='Neduvathur'>Neduvathur</option><option value='Kulakkada'>Kulakkada</option><option value='Kalayapuram'>Kalayapuram</option><option value='Mylam'>Mylam</option><option value='Melila'>Melila</option><option value='Chakkuvarakkal'>Chakkuvarakkal</option><option value='Vettikkavala'>Vettikkavala</option><option value='Kottarakkara'>Kottarakkara</option><option value='Ummannur'>Ummannur</option><option value='Valakom'>Valakom</option><option value='Elamad'>Elamad</option><option value='Odanavattom'>Odanavattom</option><option value='Veliyam'>Veliyam</option><option value='Pooyappally'>Pooyappally</option><option value='Velinallur'>Velinallur</option><option value='Nilamel'>Nilamel</option><option value='Chadayamangalam'>Chadayamangalam</option><option value='Kottukkal'>Kottukkal</option><option value='Ittiva'>Ittiva</option><option value='Kadakkal'>Kadakkal</option><option value='Kummil'>Kummil</option><option value='Mankode'>Mankode</option><option value='Chithara'>Chithara</option>";
    }
    if(tal=='Pathanapuram'){
        document.getElementById('txtVill').innerHTML="<option value='Pattazhy'>Pattazhy</option><option value='Thalavoor'>Thalavoor</option><option value='Vilakudy'>Vilakudy</option><option value='Pidavoor'>Pidavoor</option><option value='Pathanapuram'>Pathanapuram</option><option value='Pattazhy Vadakkekkara'>Pattazhy Vadakkekkara</option><option value='Piravanthoor'>Piravanthoor</option><option value='Punnala'>Punnala</option>";
    }
    if(tal=='Karunagappally'){
        document.getElementById('txtVill').innerHTML="<option value='Alappad'>Alappad</option><option value='Ochira'>Ochira</option><option value='Adinad'>Adinad</option><option value='Karunagappally'>Karunagappally</option><option value='Thazhava'>Thazhava</option><option value='Pavumba'>Pavumba</option><option value='Thodiyoor'>Thodiyoor</option><option value='Kallalibhagom'>Kallalibhagom</option><option value='Thevalakkara'>Thevalakkara</option><option value='Chavara'>Chavara</option><option value='Neendakara'>Neendakara</option><option value='Clappana'>Clappana</option><option value='Kulasekharapuram'>Kulasekharapuram</option><option value='Thekkumbhagam'>Thekkumbhagam</option><option value='Ayanivelikulangara'>Ayanivelikulangara</option><option value='Panama'>Panama</option><option value='Vadakumthalha'>Vadakumthala</option>";
    }
    if(tal=='Kunnathoor'){
        document.getElementById('txtVill').innerHTML="<option value='Sooranad_North'>Sooranad North</option><option value='Sooranad_South'>Sooranad South</option><option value='Mynagappally'>Mynagappally</option><option value='Sasthamkotta'>Sasthamkotta</option><option value='Poruvazhi'>Poruvazhi</option><option value='Kunnathur'>Kunnathur</option><option value='West_Kallada'>West Kallada</option>";
    }
    if(tal=='Punalur'){
        document.getElementById('txtVill').innerHTML="<option value='Alayaman'>Alayaman</option><option value='Anchal'>Anchal</option><option value='Arakkal'>Arakkal</option><option value='Ariyankavu'>Ariyankavu</option><option value='Ayiranelloor'>Ayiranelloor</option><option value='Channapetta'>Channapetta</option><option value='Edamon'>Edamon</option><option value='Edamulakkal'>Edamulakkal</option><option value='Eroor'>Eroor</option><option value='Karavaloor'>Karavaloor</option><option value='Kulathupuzha'>Kulathupuzha</option><option value='Punalur'>Punalur</option><option value='Thenmala'>Thenmala</option><option value='Thinkalkarikkom'>Thinkalkarikkom</option><option value='Valakkode'>Valakkode</option>";
    }
     if(tal=='Cherthala'){
        document.getElementById('txtVill').innerHTML="<option value='Arookutty'>Arookutty</option><option value='Aroor'>Aroor</option><option value='Arthungal'>Arthungal</option><option value='Cherthala_North'>Cherthala North</option><option value='Cherthala_South'>Cherthala South</option><option value='Ezhupunna'>Ezhupunna</option><option value='Kadakkarappally'>Kadakkarappally</option><option value='Kanjikkuzhy'>Kanjikkuzhy</option><option value='Kodamthuruthu'>Kodamthuruthu</option><option value='Kokkothamangalam'>Kokkothamangalam</option><option value='Kuthiathod'>Kuthiathod</option><option value='Kuthiathod'>Kuthiathod</option><option value='Mararikkulam_North'>Mararikkulam North</option><option value='Pallippuram'>Pallippuram</option><option value='Panavally'>Panavally</option><option value='Pattanakkad'>Pattanakkad</option><option value='Perumbalam'>Perumbalam</option><option value='Thannermukkam'>Thannermukkam</option><option value='Thannermukkam_South'>Thannermukkam South</option><option value='Thuravoor_South'>Thuravoor South</option><option value='Thycattussery'>Thycattussery</option><option value='Vayalar_East'>Vayalar East</option>";
     }
    //ambalam puzha
    if(tal=='Ambalappuzha'){
        document.getElementById('txtVill').innerHTML="<option value='Alappuzha'>Alappuzha West</option><option value='Ambalapuzha'>Ambalapuzha</option><option value='Ambalappuzha_North'>Ambalappuzha North</option><option value='Aryad_South'>Aryad South</option><option value='Kalavoor'>Kalavoor</option><option value='Karumady'>Karumady</option><option value='Komalapuram'>Komalapuram</option><option value='Mannancherry'>Mannancherry</option><option value='Mullackal'>Mullackal</option><option value='Paravoor'>Paravoor</option><option value='Pathirappally'>Pathirappally</option><option value='Pazhaveedu'>Pazhaveedu</option><option value='Punnapra'>Punnapra</option><option value='Purakkad'>Purakkad</option>";
    }
    if(tal=='Kuttanad'){
        document.getElementById('txtVill').innerHTML="<option value='Champakulam'>Champakulam</option><option value='Edathua'>Edathua</option><option value='Kainakary_North'>Kainakary North</option><option value='Kainakary_South'>Kainakary South</option><option value='Kavalam'>Kavalam</option><option value='Kunnumma'>Kunnumma</option><option value='Muttar'>Muttar</option><option value='Nedumudy'>Nedumudy</option><option value='Neelamperoor'>Neelamperoor</option><option value='Pulinkunnu'>Pulinkunnu</option><option value='Ramankary'>Ramankary</option><option value='Thakazhy'>Thakazhy</option><option value='Thalavady'>Thalavady</option><option value='Veliyanad'>Veliyanad</option>";
    }
    if(tal=='Karthikappally'){
        document.getElementById('txtVill').innerHTML="<option value='Arattupuzha'>Arattupuzha</option><option value='Cheppad'>Cheppad</option><option value='Cheruthana'>Cheruthana</option><option value='Chingoli'>Chingoli</option><option value='Haripad'>Haripad</option><option value='Kandallor'>Kandallor</option><option value='Karthikappally'>Karthikappally</option><option value='Karuvatta'>Karuvatta</option><option value='Kayamkulam'>Kayamkulam</option><option value='Keerikkad'>Keerikkad</option><option value='Krishnapuram'>Krishnapuram</option><option value='Kumarapuram'>Kumarapuram</option><option value='Muthukulam'>Muthukulam</option><option value='Pallippad'>Pallippad</option><option value='Pathiyoor'>Pathiyoor</option><option value='Puthuppally'>Puthuppally</option><option value='Thrikkunnapuzha'>Thrikkunnapuzha</option><option value='Veeyapuram'>Veeyapuram</option>";
    }
    if(tal=='Chenganoor'){
        document.getElementById('txtVill').innerHTML="<option value='Ala'>Ala</option><option value='Chengannur'>Chengannur</option><option value='Cheriyanad'>Cheriyanad</option><option value='Ennakkad'>Ennakkad</option><option value='Kurattissery'>Kurattissery</option><option value='Mannar'>Mannar</option><option value='Mulakkuzha'>Mulakkuzha</option><option value='Pandanad'>Pandanad</option><option value='Puliyoor'>Puliyoor</option><option value='Thiruvanvandoor'>Thiruvanvandoor</option><option value='Venmony'>Venmony</option>";
    }
    if(tal=='Mavelikkara'){
        document.getElementById('txtVill').innerHTML="<option value='Bharanicavu'>Bharanicavu</option><option value='Chennithala'>Chennithala</option><option value='Chunakkara'>Chunakkara</option><option value='Kannamangalam'>Kannamangalam</option><option value='Kattanam'>Kattanam</option><option value='Mavelikkara'>Mavelikkara</option><option value='Nooranad'>Nooranad</option><option value='Palamel'>Palamel</option><option value='Perungala'>Perungala</option><option value='Thamarakkulam'>Thamarakkulam</option><option value='Thazhakkara'>Thazhakkara</option><option value='Thekkekkara'>Thekkekkara</option><option value='Thripperumthura'>Thripperumthura</option><option value='Vallikunnam'>Vallikunnam</option><option value='Vettiyar'>Vettiyar</option><option value='Palamel'>Palamel</option>";
    }
    if(tal=='Ernad'){
        document.getElementById('txtVill').innerHTML="<option value='Malappuram'>Malappuram</option><option value='Areecode'>Areecode</option><option value='Vettikattiri'>Vettikattiri</option><option value='Panakkad'>Panakkad</option><option value='Vettilappara'>Vettilappara</option><option value='Pandikkad'>Pandikkad</option><option value='Melmuri'>Melmuri</option><option value='Urangattiri'>Urangattiri</option><option value='Chembrasseri'>Chembrasseri</option><option value='Payyanad'>Payyanad</option><option value='Kizhuparamba'>Kizhuparamba</option><option value='Anakkayam'>Anakkayam</option><option value='Elankur'>Elankur</option><option value='Pulpatta'>Pulpatta</option><option value='Pandallur'>Pandallur</option><option value='Karakunnu'>Karakunnu</option><option value='Narukara'>Narukara</option><option value='Edavanna'>Edavanna</option><option value='Trikkalangode'>Trikkalangode</option><option value='Perakamanna'>Perakamanna</option><option value='Manjeri'>Manjeri</option><option value='Kavanur'>Kavanur</option><option value='Pookkottur'>Pookkottur</option>";
    }
    if(tal=='Perinthalmanna'){
        document.getElementById('txtVill').innerHTML="<option value='Nenmini'>Nenmini</option><option value='Thazhekkode'>Thazhekkode</option><option value='Elamkulam'>Elamkulam</option><option value='Angadippuram'>Angadippuram</option><option value='Koottilangadi'>Koottilangadi</option><option value='Keezhattur'>Keezhattur</option><option value='Valambur'>Valambur</option><option value='Pathaikara'>Pathaikara</option><option value='Melattur'>Melattur</option><option value='Vadakkanagara'>Vadakkanagara</option><option value='Edappatta'>Edappatta</option><option value='Vettathur'>Vettathur</option><option value='Moorkkanad'>Moorkkanad</option><option value='Mankada'>Mankada</option><option value='Karyavattam'>Karyavattam</option><option value='Aliparamba'>Aliparamba</option><option value='Perinthalmanna'>Perinthalmanna</option><option value='Arakkuparamba'>Arakkuparamba</option><option value='Puzhakkattiri'>Puzhakkattiri</option><option value='Kuruvambalam'>Kuruvambalam</option><option value='Anamangad'>Anamangad</option><option value='Kuruva'>Kuruva</option><option value='Kodur'>Kodur</option><option value='Pulamanthole'>Pulamanthole</option>";
    }
    if(tal=='Ponnani'){
        document.getElementById('txtVill').innerHTML="<option value='Ponnani_Nagaram'>Ponnani Nagaram</option><option value='Vattamkulam'>Vattamkulam</option><option value='Ezhuvathiruthy'>Ezhuvathiruthy</option><option value='Maranchery'>Maranchery</option><option value='Edappal'>Edappal</option><option value='Veliyancode'>Veliyancode</option><option value='Nannamukku'>Nannamukku</option><option value='Perumpadappa'>Perumpadappa</option><option value='Kalady'>Kalady</option><option value='Alamkode'>Alamkode</option><option value='Tavanur'>Tavanur</option>";
    }
    if(tal=='Nilambur'){
        document.getElementById('txtVill').innerHTML="<option value='Vazhikkadavu'>Vazhikkadavu</option><option value='Karuvarakundu'>Karuvarakundu</option><option value='Vellayur'>Vellayur</option><option value='Nilambur'>Nilambur</option><option value='Amarambalam'>Amarambalam</option><option value='Kalikavu'>Kalikavu</option><option value='Edakkara'>Edakkara</option><option value='Mampad'>Mampad</option><option value='Kerala Estate'>Kerala Estate</option><option value='Pullippadam'>Pullippadam</option><option value='Kurumbalangode'>Kurumbalangode</option><option value='Pothukallu'>Pothukallu</option><option value='Karulai'>Karulai</option><option value='Akampadam'>Akampadam</option><option value='Moothedam'>Moothedam</option><option value='Chungathara'>Chungathara</option><option value='Tuvvur'>Tuvvur</option><option value='Wandur'>Wandur</option><option value='Thiruvali'>Thiruvali</option><option value='Porur'>Porur</option><option value='Chokkad'>Chokkad</option>";
    }
    if(tal=='Tirurangadi'){
        document.getElementById('txtVill').innerHTML="<option value='Parappur'>Parappur</option><option value='Vengara'>Vengara</option><option value='Tiruranagdi'>Tiruranagdi</option><option value='A_R_Nagar'>A.R.Nagar</option><option value='Kannamangalam'>Kannamangalam</option><option value='Neduva'>Neduva</option><option value='Thenhippalam'>Thenhippalam</option><option value='Othukkungal'>Othukkungal</option><option value='Parappanangadi'>Parappanangadi</option><option value='Peruvallur'>Peruvallur</option><option value='Vallikunnu'>Vallikunnu</option><option value='Thennala'>Thennala</option><option value='Oorakam_Moonniyur'>Oorakam	Moonniyur</option><option value='Edarikode'>Edarikode</option><option value='Nannambra'>Nannambra</option><option value='Ariyallur'>Ariyallur</option>";
    }
    if(tal=='Tirur'){
        document.getElementById('txtVill').innerHTML="<option value=''>Tirur</option><option value=''>Tanur</option><option value=''>Ponmala</option><option value=''>Thalakkad</option><option value=''>Ozhur</option><option value=''>Athavanad</option><option value=''>Triprangode</option><option value=''>Ponmundam</option><option value=''>Kattiparuthi</option><option value=''>Mangalam</option><option value=''>Cheriyamundam</option><option value=''>Edayur</option><option value=''>Vettom</option><option value=''>Valavannur</option><option value=''>Irimbiliyam</option><option value=''>Purathur</option><option value=''>Kalpakancheri</option><option value=''>Melmuri</option><option value=''>Thirunavaya</option><option value=''>Perumanna</option><option value=''>Kurumbathur</option><option value=''>Ananthavoor</option><option value=''>Niramaruthur</option><option value=''>Marakkara</option><option value=''>Trikkandiyur</option><option value=''>Pariyapuram</option><option value=''>Kuttippuram</option><option value=''>Tanalur</option><option value=''>Kottakkal</option><option value=''>Naduvattom</option>";
    }
    if(tal=='Kondotty'){
        document.getElementById('txtVill').innerHTML="<option value=''>Cheekode</option><option value=''>Kuzhimanna</option><option value=''>Pulikkal</option><option value=''>Cherukavu</option><option value=''>Morayur</option><option value=''>Vazhakkad</option><option value=''>Chelembra</option><option value=''>Muthuvallur</option><option value=''>Pallikkal</option><option value=''>Kondotty</option><option value=''>Nediyiruppu</option><option value=''>Vazhayoor</option>";
    }
    if(tal=='Kozhikode'){
        document.getElementById('txtVill').innerHTML="<option value='Beypore'>Beypore</option><option value='Chathamangalam'>Chathamangalam</option><option value='Chelannur'>Chelannur</option><option value='Chelavur'>Chelavur</option><option value='Cheruvannoor'>Cheruvannoor</option><option value='Chevayur'>Chevayur</option><option value='Elathur'>Elathur</option><option value='Feroke'>Feroke</option><option value='Kacheri'>Kacheri</option><option value='Kadalundi'>Kadalundi</option><option value='Kakkad'>Kakkad</option><option value='Kakkodi'>Kakkodi</option><option value='Kakkur'>Kakkur</option><option value='Karuvanthiruthi'>Karuvanthiruthi</option><option value='Kasaba'>Kasaba</option><option value='Kodiyathur'>Kodiyathur</option><option value='Kottooli'>Kottooli</option><option value='Kumaranallur'>Kumaranallur</option><option value='Kunnamangalam'>Kunnamangalam</option><option value='Kuruvattoor'>Kuruvattoor</option><option value='Kuttikkattoor'>Kuttikkattoor</option><option value='Madavur'>Madavur</option><option value='Mavoor'>Mavoor</option><option value='Nagaram'>Nagaram</option><option value='Nanminda'>Nanminda</option><option value='Neeleswaram'>Neeleswaram </option><option value='Nellikode'>Nellikode</option><option value='Olavanna'>Olavanna</option><option value='Panniyankara'>Panniyankara </option><option value='Pantheerankavu'>Pantheerankavu</option><option value='Perumanna'>Perumanna</option><option value='Peruvayal'>Peruvayal</option><option value='Poolakkode'>Poolakkode</option><option value='Puthiyangadi'>Puthiyangadi</option><option value='Ramanattukara'>Ramanattukara</option><option value='Thalakulathur'>Thalakulathur</option><option value='Thazekode'>Thazekode</option><option value='Valayanad'>Valayanad</option><option value='Vengeri'>Vengeri</option>";
        
    }
    if(tal=='Vadakara'){
        document.getElementById('txtVill').innerHTML="<option value='Ayancheri'>Ayancheri</option><option value='Azhiyur'>Azhiyur</option><option value='Chekyad'>Chekyad</option><option value='Chorode'>Chorode</option><option value='Edachery'>Edachery</option><option value='Eramala'>Eramala</option><option value='Kavilumpara'>Kavilumpara</option><option value='Kayakkodi'>Kayakkodi</option><option value='Kottappally'>Kottappally</option><option value='Kunnummal'>Kunnummal</option><option value='Kuttyadi'>Kuttyadi</option><option value='Maniyur'>Maniyur</option><option value='Maruthonkara'>Maruthonkara</option><option value='Nadakkuthazhe'>Nadakkuthazhe</option><option value='Nadapuram'>Nadapuram</option><option value='Narippatta'>Narippatta</option><option value='Onchiyam'>Onchiyam</option><option value='Palayad'>Palayad</option><option value='Purameri'>Purameri</option><option value='Thinur'>Thinur</option><option value='Thiruvallur'>Thiruvallur</option><option value='Thuneri'>Thuneri</option><option value='Vadakara'>Vadakara</option><option value='Valayam'>Valayam</option><option value='Vanimel'>Vanimel</option><option value='Velam'>Velam</option><option value='Vilangad'>Vilangad</option><option value='Villyppally'>Villyppally</option>";
    }
     if(tal=='Thamarassery'){
        document.getElementById('txtVill').innerHTML="<option value='Engapuzha'>Engapuzha</option><option value='Kizhakkoth'>Kizhakkoth</option><option value='Kodanchery'>Kodanchery</option><option value='Koduvally'>Koduvally</option><option value='Kedavur'>Kedavur</option><option value='Koodaranji'>Koodaranji</option><option value='Koodathai'>Koodathai</option><option value='Puthuppadi'>Puthuppadi</option><option value='Puthur'>Puthur</option><option value='Raroth'>Raroth</option><option value='Thiruvampadi'>Thiruvampadi</option><option value='Vavad'>Vavad</option><option value='Kanthalad'>Kanthalad</option><option value='Kinalur'>Kinalur</option><option value='Panangad'>Panangad</option><option value='Sivapuram'>Sivapuram</option><option value='Unnikulam'>Unnikulam</option><option value='Narikkuni'>Narikkuni</option><option value='Nellippoyil'>Nellippoyil</option><option value='Kattippara'>Kattippara</option>";
     }
    if(tal=='Koyilandy'){
        document.getElementById('txtVill').innerHTML="<option value='Arikkulam'>Arikkulam</option><option value='Atholi'>Atholi</option><option value='Avidanallur'>Avidanallur</option><option value='Balussery'>Balussery</option><option value='Chakkittappara'>Chakkittappara</option><option value='Changaroth'>Changaroth</option><option value='Chemancheri'>Chemancheri</option><option value='Chempanoda'>Chempanoda</option><option value='Chengottukavu'>Chengottukavu</option><option value='Cheruvannur'>Cheruvannur</option><option value='Eravattur'>Eravattur</option><option value='Iringal'>Iringal</option><option value='Kayanna'>Kayanna</option><option value='Keezhariyur'>Keezhariyur</option><option value='Koorachundu'>Koorachundu</option><option value='Koothali'>Koothali</option><option value='Kottur'>Kottur</option><option value='Kozhukkallur'>Kozhukkallur</option><option value='Menhanyam'>Menhanyam</option><option value='Meppayyur'>Meppayyur</option><option value='MoodadiMoodadi'>Moodadi</option><option value='Naduvannur'>Naduvannur</option><option value='Nochad'>Nochad</option><option value='Paleri'>Paleri</option><option value='Panthalayani'>Panthalayani</option><option value='Payyoli'>Payyoli</option><option value='Perambra'>Perambra</option><option value='Thikkodi'>Thikkodi</option><option value='Thurayur'>Thurayur</option><option value='Ulliyeri'>Ulliyeri</option><option value='Viyyur'>Viyyur</option>";
    }
    
    
    if(tal=='Palakkad'){
        document.getElementById('txtVill').innerHTML="<option value='Palakkad_1'>Palakkad 1</option><option value='Palakkad_2'>Palakkad 2</option><option value='Palakkad_3'>Palakkad 3</option><option value='Akathethara'>Akathethara</option><option value='Malampuzha_1'>Malampuzha 1</option><option value='Malampuzha_2'>Malampuzha 2</option><option value='Marutharod'>Marutharod</option><option value='Pirayiri'>Pirayiri</option><option value='Kannadi_1'>Kannadi 1</option><option value='Kannadi_2'>Kannadi 2</option><option value='Yakkara'>Yakkara</option><option value='Parli_1'>Parli 1</option><option value='Parli_2'>Parli 2</option><option value='Mankara'>Mankara</option><option value='Mannur'>Mannur</option><option value='Keralassery'>Keralassery</option><option value='Kongad_1'>Kongad 1</option><option value='Kongad_2'>Kongad 2</option><option value='Mundur_1'>Mundur 1</option><option value='Mundur_2'>Mundur 2</option><option value='Puduppariyaram_1'>Puduppariyaram 1</option><option value='Puduppariyaram_2'>Puduppariyaram 2</option><option value='Elappully_1'>Elappully_1</option><option value='Elappully_2'>Elappully 2</option><option value='Pudussery_east'>Pudussery east</option><option value='Pudussery_central'>Pudussery central</option><option value='Pudussery_west'>Pudussery_west</option><option value='Kodumbu'>Kodumbu</option><option value='Peruvemba'>Peruvemba</option><option value=''Polpully>Polpully</option>";
    }
    if(tal=='Chittur'){
        document.getElementById('txtVill').innerHTML="<option value='Vadakarapathy'>Vadakarapathy</option><option value='Ozhalapathy'>Ozhalapathy</option><option value='Eruthiyampathy'>Eruthiyampathy</option><option value='Kozhipathy'>Kozhipathy</option><option value='Valliyavallampathy'>Valliyavallampathy</option><option value='Kozhinjampara'>Kozhinjampara</option><option value='Nallepully'>Nallepully</option><option value='Thattamangalam'>Thattamangalam</option><option value='Moolathara'>Moolathara</option><option value='Chittur'>Chittur</option><option value='Perumatty'>Perumatty</option><option value='Thekkedesaom'>Thekkedesaom</option><option value='Pattenchery'>Pattenchery</option><option value='Vandithavalam'>Vandithavalam</option><option value='Koduvayoor_1'>Koduvayoor 1</option><option value='Koduvayoor_2'>Koduvayoor 2</option><option value='Muthalamada_1'>Muthalamada 1</option><option value='Muthalamada_2'>Muthalamada 2</option><option value='Pallessana'>Pallessana</option><option value='Kollenkode_1'>Kollenkode 1</option><option value='Kollenkode_2'>Kollenkode 2</option><option value='Vadavannur'>Vadavannur</option><option value='Elavenchery'>Elavenchery</option><option value='Puthunagaram'>Puthunagaram</option><option value='Nemmara'>Nemmara</option><option value='Vallengi'>Vallengi</option><option value='Kayaradi'>Kayaradi</option><option value='Nelliyampathy'>Nelliyampathy</option><option value='Thiruvazhiyode'>Thiruvazhiyode</option><option value='Ayilur'>Ayilur</option>";
    }
     if(tal=='Alathur'){
        document.getElementById('txtVill').innerHTML="<option value='Alathur'>Alathur</option><option value='Erimayur_1'>Erimayur 1</option><option value='Erimayur_2'>Erimayur 2</option><option value='Melarkode'>Melarkode</option><option value='Vandazhi_1'>Vandazhi 1</option><option value='Vandazhi_2'>Vandazhi 2</option><option value='Kizhakenchery_1'>Kizhakenchery 1</option><option value='Kizhakenchery_2'>Kizhakenchery 2</option><option value='Vadakenchery_1'>Vadakenchery 1</option><option value='Vadakenchery_2'>Vadakenchery_2</option><option value='Kannambara_1'>Kannambara 1</option><option value='Kannambara_2'>Kannambara 2</option><option value='Puthukode'>Puthukode</option><option value='Kavasery_1'>Kavasery 1</option><option value='Kavasery_2'>Kavasery 2</option><option value='Tarur_1'>Tarur 1</option><option value='Tarur_2'>Tarur 2</option><option value='Mangalam_dam'>Mangalam dam</option><option value='Thenkurussi_1'>Thenkurussi 1</option><option value='Thenkurussi_2'>Thenkurussi 2</option><option value='Coyalmannam_1'>Coyalmannam 1</option><option value='Coyalmannam_2'>Coyalmannam 2</option><option value='Mathur_1'>Mathur 1</option><option value='Mathur_2'>Mathur 2</option><option value='Kuthanur_1'>Kuthanur 1</option><option value='Kuthanur_2'>Kuthanur 2</option><option value='Perukotukurussi_1'>Perukotukurussi 1</option><option value='Perukotukurussi_2'>Perukotukurussi 2</option><option value='Kottayi_1'>Kottayi 1</option><option value='Kottayi_2'>Kottayi 2</option>";
     }
    if(tal=='Ottapalam'){
        document.getElementById('txtVill').innerHTML="<option value='Ottapalam_1'>Ottapalam 1</option><option value='Ottapalam_2'>Ottapalam 2</option><option value='Shornur_1'>Shornur_1</option><option value='Shornur_2'>Shornur 2</option><option value='Vaniyamkulam_1'>Vaniyamkulam 1</option><option value='Vaniyamkulam_2'>Vaniyamkulam_2</option><option value='Anaganadi'>Anaganadi</option><option value='Chalavara'>Chalavara</option><option value='Lakkidi_perur_1'>Lakkidi perur 1</option><option value='Lakkidi_perur_2'>Lakkidi perur 2</option><option value='Ambalapara_1'>Ambalapara 1</option><option value='Ambalapara_2'>Ambalapara 2</option><option value='Sreekrishnapuram_1'>Sreekrishnapuram 1</option><option value='Sreekrishnapuram_2'>Sreekrishnapuram 2</option><option value='Pookottukavu'>Pookottukavu</option><option value='Karimpuzha_1'>Karimpuzha 1</option><option value='Karimpuzha_2'>Karimpuzha 2</option><option value='Kadampazhipuram_1'>Kadampazhipuram 1</option><option value='Kadampazhipuram_2'>Kadampazhipuram 2</option><option value='Vellenezhi'>Vellenezhi</option><option value='Cherpullassery'>Cherpullassery</option><option value='Thrikadeeri_1'>Thrikadeeri 1</option><option value='Thrikadeeri_2'>Thrikadeeri 2</option><option value='Nellaya'>Nellaya</option>";
    }
    if(tal=='Mannarkkad'){
        document.getElementById('txtVill').innerHTML="<option value='Alanallur_1'>Alanallur 1</option><option value='Alanallur_2'>Alanallur 2</option><option value='Alanallur_3'>Alanallur 3</option><option value='Thachanattukara_1'>Thachanattukara 1</option><option value='Thachanattukara_2'>Thachanattukara 2</option><option value='Kottopadam_1'>Kottopadam 1</option><option value='Kottopadam_2'>Kottopadam 2</option><option value='Kottopadam_3'>Kottopadam 3</option><option value='Kumaramputhur'>Kumaramputhur</option><option value='Mannarkkad_1'>Mannarkkad 1</option><option value='Mannarkkad_2'>Mannarkkad 2</option><option value='Pottassery_1'>Pottassery 1</option><option value='Pottassery_2'>Pottassery 2</option><option value='Karimba_1'>Karimba 1</option><option value='Karimba_2'>Karimba 2</option><option value='Karakurussi'>Karakurussi</option><option value='Payanedam'>Payanedam</option><option value='Palakayam'>Palakayam</option><option value='Thachampara'>Thachampara</option><option value='Agali'>Agali</option><option value='Puthur'>Puthur</option><option value='Sholayur'>Sholayur</option><option value='Kottathara'>Kottathara</option><option value='Padavayal'>Padavayal</option><option value='Kallamala'>Kallamala</option>";
    }
    if(tal=='Pattambi'){
        document.getElementById('txtVill').innerHTML="<option value='Pattambi'>Pattambi</option><option value='Ongallur_1'>Ongallur 1</option><option value='Ongallur_2'>Ongallur 2</option><option value='Muthuthala'>Muthuthala</option><option value='Thiruvegapura'>Thiruvegapura</option><option value='Koppam'>Koppam</option><option value='Kulukkallur'>Kulukkallur</option><option value='Vallapuzha'>Vallapuzha</option><option value='Vilayur'>Vilayur</option><option value='Paruthur'>Paruthur</option><option value='Thrithala'>Thrithala</option><option value='Pattithara'>Pattithara</option><option value='Kappur'>Kappur</option><option value='Anakara'>Anakara</option><option value='Callissery'>Callissery</option><option value='Nagalassery'>Nagalassery</option><option value='Thirumittakode 1'>Thirumittakode_1</option><option value='Thirumittakode_2'>Thirumittakode 2</option>";
        
    }
    
    
     if(tal=='Chavakkad'){
        document.getElementById('txtVill').innerHTML="<option value='Annakara'>Annakara</option><option value='Brahmakulam'>Brahmakulam</option><option value='Chavakkad'>Chavakkad</option><option value='Chavakkad'>Chavakkad</option><option value='Edakkazhiyur'>Edakkazhiyur</option><option value='Elavally'>Elavally</option><option value='Engandiyur'>Engandiyur</option><option value='Guruvayoor'>Guruvayoor</option><option value='Irimbranallur'>Irimbranallur</option><option value='Iringaprom'>Iringaprom</option><option value='Kadappuram'>Kadappuram</option><option value='Kadikkad'>Kadikkad</option><option value='Kundazhiyur'>Kundazhiyur</option><option value='Mullassery'>Mullassery</option><option value='Nattika'>Nattika</option><option value='Orumanayur'>Orumanayur</option><option value='Paluvai'>Paluvai</option><option value='Pavaratty'>Pavaratty</option><option value='Perakam'>Perakam</option><option value='Pookode'>Pookode</option><option value='Punnayur'>Punnayur</option><option value='Punnayurkulam'>Punnayurkulam</option><option value='Talikkulam'>Talikkulam</option><option value='Thaikkad'>Thaikkad</option><option value='Vadakkekad'>Vadakkekad</option><option value='Vadanappally'>Vadanappally</option><option value='Valappad'>Valappad</option><option value='Venkitangu'>Venkitangu</option><option value='Venmanad'>Venmanad</option><option value='Vylathur'>Vylathur</option>";
     }
    if(tal=='Kodungallur'){
        document.getElementById('txtVill').innerHTML="<option value='Ala'>Ala</option><option value='Azhikode'>Azhikode</option><option value='Chendrappini'>Chendrappini</option><option value='Edathiruthy'>Edathiruthy</option><option value='Edavilangu'>Edavilangu</option><option value='Eriyad'>Eriyad</option><option value='Kaipamangalam'>Kaipamangalam</option><option value='Kodungallur'>Kodungallur</option><option value='Koolimuttam'>Koolimuttam</option><option value='Madathumpady'>Madathumpady</option><option value='Methala'>Methala</option><option value='Padinjare_Vemballur'>Padinjare Vemballur</option><option value='Pallippuram'>Pallippuram</option><option value='Panangad'>Panangad</option><option value='Pappinivattom'>Pappinivattom</option><option value='Perinjanam'>Perinjanam</option><option value='Poyya'>Poyya</option>";
    }
     if(tal=='Mukundapuram'){
        document.getElementById('txtVill').innerHTML="<option value='Alathur'>Alathur</option><option value='Alur'>Alur</option><option value='Amballur'>Amballur</option><option value='Anandapuram'>Anandapuram</option><option value='Annallur'>Annallur</option><option value='Chalakudy'>Chalakudy</option><option value='Chengallur'>Chengallur</option><option value='Edathirinji'>Edathirinji</option><option value='Elanjipra'>Elanjipra</option><option value='Irinjalakuda'>Irinjalakuda</option><option value='Kaduppassery'>Kaduppassery</option><option value='Kakkulissery'>Kakkulissery</option><option value='Kallettumkara'>Kallettumkara</option><option value='Kallur'>Kallur</option><option value='Kallur_Thekkummuri'>Kallur Thekkummuri</option><option value='Kallur_Vadakkummuri'>Kallur Vadakkummuri</option><option value='Karalam'>Karalam</option><option value='Karumathra'>Karumathra</option><option value='Kattur'>Kattur</option><option value='Kizhakkummuri'>Kizhakkummuri</option><option value='Kodakara'>Kodakara</option><option value='Kodassery'>Kodassery</option><option value=''Koratty>Koratty</option><option value='Kottanellur'>Kottanellur</option><option value='Kuruvilassery'>Kuruvilassery</option><option value='Kuttichira'>Kuttichira</option><option value='Madayikonam'>Madayikonam</option><option value='Manavalassery'>Manavalassery</option><option value='Mattathur'>Mattathur</option><option value='Melur'>Melur</option><option value='Mupliyam'>Mupliyam</option><option value='Muringur_Vadakkummuri'>Muringur Vadakkummuri</option><option value='Muriyad'>Muriyad</option><option value='Nandipulam'>Nandipulam</option><option value='Nellayi'>Nellayi</option><option value='Nenmenikkara'>Nenmenikkara</option><option value='Padiyur'>Padiyur</option><option value='Parappukkara'>Parappukkara</option><option value='Pariyaram'>Pariyaram</option><option value='Poomangalam'>Poomangalam</option><option value='Porathissery'>Porathissery</option><option value='Pullur'>Pullur</option><option value='Puthenchira'>Puthenchira</option><option value=''Puthukkad>Puthukkad</option><option value='Thazhekkad'>Thazhekkad</option><option value='Thekkumkara'>Thekkumkara</option><option value='Thirumukkulam'>Thirumukkulam</option><option value='Thottippal'>Thottippal</option><option value='Trikkur'>Trikkur</option><option value='Vadakkumbhagom'>Vadakkumbhagom</option><option value='Vadakkumkara'>Vadakkumkara</option><option value='Vadama'>Vadama</option><option value='Vallivattom'>Vallivattom</option><option value='Varandarappilly'>Varandarappilly</option><option value='Vellikulangara'>Vellikulangara</option><option value='Vellookkara'>Vellookkara</option>";
     }
   
 
    if(tal=='Thalapilly'){
        document.getElementById('txtVill').innerHTML="<option value='Akathiyoor'>Akathiyoor</option><option value='Alur'>Alur</option><option value='Arangottukara'>Arangottukara</option><option value='Attoor'>Attoor</option><option value='Chelakkara'>Chelakkara</option><option value='Chelakode'>Chelakode</option><option value='Chemmanthatta'>Chemmanthatta</option><option value='Cheruthuruthi'>Cheruthuruthi</option><option value='Chiramanangad'>Chiramanangad</option><option value='Chiranellur'>Chiranellur</option><option value='Chittanda'>Chittanda</option><option value='Choondal'>Choondal</option><option value='Chowwannur'>Chowwannur</option><option value='Desamangalam'>Desamangalam</option><option value='Elanad'>Elanad</option><option value='Enkakkad'>Enkakkad</option><option value='Eranellur'>Eranellur</option><option value='Eyyal'>Eyyal</option><option value='Kadangode'>Kadangode</option><option value='Kadavallur'>Kadavallur</option><option value='Kandanassery'>Kandanassery</option><option value='Kanipayyur'>Kanipayyur</option><option value='Kaniyarkode'>Kaniyarkode</option><option value='Kanjirakode'>Kanjirakode</option><option value='Karikkad'>Karikkad</option><option value='Kariyannur'>Kariyannur</option><option value='Karumathara'>Karumathara</option><option value='Kattakampal'>Kattakampal</option><option value='Killimangalam'>Killimangalam</option><option value='Kiralur'>Kiralur</option><option value='Kondazhy'>Kondazhy</option><option value='Kottappuram'>Kottappuram</option><option value='Kumaranellur'>Kumaranellur</option><option value='Kunnamkulam'>Kunnamkulam</option><option value='Kurumala'>Kurumala</option><option value='Manalithara'>Manalithara</option><option value='Mangad'>Mangad</option><option value='Mayannur'>Mayannur</option><option value='Minalur'>Minalur</option><option value='Mullurkara'>Mullurkara</option><option value='Mundathikode'>Mundathikode</option><option value='Nedumpura'>Nedumpura</option><option value='Nelluwaya'>Nelluwaya</option><option value='Painkulam'>Painkulam</option><option value='Pallur'>Pallur</option><option value='Pampady'>Pampady</option><option value='Pangarappilly'>Pangarappilly</option><option value='Panjal'>Panjal</option><option value='Parlikad'>Parlikad</option><option value='Pazhanji'>Pazhanji</option><option value='Pazhayannur'>Pazhayannur</option><option value='Peringandoor'>Peringandoor</option><option value='Perumpilavu'>Perumpilavu</option><option value='Pilakkad'>Pilakkad</option><option value='Porkulam'>Porkulam</option><option value='Pulakode'>Pulakode</option><option value='Puthuruthy'>Puthuruthy</option><option value='Thalassery'>Thalassery</option><option value='Thayyur'>Thayyur</option><option value='Thekkumkara'>Thekkumkara</option><option value='Thichur'>Thichur</option><option value='Thiruvilwamala'>Thiruvilwamala</option><option value='Thonnurkara'>Thonnurkara</option><option value='Vadakkethara'>Vadakkethara</option><option value='Varavoor'>Varavoor</option><option value='Vellarakkad'>Vellarakkad</option><option value='Vellattanjur'>Vellattanjur</option><option value='Velur'>Velur</option><option value='Venganellur'>Venganellur</option><option value='Vennur'>Vennur</option><option value='Viruppakka'>Viruppakka</option><option value=''Wadakkanchery>Wadakkanchery</option>";
    }
     if(tal=='Thrissur'){
        document.getElementById('txtVill').innerHTML="<option value='Adat'>Adat</option><option value='Alappad'>Alappad</option><option value='Anjur'>Anjur</option><option value='Anthicad'>Anthicad</option><option value='Arattupuzha'>Arattupuzha</option><option value='Avanur'>Avanur</option><option value='Avinissery'>Avinissery</option><option value='Chalakkal'>Chalakkal</option><option value='Chazhoor'>Chazhoor</option><option value='Cherpu'>Cherpu</option><option value='Chevvoor'>Chevvoor</option><option value='Chittilappilly'>Chittilappilly</option><option value='Choolissery'>Choolissery</option><option value='Edakkalathur'>Edakkalathur</option><option value='Eravu'>Eravu</option><option value='Inchamudi'>Inchamudi</option><option value='Kainoor'>Kainoor</option><option value='Kaiparamba'>Kaiparamba</option><option value='Karamuck'>Karamuck</option><option value='Killannur'>Killannur</option><option value='Kizhakkummuri'>Kizhakkummuri</option><option value='Kizhuppillikkara'>Kizhuppillikkara</option><option value='Kodannur'>Kodannur</option><option value='Kolazhy'>Kolazhy</option><option value='Kozhukkully'>Kozhukkully</option><option value='Kurichikkara'>Kurichikkara</option><option value='Kurumpilavu'>Kurumpilavu</option><option value='Kuttoor'>Kuttoor</option><option value='Madakkathara'>Madakkathara</option><option value='Manakkody'>Manakkody</option><option value='Manalur'>Manalur</option><option value='Mannamangalam'>Mannamangalam</option><option value='Marathakkara'>Marathakkara</option><option value='Mulayam'>Mulayam</option><option value='Nadathara'>Nadathara</option><option value='Oorakam'>Oorakam</option><option value='Padiyam'>Padiyam</option><option value='Palissery'>Palissery</option><option value='Pallippuram'>Pallippuram</option><option value='Pananchery'>Pananchery</option><option value='Parakkad'>Parakkad</option><option value='Paralam'>Paralam</option><option value='Peechi'>Peechi</option><option value='Peramangalam'>Peramangalam</option><option value='Pottore'>Pottore</option><option value='Pullu'>Pullu</option><option value='Puranattukara'>Puranattukara</option><option value='Puthur'>Puthur</option><option value='Puzhakkal'>Puzhakkal</option><option value='Thangalur'>Thangalur</option><option value='Thanniyam'>Thanniyam</option><option value='Tholur'>Tholur</option><option value='Thrissur'>Thrissur</option><option value='Vadakkummuri'>Vadakkummuri</option><option value='Vallachira'>Vallachira</option><option value='Velappaya'>Velappaya</option><option value='Vellanikkara'>Vellanikkara</option><option value='Veluthur'>Veluthur</option><option value='Venginissery'>Venginissery</option>";
     }
    
    
    if(tal=='Adoor'){
        document.getElementById('txtVill').innerHTML="<option value='Pallickal'>Pallickal</option><option value='Angadickal'>Angadickal</option><option value='Ezhamkulam'>Ezhamkulam</option><option value='Kadambanad'>Kadambanad</option><option value='Thumpamon'>Thumpamon</option><option value='Kodumon'>Kodumon</option><option value='Enathu'>Enathu</option><option value='Peringnad'>Peringnad</option><option value='Enadimangalam'>Enadimangalam</option><option value='Adoor'>Adoor</option><option value='Pandalam'>Pandalam</option><option value='Kurampala'>Kurampala</option><option value='Erathu'>Erathu</option><option value='Pandalam-Thekkekara'>Pandalam-Thekkekara</option>";
    }
    if(tal=='Kozhencherry'){
        document.getElementById('txtVill').innerHTML="<option value='Aranmula'>Aranmula</option><option value='Chenneerkara'>Chenneerkara</option><option value='Mezhuveli'>Mezhuveli</option><option value='Kulanada'>Kulanada</option><option value='Elanthoor'>Elanthoor</option><option value='Kidangannur'>Kidangannur</option><option value='Kozhenchery'>Kozhenchery</option><option value='Mallapuzhasserry'>Mallapuzhasserry</option><option value='Naranganam'>Naranganam</option><option value='Omallur'>Omallur</option><option value='Pathanamthitta'>Pathanamthitta</option>";
    }
     if(tal=='Ranni'){
        document.getElementById('txtVill').innerHTML="<option value='Ranni_Angadi'>Ranni Angadi</option><option value='Ranny_Pazhavagadi'>Ranny Pazhavagadi</option><option value='Chetakkal'>Chetakkal</option><option value='Cherukole'>Cherukole</option><option value='Ayroor'>Ayroor</option><option value='Kollamula'>Kollamula</option><option value='Perunad'>Perunad</option><option value='Vadasserikara'>Vadasserikara</option><option value='Ranny'>Ranny</option><option value='Athikayam'>Athikayam</option>";
     }
    if(tal=='Mallappally'){
        document.getElementById('txtVill').innerHTML="<option value='Anicadu'>Anicadu</option><option value='Kalloorppara'>Kalloorppara</option><option value='Ezhumattoor'>Ezhumattoor</option><option value='Perumpatty'>Perumpatty</option><option value='Kottangal'>Kottangal</option><option value='Kunnamthanam'>Kunnamthanam</option><option value='Mallapally'>Mallapally</option><option value='Purammattom'>Purammattom</option><option value='Thelliyoor'>Thelliyoor</option>";
    }
    if(tal=='Thiruvalla'){
        document.getElementById('txtVill').innerHTML="<option value='Kuttapuzha'>Kuttapuzha</option><option value='Eraviperoor'>Eraviperoor</option><option value='Kaviyoor'>Kaviyoor</option><option value='Koipuram'>Koipuram</option><option value='Thiruvalla'>Thiruvalla</option><option value='Thottapuzhasserry'>Thottapuzhasserry</option><option value='Kadapra'>Kadapra</option><option value='Kuttoor'>Kuttoor</option><option value='Nedumpram'>Nedumpram</option><option value='Niranam'>Niranam</option><option value='Peringra'>Peringra</option><option value='Kavumbhagum'>Kavumbhagum</option>";
    }
     if(tal=='Konni'){
        document.getElementById('txtVill').innerHTML="<option value='Iravon'>Iravon</option><option value='Vallicode'>Vallicode</option><option value='V-Kottayam'>V-Kottayam</option><option value='Kalanjoor'>Kalanjoor</option><option value='Konnithazham'>Konnithazham</option><option value='Pramadom'>Pramadom</option><option value='Koodal'>Koodal</option><option value='Malayalapuzha'>Malayalapuzha</option><option value='Konni'>Konni</option><option value='Aruvappalum'>Aruvappalum</option><option value='Thannithode'>Thannithode</option><option value='Mylapra'>Mylapra</option><option value='Seethathode'>Seethathode</option>";
     }
    
    
    if(tal=='Changanasserry'){
        document.getElementById('txtVill').innerHTML="<option value='Changanacherry'>Changanacherry</option><option value='Chethipuzha'>Chethipuzha</option><option value='Kangazha'>Kangazha</option><option value='Karukachal'>Karukachal</option><option value='Kurichy'>Kurichy</option><option value='Madappally'>Madappally</option><option value='Nedumkunnam'>Nedumkunnam</option><option value='Paippadu'>Paippadu</option><option value='Thottakkadu'>Thottakkadu</option><option value='Thrikkodithanam'>Thrikkodithanam</option><option value='Vakathanam'>Vakathanam</option><option value='Vazhappally_(E)'>Vazhappally (E)</option><option value='Vazhappally_(W)'>Vazhappally (W)</option><option value='Vazhoor'>Vazhoor</option><option value='Vellavoor'>Vellavoor</option>";
    }
     if(tal=='Kanjirappally'){
        document.getElementById('txtVill').innerHTML="<option value='Cheruvalley'>Cheruvalley</option><option value='Chirakadavu'>Chirakadavu</option><option value='Edakkunnam'>Edakkunnam</option><option value='Elamkulam'>Elamkulam</option><option value='Elikulam'>Elikulam</option><option value='Erumely_(N)'>Erumely (N)</option><option value='Erumely_(S)'>Erumely (S)</option><option value='Kanjirappally'>Kanjirappally</option><option value='Koottickal'>Koottickal</option><option value='Koovappally'>Koovappally</option><option value='Koruthodu'>Koruthodu</option><option value='Manimala'>Manimala</option><option value='Mundakayam'>Mundakayam</option>";
     }
    if(tal=='Kottayam'){
        document.getElementById('txtVill').innerHTML="<option value='Akalakunnam'>Akalakunnam</option><option value=''Anicadu>Anicadu</option><option value='Arpookara'>Arpookara</option><option value='Athirampuzha'>Athirampuzha</option><option value='Ayarkunnam'>Ayarkunnam</option><option value='Aymanam'>Aymanam</option><option value=''Chengalam_(S)>Chengalam (S)</option><option value='Chengalam_(E)'>Chengalam (E)</option><option value='Ettumanoor'>Ettumanoor</option><option value='Kaipuzha'>Kaipuzha</option><option value='Kooroppada'>Kooroppada</option><option value='Kottayam'>Kottayam</option><option value='Kumarakom'>Kumarakom</option><option value='Manarcadu'>Manarcadu</option><option value='Meenadom'>Meenadom</option><option value='Muttambalam'>Muttambalam</option><option value='Nattakom'>Nattakom</option><option value='Onamthuruthu'>Onamthuruthu</option><option value='Pampady'>Pampady</option><option value='Panachicadu'>Panachicadu</option><option value='Peroor'>Peroor</option><option value='Perumpaicadu'>Perumpaicadu</option><option value='Puthuppally'>Puthuppally</option><option value='Thiruvarppu'>Thiruvarppu</option><option value='Veloor'>Veloor</option><option value='Vijayapuram'>Vijayapuram</option>";
     }
    if(tal=='Meenachil'){
        document.getElementById('txtVill').innerHTML="<option value='Bharananganam'>Bharananganam</option><option value='Elakkadu'>Elakkadu</option><option value='Erattupetta'>Erattupetta</option><option value='Kadanadu'>Kadanadu</option><option value='Kanakkary'>Kanakkary</option><option value='Kidangoor'>Kidangoor</option><option value='Kondoor'>Kondoor</option><option value='Kuravilangadu'>Kuravilangadu</option><option value='Kurichithanam'>Kurichithanam</option><option value='Lalam'>Lalam</option><option value='Meenachil'>Meenachil</option><option value='Melukavu'>Melukavu</option><option value='Monippally'>Monippally</option><option value='Moonnilavu'>Moonnilavu</option><option value='Poonjar_Nadubhagam'>Poonjar Nadubhagam</option><option value='Poonjar_Thekkekara'>Poonjar Thekkekara</option><option value='Thalanadu'>Thalanadu</option><option value='Poovarany'>Poovarany</option><option value='Puliyannoor'>Puliyannoor</option><option value='Ramapuram'>Ramapuram</option><option value='Thalappalam'>Thalappalam</option><option value='Theekoy'>Theekoy</option><option value='Uzhavoor'>Uzhavoor</option><option value='Vallichira'>Vallichira</option><option value='Veliyannoor'>Veliyannoor</option><option value='Vellilappally'>Vellilappally</option><option value='Kadaplamattom'>Kadaplamattom</option><option value='Poonjar'>Poonjar</option>";
     }
    if(tal=='Vaikom'){
        document.getElementById('txtVill').innerHTML="<option value='Chempu'>Chempu</option><option value='Kaduthuruthy'>Kaduthuruthy</option><option value='Kallara'>Kallara</option><option value='Kothanalloor'>Kothanalloor</option><option value='Kulasekharamangalam'>Kulasekharamangalam</option><option value='Manjoor'>Manjoor</option><option value='Mulakkulam'>Mulakkulam</option><option value='Muttuchira'>Muttuchira</option><option value='Naduvila'>Naduvila</option><option value='Njeezhoor'>Njeezhoor</option><option value='Thalayazham'>Thalayazham</option><option value='Vadakkemuri'>Vadakkemuri</option><option value='Vadayar'>Vadayar</option><option value='Vaikom'>Vaikom</option><option value='Vechoor'>Vechoor</option><option value='Velloor'>Velloor</option><option value='TV_Puram'>TV Puram</option><option value='Udhayanapuram'>Udhayanapuram</option>";
    }
    
    
     if(tal=='Aluva'){
        document.getElementById('txtVill').innerHTML="<option value='Chengamanad'>Chengamanad</option><option value='Parakkadavu'>Parakkadavu</option><option value='Chovvara'>Chovvara</option><option value='Thekkumbhagam'>Thekkumbhagam</option><option value='Vadakkumbhagam'>Vadakkumbhagam</option><option value='Kizhakumbhagam'>Kizhakumbhagam</option><option value='Mattur'>Mattur</option><option value='Kaladi'>Kaladi</option><option value='Malayattur'>Malayattur</option><option value='Mookkannur'>Mookkannur</option><option value='Thuravur'>Thuravur</option><option value='Manjapra'>Manjapra</option><option value='Karukutti'>Karukutti</option><option value='Aluva_East'>Aluva East</option><option value='Ayyampuzha'>Ayyampuzha</option><option value='Aluva_West'>Aluva West</option><option value='Ankamali'>Ankamali</option><option value='Nedumbasseri'>Nedumbasseri</option><option value='Choornikara'>Choornikara</option><option value='Keezhmad'>Keezhmad</option>";
     }
    if(tal=='Muvattupuzha'){
        document.getElementById('txtVill').innerHTML="<option value='Arakuzha'>Arakuzha</option><option value='Elanji'>Elanji</option><option value='Enanalloor'>Enanalloor</option><option value='Kalloorkkad'>Kalloorkkad</option><option value='Koothattukulam'>Koothattukulam</option><option value='Maneed'>Maneed</option><option value='Manjalloor'>Manjalloor</option><option value='Marady'>Marady</option><option value='Memury'>Memury</option><option value='Mulavoor'>Mulavoor</option><option value='Muvattupuzha'>Muvattupuzha</option><option value='Onakkoor'>Onakkoor</option><option value='Palakkuzha'>Palakkuzha</option><option value='Piravom'>Piravom</option><option value='Ramamangalam'>Ramamangalam</option><option value='Thirumarady'>Thirumarady</option><option value='Valakam'>Valakam</option><option value='Vellurkunnam'>Vellurkunnam</option>";
     }
    if(tal=='Paravur'){
        document.getElementById('txtVill').innerHTML="<option value='Alangad'>Alangad</option><option value='Karimalur'>Karimalur</option><option value='Paravur'>Paravur</option><option value='Muthakunnam'>Muthakunnam</option><option value='Chendamangalam'>Chendamangalam</option><option value='Kottuvally'>Kottuvally</option><option value='Ezhikkara'>Ezhikkara</option><option value='Kunnukara'>Kunnukara</option><option value='Puthenvelikkara'>Puthenvelikkara</option><option value='Vadakkekkara'>Vadakkekkara</option><option value='Kadungallur'>Kadungallur</option><option value='Varappuzha'>Varappuzha</option><option value='Elur'>Elur</option>";
     }
    if(tal=='Kothamangalam'){
        document.getElementById('txtVill').innerHTML="<option value='Kedavoor'>Kedavoor</option><option value='Keerampara'>Keerampara</option><option value='Kottappady'>Kottappady</option><option value='Kuttamangalam'>Kuttamangalam</option><option value='Kuttampuzha'>Kuttampuzha</option><option value='Neriamangalam'>Neriamangalam</option><option value='Pindimana'>Pindimana</option><option value='Pothanikkad'>Pothanikkad</option><option value='Thrikkariyoor'>Thrikkariyoor</option><option value='Varappetty'>Varappetty</option><option value='Eramallur'>Eramallur</option><option value='Kothamangalam'>Kothamangalam</option><option value='Pallarimangalam'>Pallarimangalam</option>";
     }
    if(tal=='Kanayannur'){
        document.getElementById('txtVill').innerHTML="<option value='Mulavukad'>Mulavukad</option><option value='Amballur'>Amballur</option><option value='Keecheri'>Keecheri</option><option value='Kulayettikkara'>Kulayettikkara</option><option value='Nadama'>Nadama</option><option value='Thekkumbhagam'>Thekkumbhagam</option><option value='Edakkattuvayal'>Edakkattuvayal</option><option value='Kaippattur'>Kaippattur</option><option value='Manakkunnam'>Manakkunnam</option><option value='Mulanthuruthi'>Mulanthuruthi</option><option value='Thiruvankulam'>Thiruvankulam</option><option value='Kanayannur'>Kanayannur</option><option value='Kureekad'>Kureekad</option><option value='Maradu'>Maradu</option><option value='Kumbalam'>Kumbalam</option><option value='Vazhakkala'>Vazhakkala</option><option value='Kakkanad'>Kakkanad</option><option value='Thrikkakkara_North'>Thrikkakkara North</option><option value='Kadamakkudi'>Kadamakkudi</option><option value='Poonithura'>Poonithura</option><option value='Cheranellur'>Cheranellur</option><option value='Ernakulam'>Ernakulam</option><option value='Elamkulam'>Elamkulam</option><option value='Edappally_South'>Edappally South</option><option value='Edappally_North'>Edappally North</option>";
     }
    if(tal=='Kunnathunad'){
        document.getElementById('txtVill').innerHTML="<option value='Vengola'>Vengola</option><option value='Arakkappadi'>Arakkappadi</option><option value='Kizhakkambalam'>Kizhakkambalam</option><option value='Pattimattam'>Pattimattam</option><option value='Vazhakkulam'>Vazhakkulam</option><option value='Marambilli'>Marambilli</option><option value='Iykaranadu_South'>Iykaranadu South</option><option value='Thiruvaniyur'>Thiruvaniyur</option><option value='Vadavukode'>Vadavukode</option><option value='Puthencruz'>Puthencruz</option><option value='Iykaranadu_North'>Iykaranadu North</option><option value='Kunnathunad'>Kunnathunad</option><option value='Mazhuvannur'>Mazhuvannur</option><option value='Irapuram'>Irapuram</option><option value='Rayamangalam'>Rayamangalam</option><option value='Perumbavur'>Perumbavur</option><option value='Ashamannur'>Ashamannur</option><option value='Chelamattam'>Chelamattam</option><option value='Kuvappadi'>Kuvappadi</option><option value='Kodanad'>Kodanad</option><option value='Vengur_West'>Vengur West</option><option value='Vengur_East'>Vengur East</option><option value='Kombanadu'>Kombanadu</option>";
     }
    if(tal=='Kochi'){
        document.getElementById('txtVill').innerHTML="<option value='Chellanam'>Chellanam</option><option value='Kumbalanji'>Kumbalanji</option><option value='Palluruthi'>Palluruthi</option><option value='Elankunnappuzha'>Elankunnappuzha</option><option value='Puthuvaypu'>Puthuvaypu</option><option value='Njarakkal'>Njarakkal</option><option value='Nayarambalam'>Nayarambalam</option><option value='Edavanakkad'>Edavanakkad</option><option value='Kuzhuppilly'>Kuzhuppilly</option><option value='Pallippuram'>Pallippuram</option><option value='Fort_Kochi'>Fort Kochi</option><option value='Mattancheri'>Mattancheri</option><option value='Thoppumpadi'>Thoppumpadi</option><option value='Rameswaram'>Rameswaram</option><option value='Edakochi'>Edakochi</option>";
     }
    
    //iduki
    if(tal=='Devikulam'){
        document.getElementById('txtVill').innerHTML="<option value='Anaveratty'>Anaveratty</option><option value='Kannan_Devan_Hills'>Kannan Devan Hills</option><option value='Kanthalloor'>Kanthalloor</option><option value='Keezhanthoor'>Keezhanthoor</option><option value='Kottakomboor'>Kottakomboor</option><option value='Kunjithanny'>Kunjithanny</option><option value='Mankulam'>Mankulam</option><option value='Mannamkandam'>Mannamkandam</option><option value='Marayoor'>Marayoor</option><option value='Pallivasal'>Pallivasal</option><option value='Vattavada'>Vattavada</option><option value='Vellathooval'>Vellathooval</option><option value='Munnar'>Munnar</option>";
    }
    if(tal=='Thodupuzha'){
        document.getElementById('txtVill').innerHTML="<option value='Alakkode'>Alakkode</option><option value='Arakkulam'>Arakkulam</option><option value='Elappally'>Elappally</option><option value='Karikkode'>Karikkode</option><option value='Karimannoor'>Karimannoor</option><option value='Karimkunnam'>Karimkunnam</option><option value='Kodikkulam'>Kodikkulam</option><option value='Kudayathoor'>Kudayathoor</option><option value='Kumaramangalam'>Kumaramangalam</option><option value='Manakkad'>Manakkad</option><option value='Muttom'>Muttom</option><option value='Neyyasserry'>Neyyasserry</option><option value='Purappuzha'>Purappuzha</option><option value='Thodupuzha'>Thodupuzha</option><option value='Udumbannoor'>Udumbannoor</option><option value='Vannappuram'>Vannappuram</option><option value='Velliyamattam'>Velliyamattam</option>";
    }
    if(tal=='Udumbanchola'){
        document.getElementById('txtVill').innerHTML="<option value='Anakkara'>Anakkara</option><option value='Anavilasom'>Anavilasom</option><option value='Chakkupallam'>Chakkupallam</option><option value='Chathurangappara'>Chathurangappara</option><option value='Chinnakanal'>Chinnakanal</option><option value='Kalkoonthal'>Kalkoonthal</option><option value='Kanthippara'>Kanthippara</option><option value='Karunapuram'>Karunapuram</option><option value='Pampadumpara'>Pampadumpara</option><option value='Parathode'>Parathode</option><option value='Pooppara'>Pooppara</option><option value='Bysonvalley'>Bysonvalley</option><option value='Rajakkad'>Rajakkad</option><option value='Rajakumary'>Rajakumary</option><option value='Santhanpara'>Santhanpara</option><option value='Udumbanchola'>Udumbanchola</option><option value='Vandenmedu'>Vandenmedu</option><option value='Erattayar'>Erattayar</option>";
    }
    if(tal=='Peermade'){
        document.getElementById('txtVill').innerHTML="<option value='Elappara'>Elappara</option><option value='Kokkayar'>Kokkayar</option><option value='Kumily'>Kumily</option><option value='Manchumala'>Manchumala</option><option value='Mlappara'>Mlappara</option><option value='Peermade'>Peermade</option><option value='Periyar'>Periyar</option><option value='Peruvanthanam'>Peruvanthanam</option><option value='Upputhara'>Upputhara</option><option value='Vagamon'>Vagamon</option>";
    }
    if(tal=='Idukki'){
        document.getElementById('txtVill').innerHTML="<option value='Idukki'>Idukki</option><option value='Kanjikuzhy'>Kanjikuzhy</option><option value='Kattappana'>Kattappana</option><option value='Upputhode'>Upputhode</option><option value='Kanchiyar'>Kanchiyar</option><option value='Thankamony'>Thankamony</option><option value='Vathikudy'>Vathikudy</option><option value='Konnathady'>Konnathady</option><option value='Ayyappancoil'>Ayyappancoil</option>";
    }
    //wayanad
    if(tal=='Sulthan_Bathery'){
        document.getElementById('txtVill').innerHTML="<option value='Nenmeni'>Nenmeni</option><option value='Ambalavayal'>Ambalavayal</option><option value='Sulthan_Bathery'>Sulthan Bathery</option><option value='Kidanganad'>Kidanganad</option><option value='Noolpuzha'>Noolpuzha</option><option value='Thomattuchal'>Thomattuchal</option><option value='Kuppadi'>Kuppadi</option><option value='Cheeral'>Cheeral</option><option value='Purakkadi'>Purakkadi</option><option value='Poothadi'>Poothadi</option><option value='Pulppally'>Pulppally</option><option value='Padichira'>Padichira</option><option value='Irulam'>Irulam</option><option value='Krishnagiri'>Krishnagiri</option><option value='Nadavayal'>Nadavayal</option>";
    }
     if(tal=='Vythiri'){
        document.getElementById('txtVill').innerHTML="<option value='Kunnathidavaka'>Kunnathidavaka</option><option value='Achooranam'>Achooranam</option><option value='Thariode'>Thariode</option><option value='Kottathara'>Kottathara</option><option value='Kuppadithara'>Kuppadithara</option><option value='Padinjarathara'>Padinjarathara</option><option value='Chundel'>Chundel</option><option value='Vengappally'>Vengappally</option><option value='Kavummannam'>Kavummannam</option><option value='Pozhuthana'>Pozhuthana</option><option value='Kaniyambetta'>Kaniyambetta</option><option value='Muttil North'>Muttil North</option><option value='Muttil South'>Muttil South</option><option value='Kottappadi'>Kottappadi</option><option value='Kalpetta'>Kalpetta</option><option value='Muppainadu'>Muppainadu</option><option value='Vellarmala'>Vellarmala</option><option value='Thrikkaippetta'>Thrikkaippetta</option>";
    } if(tal=='Mananthavady'){
        document.getElementById('txtVill').innerHTML="<option value='Anjukunnu'>Anjukunnu</option><option value='Porunnannur'>Porunnannur</option><option value='Nallurnadu'>Nallurnadu</option><option value='Mananthavady'>Mananthavady</option><option value='Thirunelly'>Thirunelly</option><option value='Thrissilery'>Thrissilery</option><option value='Payyambally'>Payyambally</option><option value='Cherukattoor'>Cherukattoor</option><option value='Panamaram'>Panamaram</option><option value='Periya'>Periya</option><option value='Thondernadu'>Thondernadu</option><option value='Vellamunda'>Vellamunda</option><option value='Thavinjal'>Thavinjal</option><option value='Edavaka'>Edavaka</option><option value='Valad'>Valad</option><option value='Kanhirangad'>Kanhirangad</option>";
    } 
    //kannur
    if(tal=='Kannur'){
        document.getElementById('txtVill').innerHTML="<option value='Kannur_1'>Kannur 1</option><option value='Kannur_2'>Kannur 2</option><option value='Puzhathi'>Puzhathi</option><option value='Pallikkunnu'>Pallikkunnu</option><option value='Chirakkal'>Chirakkal</option><option value='Valapattanam'>Valapattanam</option><option value='Azhikode_South'>Azhikode South</option><option value='Azhikode_North'>Azhikode North</option><option value='Elayavoor'>Elayavoor</option><option value='Valiyannur'>Valiyannur</option><option value='Munderi'>Munderi</option><option value='Kanhirod'>Kanhirod</option><option value='Anjarakandi'>Anjarakandi</option><option value='Iriveri'>Iriveri</option><option value='Chelora'>Chelora</option><option value='Chembilode'>Chembilode</option><option value='Kadambur'>Kadambur</option><option value='Mavilayi'>Mavilayi</option><option value='Makrery'>Makrery</option><option value='Muzhappilangad'>Muzhappilangad</option><option value='Edakkad'>Edakkad</option><option value='Mattool'>Mattool</option><option value='Cherukkunnu'>Cherukkunnu</option><option value='Kannapuram'>Kannapuram</option><option value='Kalliasseri'>Kalliasseri</option><option value='Pappinisseri'>Pappinisseri</option><option value='Kannadiparamba'>Kannadiparamba</option><option value='Narath'>Narath</option>";
    }
    if(tal=='Taliparamba'){
        document.getElementById('txtVill').innerHTML="<option value='Peringalam'>Peringalam</option><option value='Thimiri'>Thimiri</option><option value='Alakode'>Alakode</option><option value='Naduvil'>Naduvil</option><option value='Velladu'>Velladu</option><option value='Kooveri'>Kooveri</option><option value='Pariyaram'>Pariyaram</option><option value='Kuttiyeri'>Kuttiyeri</option><option value='Panniyoor'>Panniyoor</option><option value='Pattuvam'>Pattuvam</option><option value='Thaliparambu'>Thaliparambu</option><option value='Kurumathur'>Kurumathur</option><option value='Chuzhali'>Chuzhali</option><option value='Chengalayi'>Chengalayi</option><option value='Andhur'>Andhur</option><option value='Morazha'>Morazha</option><option value='Kolacheri'>Kolacheri</option><option value='Chelery'>Chelery</option><option value='Kayaralam'>Kayaralam</option><option value='Mayyil'>Mayyil</option><option value='Kuttiyattoor'>Kuttiyattoor</option><option value='Maniyoor'>Maniyoor</option><option value='Irikkur'>Irikkur</option><option value='Nidiyanga'>Nidiyanga</option><option value='Payyavoor'>Payyavoor</option><option value='Eruveshi'>Eruveshi</option><option value='Sreekandapuram'>Sreekandapuram</option><option value='Malappattam'>Malappattam</option><option value='Udayagiri'>Udayagiri</option>";
    }
    if(tal=='Thalassery'){
        document.getElementById('txtVill').innerHTML="<option value='Thalassery'>Thalassery</option><option value='Thiruvangad'>Thiruvangad</option><option value='Dharmadam'>Dharmadam</option><option value='Erancholi'>Erancholi</option><option value='Kadirur'>Kadirur</option><option value='Eruvatty'>Eruvatty</option><option value='Pinarayi'>Pinarayi</option><option value='Pathiriyad'>Pathiriyad</option><option value='Kottayam'>Kottayam</option><option value='Chokli'>Chokli</option><option value='Peringathur'>Peringathur</option><option value='Kodiyeri'>Kodiyeri</option><option value='Keezhallur'>Keezhallur</option><option value='Koodali'>Koodali</option><option value='Pattanur'>Pattanur</option><option value='Mangattidam'>Mangattidam</option><option value='Paduvilayi'>Paduvilayi</option><option value='Kuthuparamba'>Kuthuparamba</option><option value='Kandankunnu'>Kandankunnu</option><option value='Mananthery'>Mananthery</option><option value='Kolayad'>Kolayad</option><option value='Kannavam'>Kannavam</option><option value='Cheruvanchery'>Cheruvanchery</option><option value='Pattiam'>Pattiam</option><option value='Mokery'>Mokery</option><option value='Panniyannur'>Panniyannur</option><option value='Puthur'>Puthur</option><option value='Panoor'>Panoor</option><option value='Thripangothur'>Thripangothur</option><option value='Kolavallur'>Kolavallur</option><option value='Tholambra'>Tholambra</option><option value='Shivapuram'>Shivapuram</option><option value='Vekkalam'>Vekkalam</option><option value='New_Mahe'>New Mahe</option>";
    }
    if(tal=='Iritty'){
        document.getElementById('txtVill').innerHTML="<option value='Aralam'>Aralam</option><option value='Ayyamkunnu'>Ayyamkunnu</option><option value='Chavasseri'>Chavasseri</option><option value='Kalliad'>Kalliad</option><option value='Kanichar'>Kanichar</option><option value='Keezhur'>Keezhur</option><option value='Kelakam'>Kelakam</option><option value='Kolari'>Kolari</option><option value='Kottiyoor'>Kottiyoor</option><option value='Manathana'>Manathana</option><option value='Muzhakkunn'>Muzhakkunn</option><option value='Nuchiyad'>Nuchiyad</option><option value='Padiyoor'>Padiyoor</option><option value='Payam'>Payam</option><option value='Pazhassi'>Pazhassi</option><option value='Thillankeri'>Thillankeri</option><option value='Vayathur'>Vayathur</option><option value='Vellarvalli'>Vellarvalli</option><option value='Villamana'>Villamana</option>";
    }
    if(tal=='Payyannur'){
        document.getElementById('txtVill').innerHTML="<option value='Alappadamba'>Alappadamba</option><option value='Eramam'>Eramam</option><option value='Kankol'>Kankol</option><option value='Karivellur'>Karivellur</option><option value='Korom'>Korom</option><option value='Kuttur'>Kuttur</option><option value='Payyannur'>Payyannur</option><option value='Peralam'>Peralam</option><option value='Peringome'>Peringome</option><option value='Perinthatta'>Perinthatta</option><option value='Pulingome'>Pulingome</option><option value='Ramanthali'>Ramanthali</option><option value='Thirumeni'>Thirumeni</option><option value='Vayakkara'>Vayakkara</option><option value='Vellora'>Vellora</option><option value='Vellur'>Vellur</option><option value='Cheruthazham'>Cheruthazham</option><option value='Ezhome'>Ezhome</option><option value='Kadannappally'>Kadannappally</option><option value='Kunhimangalam'>Kunhimangalam</option><option value='Madayi'>Madayi</option><option value='Panapuzha'>Panapuzha</option>";
    }
    
    //kasargod
    if(tal=='Kasargod'){
        document.getElementById('txtVill').innerHTML="<option value='Nettanige'>Nettanige</option><option value='Adhur'>Adhur</option><option value='Bellur'>Bellur</option><option value='Kumbadaje'>Kumbadaje</option><option value='Ubrangala'>Ubrangala</option><option value='Badiadka'>Badiadka</option><option value='Bela'>Bela</option><option value='Madhur'>Madhur</option><option value='Patla'>Patla</option><option value='Shiribagilu'>Shiribagilu</option><option value='Puthoor'>Puthoor</option><option value='Kudlu'>Kudlu</option><option value='Adkkathubayal'>Adkkathubayal</option><option value='Thalangara'>Thalangara</option><option value='Kasaragod'>Kasaragod</option><option value='Muttathody'>Muttathody</option><option value='Chengala'>Chengala</option><option value='Pady'>Pady</option><option value='Nekraje'>Nekraje</option><option value='Muliyar'>Muliyar</option><option value='Karadka'>Karadka</option><option value='Adoor'>Adoor</option><option value='Delampady'>Delampady</option><option value='Bendadka'>Bendadka</option><option value='Kuttikole'>Kuttikole</option><option value='Bedadka'>Bedadka</option><option value='Kolathur'>Kolathur</option><option value='Thekkil'>Thekkil</option><option value='Karivedakam'>Karivedakam</option><option value='Perumbala'>Perumbala</option><option value='Chemnad'>Chemnad</option><option value='Kalanad'>Kalanad</option><option value='Neerchal'>Neerchal</option><option value='Munnad'>Munnad</option>";
    }
    if(tal=='Hosdurg'){
        document.getElementById('txtVill').innerHTML="<option value='Uduma'>Uduma</option><option value='Pallikkara'>Pallikkara</option><option value='Keekkan'>Keekkan</option><option value='Panayal'>Panayal</option><option value='Periya'>Periya</option><option value='Pullur'>Pullur</option><option value='Chithary'>Chithary</option><option value='Ajanur'>Ajanur</option><option value='Balla'>Balla</option><option value='Hosdurg'>Hosdurg</option><option value='Kanhangad'>Kanhangad</option><option value='Pudukai'>Pudukai</option><option value='Nileshwar'>Nileshwar</option><option value='Kayyur'>Kayyur</option><option value='Madikai'>Madikai</option><option value='Cheemeni'>Cheemeni</option><option value='Kodakkad'>Kodakkad</option><option value='Thimiri'>Thimiri</option><option value='Klayikode'>Klayikode</option><option value='Cheruvathur'>Cheruvathur</option><option value='Pilicode'>Pilicode</option><option value='Padanna'>Padanna</option><option value='Udinoor'>Udinoor</option><option value='Maniyat'>Maniyat</option><option value='North_Thrikkarippur'>North Thrikkarippur</option><option value='South_Thrikkarippur'>South Thrikkarippur</option><option value='Bara'>Bara</option><option value='Pallikkara_II'>Pallikkara II</option><option value='Ambalathara'>Ambalathara</option><option value='Perole'>Perole</option><option value='Valiyaparamba'>Valiyaparamba</option>";
    }
    if(tal=='Vellarikundu'){
        document.getElementById('txtVill').innerHTML="<option value='Balal'>Balal</option><option value='Beemanady'>Beemanady</option><option value='Belur'>Belur</option><option value='Cheemeni_II'>Cheemeni II</option><option value='Chittarikkal'>Chittarikkal</option><option value='Karinthalam'>Karinthalam</option><option value='Kinanur'>Kinanur</option><option value='Kodoth'>Kodoth</option><option value='Maloth'>Maloth</option><option value='Palavayal'>Palavayal</option><option value='Parappa'>Parappa</option><option value='Thayannur'>Thayannur</option><option value='West Eleri'>West Eleri</option><option value='Kallar'>Kallar</option><option value='Panathady'>Panathady</option>";
    }
    if(tal=='Manjeshwaram'){
        document.getElementById('txtVill').innerHTML="<option value='Kunjathur'>Kunjathur</option><option value='Hosabetu'>Hosabetu</option><option value='Udyavar'>Udyavar</option><option value='Bengramanjeshwar'>Bengramanjeshwar</option><option value='Badaje'>Badaje</option><option value='Meenja'>Meenja</option><option value='Kadambar'>Kadambar</option><option value='Kaliyoor'>Kaliyoor</option><option value='Koliyoor'>Koliyoor</option><option value='Talakala'>Talakala</option><option value='Kuloor'>Kuloor</option><option value='Majibail'>Majibail</option><option value='Moodambail'>Moodambail</option><option value='Vorkady'>Vorkady</option><option value='Pavoor'>Pavoor</option><option value='Kodlamogaru'>Kodlamogaru</option><option value='Pathur'>Pathur</option><option value='Paivalike'>Paivalike</option><option value='Chippar'>Chippar</option><option value='Bayar'>Bayar</option><option value='Kayyar'>Kayyar</option><option value='KudalMerkala'>KudalMerkala</option><option value='Enmakaje'>Enmakaje</option><option value='Sheni'>Sheni</option><option value='Padre'>Padre</option><option value='Kattukukke'>Kattukukke</option><option value='Ednad'>Ednad</option><option value='Badoor'>Badoor</option><option value='Kannur'>Kannur</option><option value='Puthige'>Puthige</option><option value='Angadimogaru'>Angadimogaru</option><option value='Mugu'>Mugu</option><option value='Koipady'>Koipady</option><option value='Ichalampady'>Ichalampady</option><option value='Mogral'>Mogral</option><option value='Bombrana'>Bombrana</option><option value='Arikkady'>Arikkady</option><option value='Kidoor'>Kidoor</option><option value='Ujar Ulvar'>Ujar Ulvar</option><option value='Uppala'>Uppala</option><option value='Kodibail'>Kodibail</option><option value='Ichalangod'>Ichalangod</option><option value='Mangalpady'>Mangalpady</option><option value='Mulinja'>Mulinja</option><option value='Bekoor'>Bekoor</option><option value='Heroor'>Heroor</option><option value='Shiriya'>Shiriya</option><option value='Kubanoor'>Kubanoor</option>";
    }
    
}