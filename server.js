var express = require("express");
var app = express();
var fileuploader = require("express-fileupload");
app.use(fileuploader());
var mysql2 = require("mysql2");
// var app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = process.env.PORT || 4005;

app.listen(port, function () {
  console.log("Server Started at 4005");
});

let configObj = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: process.env.DB_DATESTRINGS === 'true'
};
const mysql = mysql2.createConnection(configObj);
mysql.connect(function (err) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected Successfully");
  }
});
app.get("/", function (req, resp) {
  let curDir = __dirname;
  let path = curDir + "/public/index.html";
  resp.sendFile(path);
});
app.get("/submit-details-ajax", function (req, resp) {
  if (req.query.myEmail && req.query.myPassword && req.query.myUserType) {
    mysql.query(
      "Insert into petCareTable values(?,?,?,1)",
      [req.query.myEmail, req.query.myPassword, req.query.myUserType],
      function (err) {
        if (err == null) {
          var nodemailer = require("nodemailer");

          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "beenujindal08@gmail.com",
              pass: "qyhaotjskayqnlzm",
            },
          });

          var mailOptions = {
            from: "beenujindal08@gmail.com",
            to: req.query.myEmail,
            subject: "Welcome to FurBaby Foster! 🐾",
            html: `
            
            Welcome to FurBaby Foster, your go-to platform for fostering adorable furry friends! We're thrilled to have you on board, joining our community of passionate animal lovers.
            <br><br>
            Below are your login credentials to access your FurBaby Foster account:
            <br><br>
            Username: ${req.query.myEmail} <br><br>
            Password:${req.query.myPassword} <br><br>
            UserType: ${req.query.myUserType} <br><br>
            <br><br>
            Please keep these credentials safe and secure. If you ever forget your password, you can reset it using the "Forgot Password" option on the login page.

            We hope you have an incredible experience with us, connecting with pets in need and making a positive impact on their lives. Thank you for choosing FurBaby Foster!

            If you have any questions or need assistance, feel free to reach out to our support team at support@furbabyfoster.com.
            <br><br>
            Best Regards,
            <br><br>
            The FurBaby Foster Team`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          resp.send("Registered Successfully!");
        } else {
          resp.send(err.message);

        }
      }
    );
  } else {
    resp.send("All details are mandatory!");
  }
});
//*************************Nodemailer***************** */

app.get("/ajax-check-mail", function (req, resp) {
  mysql.query(
    "select * from petCareTable where email=?",
    [req.query.myEmail],
    function (err, recordsJSONArray) {
      if (err == null) {
        if (recordsJSONArray.length > 0) {
          resp.send("Already Taken");
        } else {
          resp.send("Available");
        }
      } else {
        resp.send(err);
      }
    }
  );
});

app.get("/login-details-ajax", function (req, resp) {
  if (req.query.myEmail && req.query.myPassword) {
    mysql.query(
      "select userType from petCareTable  where email=? AND password=? ",
      [req.query.myEmail, req.query.myPassword],
      function (err, res) {
        if (!err) {
          if (res.length > 0) {
            resp.send(res[0].userType);
          } else {
            resp.send("Invalid Email/ Password");
          }
        }
      }
    );
  } else {
    resp.send(err);
  }
});

app.post("/citizen-profile-details", function (req, resp) {
  let picName = "nopic.jpg";
  if (req.files != null) {
    picName = req.files.pic.name;
    let filePath = __dirname + "/public/uploads/" + picName;
    req.files.pic.mv(filePath);
  }
  req.body.picName = picName;
  mysql.query(
    "INSERT INTO cProfile VALUES(?,?,?,?,?,?,?)",
    [
      req.body.inputEmailCitizen,
      req.body.citizenName,
      req.body.inputAddress,
      req.body.inputCity,
      req.body.inputState,
      req.body.inputMobile,
      req.body.picName,
    ],
    function (err) {
      if (err) {
        resp.send(err.message);
      } else {
        resp.send("Record Saved");
      }
    }
  );
});

