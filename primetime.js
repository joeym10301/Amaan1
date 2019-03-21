const config ={
    apiKey: "AIzaSyC_9dB1fg6S0Tg_YV3ca8CKiavOUzpCrh4",
    authDomain: "tutoring-website-2c061.firebaseapp.com",
    databaseURL: "https://tutoring-website-2c061.firebaseio.com",
    projectId: "tutoring-website-2c061",
    storageBucket: "tutoring-website-2c061.appspot.com",
    kmessagingSenderId: "57751270088"
};
firebase.initializeApp(config);

// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: 'loggedin.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};
console.log("UI works");
// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

////////////////////////////LOG IN Page
var path=window.location.pathname;
var page=path.split("/").pop();
console.log(page);
if(page===("loggedin.html")) {


    console.log("got to function");
    initApp = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                const displayName = user.displayName;
                const email = user.email;
                const emailVerified = user.emailVerified;
                const photoURL = user.photoURL;
                const uid = user.uid;
                const phoneNumber = user.phoneNumber;
                const providerData = user.providerData;
                user.getIdToken().then(function (accessToken) {

                    document.getElementById('sign-in-status').textContent = 'Signed in';
                    document.getElementById('sign-in').textContent = 'Sign out';
                    document.getElementById('account-details').textContent = JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  ');
                    console.log('got to sign in text');
                    // stuff that displays on webpage
                    document.getElementById('log-in').textContent = 'Congrats ' + user.displayName + ' you logged in';
                    document.body.insertAdjacentHTML = '<h1> Congrats ' + user.displayName + ' you logged in </h1>';
                    console.log('signed in');



                    ///add user to database with credentials from the log-in
                    ///make another query to update database for subject areas
                    /*
                                        //get elements
                                        let tutors=document.getElementById('tutors');
                                        let ulLists=document.getElementById('list');

                                        //create references
                                        let dbRefObject=firebase.database().ref().child('tutors');
                                        let dbRefList=dbRefObject.child('subject');
                                        //sync object changes(adapt this)
                                        dbRefObject.on('value', snap=> {
                                            tutors.innerText=JSON.stringify(snap.val(),null,3);
                                        });
                                        //sync list changes
                                        dbRefList.on('child_added', snap=>{
                                            const li=document.createElement('li');
                                            li.innerText=snap.val();
                                            li.id=snap.key;
                                            ulList.appendChild(li);
                                        })

                                        dbRefList.on('child_changed'), snap=> {
                                            const liChanged=document.getElementById(snap.key);
                                            liChanged.innerText = snap.val();
                                        }

                                        dbRefList.on('child_removed'), snap=> {
                                            const liToRemove=document.getElementById(snap.key);
                                            liToRemove.remove();
                                        }
                    */
                });

            } else {
                // User is signed out.
                document.getElementById('sign-in-status').textContent = 'Signed out';
                document.getElementById('sign-in').textContent = 'Sign in';
                document.getElementById('account-details').textContent = 'null';
            }
        }, function (error) {
            console.log(error);
            console.log("not signed in");
        });
    };

    window.addEventListener('load', function () {
        initApp()
    });
}
function signOut(){
    console.log("got to sign out function");
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("signed out");
    }).catch(function(error) {
        // An error happened.
        console.log("bad code");
    });

    window.location.assign('mainscreen.html');
}

///fonts: Segoe UI Semibold
///Bickham Script Pro Bold
function submitSurvey(){
//add info to object in database
}

/*
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    burger.addEventListener('click', ()=> {
        nav.classList.toggle('nav-active');

    navLinks.forEach((link, index)=>{
        if(link.style.animation){
        link.style.animation = '';
    }
else{
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
    }
);
    burger.classList.toggle('toggle');
});

};

navSlide();
*/