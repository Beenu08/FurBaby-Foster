document.getElementById('togglePassword').addEventListener('click', function(e) {
    // Toggle the type attribute
    
    const passwordInput = document.getElementById('floatingPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle the eye / eye-slash icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
document.getElementById('togglePasswordLogin').addEventListener('click', function(e) {
    // Toggle the type attribute
    const passwordInput = document.getElementById('loginPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle the eye / eye-slash icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
$(document).ready(function(){
//  let auser =   localStorage.getItem("activeuser");
//  alert(auser);

// $("#signupbtn").click(function(){
//     $(".Modal-boot-SignUp").show(1000);
//     $(".Modal-boot-Login").hide();
// });
// $("#loginbtn").click(function(){
//     $(".Modal-boot-Login").show(1000);
//     $(".Modal-boot-SignUp").hide();

// });
// $("#login").click(function(){
//     $(".Modal-boot-SignUp").hide();
//     $(".Modal-boot-Login").show(1000);
//     $("#floatingInput").val("");
//     $("#floatingPassword").val("");
//     $("#userType").val("");
//     $("#emailtxt").html("");
//     $("#pswdErr").html("");

// });
// $("#signup").click(function(){
//     $(".Modal-boot-SignUp").show(1000);

//     $(".Modal-boot-Login").hide();
//     $(".Modal-boot-login").hide(1000);
//     $("#loginInput").val("");
//     $("#loginPassword").val("");
//     $("#LoginCredentials").html("");

// });
// $("#btn-cross").click(function(){
//     $(".Modal-boot-SignUp").hide(1000);
//     $("#floatingInput").val("");
//     $("#floatingPassword").val("");
//     $("#userType").val("");
//     $("#emailtxt").html("");
//     $("#pswdErr").html("");
    
// });
// $("#btn-cross-login").click(function(){
//     $(".Modal-boot-Login").hide(1000);
//     $("#loginInput").val("");
//     $("#loginPassword").val("");
//     $("#LoginCredentials").html("");
    
// });
// $("#btn-cross-settings").click(function(){
//     $(".Modal-boot-Settings").hide(1000);
//     $("#settingsInputEmail").val("");
//     $("#settingsOldPassword").val("");
//     $("#settingsNewPassword").val("");
//     // $("#LoginCredentials").html("");
    
// });
// $("#citizenSettings").click(function(){
//     $(".Modal-boot-Settings").show(1000);
// })

// ///************************Forget Password***************** **/
// $("#forget").click(function(){
//     let obj={
//     type:"get",
//     url:"/forgetPassword",
//     data:{
//         mailId:$("#loginInput").val()
//     }
// }
//     $.ajax(obj).done(function(resp){
//         alert("Check Your Email");
//     }).fail(function(err){
//         alert(err.message);
//     })
// }

// );

// $("#floatingInput").blur(function(){
//     let obj= {
//         type:"get",
//         url:"/ajax-check-mail",
//         data:{
//             myEmail:$("#floatingInput").val(), //will be stored in query object
//         }
//     }
//     $.ajax(obj).done(function(resp){
//         // alert(resp);
//         if(resp=="Available"){
//             $("#emailtxt").html("");
//         // $("#emailtxt").css("color","green");
//         }else{
//             $("#emailtxt").html("<i>"+resp+"</i>");
//             $("#emailtxt").css("color","red");
//         }
//     })
//     .fail(function(err){
//         alert(err);
//     });
// });
// $("#signupnow").click(function(){
//     let obj2={
//         type:"get",
//         url:"/submit-details-ajax",
//         data:{
//             myEmail:$("#floatingInput").val(),
//             myPassword:$("#floatingPassword").val(),
//             myUserType:$("#usertype").val()
//         }
//     }
//     $.ajax(obj2).done(function(resp){
//         alert("Registered successfully");
//     }).fail(function(err){
//         alert(err.message);
//     })
// });
// $("#loginnow").click(function(){
//     myEmail:$("#loginInput").val();
//     let obj3={
//         type:"get",
//         url:"/login-details-ajax",
//         data:{
//             myEmail:$("#loginInput").val(),
//             myPassword:$("#loginPassword").val()
//         }
//     };
// $.ajax(obj3).done(function(resp){
//    if(resp!="Invalid Email/ Password"){
//     $("#LoginCredentials").html("User Type is: "+ resp);
//     $("#LoginCredentials").css("color", "");
//     // localStorage.setItem("activeuser",myEmail);
//    // setTimeout(function(){
//     if(resp=="Care Taker")
//     window.location.href="dash-care.html";
//     else
//         window.location.href="dash-citizen.html";
//    // },2000);
//     alert("Login Successfully");
//    }
//    else{
//     $("#LoginCredentials").html("Invalid Email/ Password");
//     $("#LoginCredentials").css("color","red");
//    }
// })
// .fail(function(err){
//     // $(".Modal-boot-SignUp").show(1000);
//     // alert(err.message);
//     $("#LoginCredentials").html("Fill your Login Credentials");
//     $("#LoginCredentials").css("color", "red");
// });
// });




// $("#searchMail").click(function(){
//     let obj2= {
//         type:"get",
//         url:"/ajax-check-searchMail",
//         data:{
//             mysearchMail:$("#inputEmailCitizen").val(), //will be stored in query object 
//         }
//     }
//     $.ajax(obj2).done(function(resp){
//         if(resp.length==0){
//             alert("Email not Registered");
//             $("#Update").prop("disabled",true);
//             $("#Save").prop("disabled",false);
//         }
//         else{
//         // $("#inputEmailCitizen").val(resp.emailId);
//         $("#citizenName").val(resp[0].Fname);
//        $("#inputAddress").val(resp[0].address);
//        $("#inputCity").val(resp[0].city);
//        $("#inputState").val(resp[0].state);
//        $("#inputMobile").val(resp[0].mobile);
//        $("#prev").attr("src","uploads/"+resp[0].picPath);
//        $("#hdn").val(resp[0].picPath);
//        $("#Update").prop("disabled",false);
//        $("#Save").prop("disabled",true);
//         }
//     })
//     .fail(function(err){
//         alert(err.message);
//     });
// });
// $("#updateNow").click(function(){
//     let obj={
//         type:"get",
//         url:"/updatePassword",
//         data:{
//             mymail:$("#settingsInputEmail").val(),
//             myOldPswd:$("#settingsOldPassword").val(),
//             myNewPswd:$("#settingsNewPassword").val()
//         }
//     }
//     $.ajax(obj).done(function(resp){
//         // alert("HEllo");
//         alert("Password Updated Successfully");
//         // console.log(resp);
//     })
//     .fail(function(err){
//         alert(err.message);
//         // console.log(err.message);
//     })
// });
$("#searchMailCareTaker").click(function(){
    alert("Hello");
    let obj2= {
        type:"get",
        url:"/ajax-check-searchMailCT",
        data:{
            Mail:$("#inputEmailCareTaker").val(), //will be stored in query object 
        }
    }
    // alert(Mail);
    $.ajax(obj2).done(function(resp){
        if(resp.length==0){
            alert("Email not Registered");
            $("#UpdateCT").prop("disabled",true);
            $("#SaveCT").prop("disabled",false);
        }
        else{
        $("#inputEmailCitizen").val(resp.emailId);
        alert(resp[0].pets);
       $("#careTakerName").val(resp[0].fName);
       $("#careTakerContact").val(resp[0].contact);
       $("#careTakerAddress").val(resp[0].address);
       $("#careTakerCity").val(resp[0].city);
       $("#firm").val(resp[0].firm);
       $("#since").val(resp[0].since);
       $("#prefferedPetTxt").html(resp[0].pets);
       $("#prevCT").attr("src","uploads/"+resp[0].profilePic);
       $("#hdnCT").val(resp[0].profilePic);
       $("#UpdateCT").prop("disabled",false);
       $("#SaveCT").prop("disabled",true);
        }
    })
    .fail(function(err){
        alert(err.message);
    });
});
});
