signInButton = document.getElementById("login");
signInButton.addEventListener("click", signIn);

/*
passwordReset = document.getElementById("reset-password")
passwordReset.addEventListener("click", sendPasswordReset)
function sendPasswordReset() {
	var auth = firebase.auth();
	var emailAddress = document.getElementById('reset-email').value
	auth.sendPasswordResetEmail(emailAddress).then(function() {
		// Email sent.
		alert("Thank you! A password reset link has been sent to " + emailAddress)
		document.getElementById('password-reset-modal').style.display = 'none'
	}).catch(function(error) {
		// An error happened.
		console.log("Wrong email or an error occurred")
	});
}
*/

function signIn(){
	userEmail = document.getElementById('userEmail').value
	userPassword = document.getElementById('userPassword').value

	firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then( function() {
		firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        location.href = 'https://mybookie.webflow.io/'
                    } else {
                      	alert('You do not have access to visit this page.')
                    }
		})
	}).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log("errorCode: " + errorCode +"\n"+ "errorMessage: " + errorMessage)
		alert("Sorry, your username or password is incorrect")
	});
}