app.get("/ajax-check-searchMail", function (req, resp) {
  mysql.query(
    "SELECT * FROM cProfile WHERE emailId = ?",
    [req.query.mysearchMail],
    function (err, results) {
      if (!err) {
        resp.send(results);
      } else {
        resp.send(err.message);
      }
    }
  );
});
app.post("/cProfile-update", function (req, resp) {
  // let picName="nopic.jpg";
  if (req.files != null) {
    picName = req.files.pic.name;
    let path = __dirname + "/public/uploads/" + picName;
    req.files.ppic.mv(path);
  } else {
    picName = req.body.hdn;
  }
  req.body.picName = picName;
  mysql.query(
    "update cProfile set Fname=?, address=?,state=?, city=?, mobile=?, picPath=? where emailid=?",
    [
      req.body.citizenName,
      req.body.inputAddress,
      req.body.inputState,
      req.body.inputCity,
      req.body.inputMobile,
      req.body.picName,
      req.body.inputEmailCitizen,
    ],
    function (err) {
      if (err == null) resp.send("Record Updated");
      else resp.send(err.message);
    }
  );
});

app.post("/post-requirement-details", function (req, resp) {
  mysql.query(
    "INSERT INTO postReq (email,pet,date_from,date_to,other) VALUES(?,?,?,?,?)",
    [
      req.body.postReqEmail,
      req.body.petType,
      req.body.dateFrom,
      req.body.dateTo,
      req.body.otherTxt,
    ],
    function (err) {
      if (err) {
        resp.send(err.message);
      } else {
        resp.send("Requirements Saved");
      }
    }
  );
});

app.get("/updatePassword", function (req, resp) { 
  mysql.query("update petCareTable set password=? where email=? and password=? ",[req.query.myNewPswd, req.query.mymail,req.query.myOldPswd],
    function (err) {
      if (err == null) {
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "beenujindal08@gmail.com",
            pass: "qyhaotjskayqnlzm",
          },
        });
        var mailOptions = {
          from: "beenujindal08@gmail.com",
          to: req.query.mymail,
          subject: "Password Updated Successfully",
          html: `Dear ${req.query.mymail} <br>
         <br>
          We are writing to confirm that your password has been successfully updated as  New Password: ${req.query.myNewPswd}. Your account security is of utmost importance to us, and we appreciate your diligence in maintaining it.
          <br><br>

          If you did not initiate this password change or suspect any unauthorized activity on your account, please contact our support team immediately at [furbabyfoster08@gmail.com]. We are here to assist you and ensure the security of your account.
          <br><br>
          Thank you for choosing FurBaby Foster. If you have any further questions or concerns, feel free to reach out to us.

          Best regards,<br><br>
            FurBaby Foster
          `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        resp.send("Password Updated");
      }else{
        resp.send(err.message);
      }
      
    });
});
app.get("/updatePasswordCare", function (req, resp) { 
  mysql.query("update petCareTable set password=? where email=? and password=? ",[req.query.myNewPswd, req.query.mymail,req.query.myOldPswd],
    function (err) {
      if (err == null) {
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "beenujindal08@gmail.com",
            pass: "qyhaotjskayqnlzm",
          },
        });
        var mailOptions = {
          from: "beenujindal08@gmail.com",
          to: req.query.mymail,
          subject: "Password Updated Successfully",
          html: `Dear ${req.query.mymail} <br>
          <br>
           We are writing to confirm that your password has been successfully updated as  New Password: ${req.query.myNewPswd}. Your account security is of utmost importance to us, and we appreciate your diligence in maintaining it.
           <br><br>
 
           If you did not initiate this password change or suspect any unauthorized activity on your account, please contact our support team immediately at [furbabyfoster08@gmail.com]. We are here to assist you and ensure the security of your account.
           <br><br>
           Thank you for choosing FurBaby Foster. If you have any further questions or concerns, feel free to reach out to us.
 
           Best regards,<br><br>
             FurBaby Foster
           `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        resp.send("Password Updated");
      }else{
        resp.send(err.message);
      }
      
    });
});
app.get("/forgetPassword",function(req,resp){
    mysql.query("select password from petCareTable where email=?",[req.query.mailId],function(err,pass){
      if(err==null){
        if(pass.length>0){
          const userPswd=pass[0].password;

          var nodemailer = require("nodemailer");
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "beenujindal08@gmail.com",
              pass: "qyhaotjskayqnlzm",
            },
          });

          var mailOptions = {
            from: "beenujindal08@gmail.com",
            to: req.query.mailId,
            subject: "Retrieval of Login Credentials",
            html: `
            We hope this email finds you well. It appears that you've forgotten your login credentials, but worry not – we're here to assist you in regaining access to your account.
              <br><br>
            Below are your login details:
            <br>
            Username/Email: ${req.query.mailId} <br>
            Password: ${userPswd}
            <br><br>
            Please use this information to log in to your account. Once logged in, we recommend updating your password for security purposes. If you have any trouble logging in or suspect any unauthorized activity on your account, please don't hesitate to reach out to our support team at [support email/phone number]. We're here to help.
              <br>
            Thank you for choosing FurBaby Foster. If you have any further questions or concerns, feel free to contact us anytime.
            <br><br>
            Best regards,
            <br>
            FurBaby Foster
            `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          resp.send("Email sent");
        }else{
          resp.send("Inavlid Login")
        }
      }else{
        resp.send(err);
      }
    })
})

