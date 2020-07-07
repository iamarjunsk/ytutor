$(document).ready(function(){
    $('#schOp').hide();
    $('#scieOp').hide();
    $('#ugbrach').hide();
    $('#pgbrach').hide();
    $('#coachbrach').hide();
    $('#syllabus').hide();
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
$('#to12').change(function(){
    if($('#to12').is(":checked")){
        $('#syllabus').show();
    }
    else{
        $('#syllabus').hide();
    }
});
$('#ug').change(function(){
    if($('#ug').is(":checked")){
        $('#ugbrach').show();
    }
    else{
        $('#ugbrach').hide();
    }
});
$('#pg').change(function(){
    if($('#pg').is(":checked")){
        $('#pgbrach').show();
    }
    else{
        $('#pgbrach').hide();
    }
});
$('#coaching').change(function(){
    if($('#coaching').is(":checked")){
        $('#coachbrach').show();
    }
    else{
        $('#coachbrach').hide();
    }
});

var dp = function(file,ig) {
    var input = file.target;

    
    var reader = new FileReader();
 
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
          output.value=newDataUrl;
          console.log(newDataUrl);
      
         
      } 
    };
    reader.readAsDataURL(input.files[0]);
  
}


$('#btnReg').click(function(){
    var prof = $('#output4').attr('src');

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

    var name=$('#txtNameR').val();
    var email=$('#txtEmR').val();
    var pass=$('#txtPassR').val();
    var rpass=$('#txtCPassR').val();
    var dob=$('#dateR').val();
    var parent=$('#txtParR').val();
    var institute=$('#txtSchR').val();
    var clas=$('#clss').val();
    var ph=$('#phnR').val();
    var tut=$('#txtTut').val();
    var dis=$('#txtDistrict').val(); 
    var tal=$('#txtTaluk').val(); 
    var vil=$('#txtVill').val(); 

  
});

