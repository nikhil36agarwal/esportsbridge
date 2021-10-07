 // <!-- TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries -->
 // Your web app's Firebase configuration
 var firebaseConfig = {
     apiKey: "AIzaSyC9wVbdtVEC5pD-fxM3J3XPn2UaM8wP4VM",
     authDomain: "esportsbridge-5610c.firebaseapp.com",
     databaseURL: "https://esportsbridge-5610c.firebaseio.com",
     projectId: "esportsbridge-5610c",
     storageBucket: "esportsbridge-5610c.appspot.com",
     messagingSenderId: "863230282604",
     appId: "1:863230282604:web:7ef370732eb6dfbe144149",
     measurementId: "G-RDHC7E1STQ"
 };
 // Initialize Firebase

 var database = firebase.database().ref("Billings");


 var type;
 var g_mail = null;
 var g_name = null;

 function validate() {
     var name = document.forms["detailsform"]["P_name"];
     var email = document.forms["detailsform"]["P_email"];
     var whom = document.forms["detailsform"]["whom"];
     var instauname = document.forms["detailsform"]["instauname"];
     var ytchannel = document.forms["detailsform"]["ytchannel"];
     var date = document.forms["detailsform"]["date"];
     var accept = document.forms["detailsform"]["accept"];


     if (name.value == "") {
         name.placeholder = "Please Enter a valid Name";
         name.focus();
         return false;
     } else if (email.value == "") {
         email.placeholder = "Please enter a valid e-mail address.";
         email.focus();

         return false;
     } else if (whom.value == "") {
         whom.placeholder = "Please enter For Whom.";
         whom.focus();
         return false;
     } else if (instauname.value == "") {
         instauname.placeholder = "Please enter Instagram Username";
         instauname.focus();
         return false;
     } else if (ytchannel.value == "") {
         ytchannel.placeholder = "Please enter Youtube Channel";
         ytchannel.focus();
         return false;
     } else if (accept.checked == false) {
         window.alert("Please Accept To Proceed");
         accept.focus();
     } else {
         name = document.getElementById('pname').value;
         email = document.getElementById('email').value;
         //var phone = document.getElementById('phno').value;
         instauname = document.getElementById('instauname').value;
         whom = document.getElementById('whom').value;
         ytchannel = document.getElementById('ytchannel').value;
         date = document.getElementById('date').value;
         var code = document.getElementById('code').value;
         var message = document.getElementById("message").value;
         var serviceid = document.getElementById("serviceId").value;
         console.log(name);
         displayRazorpay();
     }

     return true;


     async function displayRazorpay() {

         const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

         if (!res) {
             alert('razorpay failed to load')
             return
         }
         //secrete# dXtBkbY4vh1SON10zZfcXuER//webhooksecrete-esportsbridge5326//https://www.esportsbridge.com/verification
         const options = {
             key: "rzp_live_UV4Rg4jydAzNgp", // Enter the Key ID generated from the Dashboard
             amount: finalamount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
             currency: "INR",
             name: "Esports Bridge",
             description: "Test Transaction",
             image: "../images/icon.png",
             //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
             handler: function(response) {

                 verifysignature(response);


             },
             prefill: {
                 "name": name,
                 "email": email,
             },
             // "notes": {
             //     "address": "Razorpay Corporate Office"
             // },
             theme: {
                 "color": "#000000"
             }

         };
         const paymentObject = new window.Razorpay(options);
         paymentObject.open();

     }

     function verifysignature(response) {

         console.log(response);
         console.log(response.razorpay_payment_id);
         console.log(response.razorpay_order_id);
         console.log(response.razorpay_signature);
         var payment_id = response.razorpay_payment_id;
         var modal = document.getElementById("success");
         var cls = document.getElementById("close");
         document.getElementById("paytoken").value = payment_id;
         cls.onclick = function() {
             location.reload(true);
         }
         modal.style.display = "block";
         savetodb(payment_id);

     }

     function savetodb(payment_id) {
         const billings = {
             "service": {
                 "message": message,
                 "whom": whom,
                 "youtube": ytchannel,
                 "instagram_accn": instauname,
                 "date": date,
                 "paid(₹)": finalamount,
                 "serviceid": serviceid,
                 "refferal": code,
             },
             "details": {
                 "email": email,
                 "name": name,
                 "contact": phone,
             }

         };
         console.log(billings);
         var newcustomer = database.child(payment_id);
         newcustomer.set(billings);
         mailer();


     }

     function loadScript(src) {
         return new Promise(resolve => {
             const script = document.createElement('script')
             script.src = src
             script.onload = () => {
                 resolve(true)
             }
             script.onerror = () => {
                 resolve(false)
             }
             document.body.appendChild(script)
         })
     }

     async function mailer() {
         const mailscript = await loadScript("https://smtpjs.com/v3/smtp.js");

         if (!mailscript) {
             alert('mailer failed to load');
             Boolean = false;
         } else {
             type = gamer();
             affiliate();
         }

         function gamer() {
             var type;
             if (serviceid == profileId + "A") {
                 type = "videocall";
             } else if (serviceid == profileId + "B") {
                 type = "videowish";
             }
             console.log(type);
             gamermail.on('value', gotData, errData);

             function gotData(data) {
                 var gamermails = data.val();
                 var keys = Object.keys(gamermails);
                 for (var i = 0; i < keys.length; i++) {
                     var k = keys[i];
                     if (profileId == k) {
                         g_mail = gamermails[k].email;
                         g_name = gamermails[k].g_name;
                     }
                 }
                 console.log(g_name);
                 console.log(g_mail);
                 mailgamer(g_mail, g_name, type);
                 customer(type, g_name);
             }

             function errData(err) {
                 console.log(err);
             }
             return type, g_name;
         }

         function mailgamer(g_mail, g_name, type) {
             if (type == "videocall") {
                 Email.send({
                     SecureToken: "f57dfeb0-f739-4818-be50-b2bf0992b077",
                     To: g_mail,
                     From: "esportsbridge@gmail.com",
                     Subject: "Service Request Status",
                     Body: "Hi, " + g_name + ", a Service request has been made for you, the service details are:" +
                         "<br /><br />Service type: " + type +
                         "<br />Name: " + name +
                         "<br /><br /> Would you like to accept this request?<br/>Kindly respond to the mail at the earliest.If yes,then you need to specify the date and time of the call, the call link will be sent to you 2-6 hours prior to call time( google meet or zoom call will be used)<br /><br />Thank You<br/>Regards<br />Team Esports Bridge",
                 }).then(
                     message => console.log(message)
                 );
             } else {

                 Email.send({
                     SecureToken: "f57dfeb0-f739-4818-be50-b2bf0992b077",
                     To: g_mail,
                     From: "esportsbridge@gmail.com",
                     Subject: "Service Request Status",
                     Body: "Hi, " + g_name + ", a Service request has been made for you, the service details are:" +
                         "<br /><br />Service type: " + type +
                         "<br /> Name: " + name +
                         "<br /> For: " + whom +
                         "<br /> Message: " + message +
                         "<br />Due Date: " + date +
                         "<br /><br /> Would you like to accept this request?<br />Kindly Respond to the mail at the earliest.<br /><br />Thank You<br />Regards<br />Team Esports Bridge",
                 }).then(
                     message => console.log(message)
                 );
             }
         }

         function customer(type, g_name) {
             Email.send({
                 SecureToken: "f57dfeb0-f739-4818-be50-b2bf0992b077",
                 To: email,
                 From: "contact@esportsbridge.com",
                 Subject: "Thankyou for the Purchase",
                 Body: "Hi, " + name + ", your service request was successfully forwarded to " + g_name + " for " + type + "<br />You will be further notified about the status of the service in 2-3 days.<br />*If the service type is videocall you will be notified about the date and time of the call.<br /><br />Regards<br />Team Esports Bridge",
             }).then(
                 message => console.log(message)
             );
         }

     }

 }