app.get("/fetch-records-angular",function(req,resp){
  mysql.query("select* from petCareTable",function(err,respo){
      resp.send(respo);
    
  });
});

app.get("/status-block",function(req,resp){
  mysql.query("Update petCareTable set status=0 where email=?",[req.query.emailKuch],function(res){
    resp.send("Blocked");
  })
})

app.get("/status-resume",function(req,resp){
  mysql.query("Update petCareTable set status=1 where email=?",[req.query.emailKuch],function(res){
    resp.send("Resumed");
  })
})

app.get("/record-Delete",function(req,resp){
  
  mysql.query("delete from petCareTable where email=?",[req.query.emailKuch],function(res){
    resp.send("Deleted");
  })
})

app.post("/careTaker-profile-details", function (req, resp) {
  let picName = "nopic.jpg";
  if (req.files != null) {
    picName = req.files.profilePic.name;
    let filePath = __dirname + "/public/uploads/" + picName;
    req.files.profilePic.mv(filePath);
  }
  req.body.profilePic = picName;
  let preferredPets = req.body.prefferedPet;
  if (!Array.isArray(preferredPets)) {
    preferredPets = [preferredPets];
  }
  
  let preferredPetsString = preferredPets.join(',');
  mysql.query(
    "INSERT INTO careTakerProfile VALUES(?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.inputEmailCareTaker,
      req.body.careTakerName,
      req.body.careTakerContact,
      req.body.careTakerAddress,
      req.body.careTakerCity,
      req.body.firm,
      req.body.since,
      preferredPetsString,
      req.body.profilePic,
      req.body.basePrice,
    ],
    function (err) {
      if (err) {
        resp.send(err.message);
      } else {
        resp.send("Record Saved");
      }
    }
  );
});
app.get("/ajax-check-searchMailCT", function (req, resp) {
  mysql.query(
    "SELECT * FROM careTakerProfile WHERE Email = ?",[req.query.Mail],
    function (err, results) 
    {
      if (!err) {
        resp.send(results);
      } else {
        resp.send(err);
      }
    }
  );
});
app.post("/careTakerProfile-update", function (req, resp) {
  let picName="nopic.jpg";
  if (req.files != null) {
    picName = req.files.profilePic.name;
    let path = __dirname + "/public/uploads/" + picName;
    req.files.profilePic.mv(path);
  } else {
    picName = req.body.hdnCT;
  }
  req.body.profilePic = picName;
  let Pets = req.body.prefferedPet;
  if(Pets==null){
    Pets=req.body.prefferedPetTxt;
  }else{
  if (!Array.isArray(Pets)) {
     Pets = [Pets];
  }
    Pets = Pets.join(',');
}
  

  mysql.query(
    "update careTakerProfile set fName=?, contact=?, address=?, city=?,firm=?, since=?, pets=?,profilePic=?, basePrice=? where Email=?",
    [
      req.body.careTakerName,
      req.body.careTakerContact,
      req.body.careTakerAddress,
      req.body.careTakerCity,
      req.body.firm,
      req.body.since,
      Pets,
      req.body.profilePic,
      req.body.basePrice,
      req.body.inputEmailCareTaker,
    ],
    function (err) {
      if (err == null) resp.send("Record Updated");
      else resp.send(err.message);
    }
  );
});
app.get("/fetch-cities-angular",function(req,resp){
  mysql.query("select distinct city from careTakerProfile",function(err,respo){
    if(err==null){
      // console.log(respo);
      resp.send(respo);
    }else{
      resp.send(err.message);
    }
  });
});
app.get("/fetch-pets-angular",function(req,resp){
  mysql.query("select pets from careTakerProfile",function(err,respo){  
      resp.send(respo);
    });
});
app.get("/fetchCareTaker",function(req,resp){
  // console.log(selectedCity);
  let city=req.query.City;
  let pet=req.query.pet;
    // console.log(city);

  mysql.query("select * from careTakerProfile where city=? and pets like ?",[city,"%"+pet+"%"],function(err,respo){
    if(err==null){
    // console.log(resp);

  resp.send(respo);
    }else
resp.send(err.message);
  })
})

