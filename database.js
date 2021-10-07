document.getElementById("bio").innerHTML = bio;
document.getElementById("title").innerHTML = profile + "-EsportsBRIDGE";
document.getElementById("img").innerHTML = "<img src='" + img_src + "' alt='profile' class='profile'>";
document.getElementById("name").innerHTML = profile;
document.getElementById("rname").innerHTML = rname;
document.getElementById("profile").innerHTML = profile;
document.getElementById("grad1").innerHTML = "SHOUTOUT | ₹" + shoutout;
document.getElementById("grad2").innerHTML = "VIDEOCALL | ₹" + videocall;
document.getElementById("grad3").innerHTML = "GET A WISH | ₹" + wish;
document.getElementById("grad4").innerHTML = "YT PROMOTION | ₹" + ytpromo;

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
firebase.initializeApp(firebaseConfig);
var reff = firebase.database().ref("refferals");
var gamermail = firebase.database().ref("gamers");
var reffree = null;

function trigger() {
    gamermail.on('value', gotData, errData);

    function gotData(data) {
        var amts = data.val();

        var keys = Object.keys(amts);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (profileId == k) {
                videocall = amts[k].videocall;
                wish = amts[k].videowish;
            }
        }
        details();
    }

    function errData(err) {
        console.log(err);
    }
}
document.getElementById('apply').onclick = function() {
    var code = document.getElementById('code').value;
    reff.on('value', gotData, errData);

    function gotData(data) {
        var reffs = data.val();
        Boolean = false;
        var keys = Object.keys(reffs);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (code == k) {
                Boolean = true;
                reffree = reffs[k].email;
            }
        }
        refcheck(Boolean);
        console.log(reffree);
    }

    function errData(err) {
        console.log(err);
    }
    console.log(code);

    function refcheck(Boolean) {
        //console.log(counter);
        if (Boolean) {
            console.log(discount);
            finalamount = discount;
            document.getElementById('code').setAttribute('readonly', true)
            document.getElementById("book").innerHTML = "Book for ₹ " + discount;
            document.getElementById('price').value = discount;
            document.getElementById('status').style.color = 'green';
            document.getElementById('status').innerHTML = "Congratulations you get 5% discount";
        } else {
            finalamount = amount;
            document.getElementById("book").innerHTML = "Book for ₹ " + finalamount;
            document.getElementById('price').value = finalamount;
            document.getElementById('status').style.color = 'red';
            document.getElementById('status').innerHTML = "Invalid Refferal Code";
        }

    }
}

function affiliate() {

    if (reffree != null) {
        Email.send({
            SecureToken: "f57dfeb0-f739-4818-be50-b2bf0992b077",
            To: reffree,
            From: "esportsbridge@gmail.com",
            Subject: "Affiliate Partner Program",
            Body: "A service was booked through your referral code and your commission amount is ₹" + 0.05 * amount + "<br /><br />Regards<br />Team Esports Bridge",
        }).then(
            message => console.log(message)
        );
    }

}

function details() {
    document.getElementById("bio").innerHTML = bio;
    document.getElementById("title").innerHTML = profile + "-EsportsBRIDGE";
    document.getElementById("img").innerHTML = "<img src='" + img_src + "' alt='profile' class='profile'>";
    document.getElementById("name").innerHTML = profile;
    document.getElementById("rname").innerHTML = rname;
    document.getElementById("profile").innerHTML = profile;
    document.getElementById("grad1").innerHTML = "SHOUTOUT | ₹" + shoutout;
    document.getElementById("grad2").innerHTML = "VIDEOCALL | ₹" + videocall;
    document.getElementById("grad3").innerHTML = "GET A WISH | ₹" + wish;
    document.getElementById("grad4").innerHTML = "YT PROMOTION | ₹" + ytpromo;
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn1 = document.getElementById("grad1");
var btn2 = document.getElementById("grad2");
var btn3 = document.getElementById("grad3");
var btn4 = document.getElementById("grad4");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn1.onclick = function() {
    amount = shoutout;
    finalamount = amount;
    discount = amount - (0.05 * amount);
    document.getElementById('constr1').style.display = "none";
    document.getElementById('constr2').style.display = "block";
    document.getElementById('constr3').style.display = "none";
    document.getElementById('constr4').style.display = "block";
    document.getElementById('constr5').style.display = "none";
    document.getElementById('instauname').value = "";
    document.getElementById("price").value = shoutout;
    document.getElementById("order").innerHTML = "Shoutout From";
    document.getElementById("serviceId").value = profileId + "D";
    document.getElementById("book").innerHTML = "Book for ₹ " + amount;
    modal.style.display = "block";
};
btn2.onclick = function() {
    amount = videocall;
    finalamount = amount;
    discount = amount - (0.05 * amount);
    document.getElementById('constr1').style.display = "none";
    document.getElementById('constr2').style.display = "block";
    document.getElementById('constr3').style.display = "none";
    document.getElementById('constr4').style.display = "none";
    document.getElementById('constr5').style.display = "none";
    document.getElementById('instauname').value = "";
    document.getElementById("price").value = videocall;
    document.getElementById("order").innerHTML = "5 to 7 minutes Videocall From";
    document.getElementById("serviceId").value = profileId + "A";
    document.getElementById("book").innerHTML = "Book for ₹ " + amount;
    modal.style.display = "block";
};
btn3.onclick = function() {
    modal.style.display = "block";
    amount = wish;
    discount = amount - (0.05 * amount);
    finalamount = amount;
    document.getElementById('constr1').style.display = "block";
    document.getElementById('constr2').style.display = "none";
    document.getElementById('constr3').style.display = "none";
    document.getElementById('constr4').style.display = "block";
    document.getElementById('constr5').style.display = "block";
    document.getElementById('whom').value = "";
    document.getElementById("order").innerHTML = "Get a Wish From";
    document.getElementById("price").value = wish;
    document.getElementById("order").innerHTML = "";
    document.getElementById("serviceId").value = profileId + "B";
    document.getElementById("book").innerHTML = "Book for ₹ " + amount;

};
btn4.onclick = function() {
    amount = ytpromo;
    finalamount = amount;
    discount = amount - (0.05 * amount);
    document.getElementById('constr1').style.display = "none";
    document.getElementById('constr2').style.display = "none";
    document.getElementById('constr3').style.display = "block";
    document.getElementById('constr4').style.display = "block";
    document.getElementById('constr5').style.display = "none";
    document.getElementById('ytchannel').value = "";
    document.getElementById("order").innerHTML = "Promote a Youtube Channel From";
    document.getElementById("serviceId").value = profileId + "C";
    document.getElementById("book").innerHTML = "Book for ₹ " + amount;
    document.getElementById("price").value = ytpromo;
    modal.style.display = "block";
};


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    document.getElementById('code').readOnly = false;
    document.getElementById('details').reset();
    document.getElementById('status').innerHTML = "";
}

//  When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('code').readOnly = false;
        document.getElementById('details').reset();
        document.getElementById('status').innerHTML = "";

    }
}
const textarea = document.getElementById('message');
const remchars = document.getElementById('txt-rem');
const maxchar = 300;
textarea.addEventListener('input', () => {
    const remaining = maxchar - textarea.value.length;
    remchars.innerHTML = remaining + " Characters remaining";
    const color = remaining < maxchar * 0.1 ? 'red' : null;
    remchars.style.color = color;
});