app.get("/sendEmailtoCareTaker",function(req,resp){
  // let auser =localStorage.getItem("activeuser");
  const message = req.query.message;

   let mail=req.query.citizenMail;
   console.log(mail);
   let careEmail=req.query.careMail;
   console.log(careEmail);
  
   var nodemailer = require("nodemailer");
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "beenujindal08@gmail.com",
              pass: "qyhaotjskayqnlzm",
            },
          });
          var mailOptions = {
            from: "beenujindal08@gmail.com",
            to: careEmail,
            subject: "Temporary Pet Care Inquiry During Your Busy Schedule",
            html: `
            I hope this email finds you well amidst your busy schedule. I understand that you have a lot on your plate at the moment, which is why I am reaching out regarding a matter of temporary pet care.
            <br>
            Given your past experience in caring for Pet, I am hoping to discuss the possibility of entrusting him to your care during my absence.
            <br>
            If you find that you have the availability and capacity to assist during this time, please let me know. Your help would be invaluable, and I deeply appreciate your consideration.
            <br>
            Thank you for your time and understanding.
            <br>
            My message:${message}<br>
            My Email Id: ${mail}`
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          resp.send("OK");
        
});


app.get("/fetch-requests-angular",function(req,resp){
  mysql.query("select* from postReq",function(err,respo){

      resp.send(respo);
    
  });
});

app.get("/connectEmail",function(req,resp){
  
let mail=req.query.email;
const message = req.query.message;



var nodemailer = require("nodemailer");
       var transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
           user: "beenujindal08@gmail.com",
           pass: "qyhaotjskayqnlzm",
         },
       });
       var mailOptions = {
         from: "beenujindal08@gmail.com",
         to: mail,
         subject: "Registered Successfully",
         html: message

       };

       transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
           console.log(error);
         } else {
           console.log("Email sent: " + info.response);
            // resp.send("Mail Sent");
         }
       });

       resp.send("Mail Sent");
       
});

app.post("/submit-review",function(req,resp){
  let to=req.body.to;
  // console.log(to);
  mysql.query("insert into rate values(?,?,?,?,?)", [req.body.name,req.body.email,req.body.rating,req.body.review,to],
  function(err){
if(err){
  resp.send(err.message);
}
else{
  resp.send("Feedback Saved");
}
}
);
});

app.get("/fetchReviews",function(req,resp){
  // console.log("hi"+req.query.email);
  let careTaker=req.query.email;
  mysql.query("select * from rate where careTaker=?",[careTaker],function(err,respo){
    if(err==null){
      // console.log(respo);
      resp.send(respo);
    }
    else{
      resp.send(err.message);
    }
  })
});

app.get("/fetchReviewsAvg",function(req,resp){
  console.log("hi"+req.query.email);
  let careTaker=req.query.email;
  mysql.query("select avg(star) from rate where careTaker=?",[careTaker],function(err,respo){
    if(err==null){
      console.log(respo);
      resp.send(respo);
    }
    else{
      resp.send(err.message);
    }
  })
});