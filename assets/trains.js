
$(document).ready(function () {



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBSPyZXZHH64wZLsSgNNt7HwSOq3HGKFKw",
        authDomain: "homework7-26fbb.firebaseapp.com",
        databaseURL: "https://homework7-26fbb.firebaseio.com",
        projectId: "homework7-26fbb",
        storageBucket: "homework7-26fbb.appspot.com",
        messagingSenderId: "520656377702"
    };
    firebase.initializeApp(config);
    // error caught, have to hit publish after setting values to TRUE. 

    //setting up database var for firebase, and the var for trains, an array
    var database = firebase.database();
    var trains = [];

    //the submit button, calling id addtrain from input, onclick function take each field
    $("#addTrain").on("click", function (event) {
        event.preventDefault();
        var train = {};
        train.name = $("#trainName").val().trim();
        train.destination = $("#destination").val().trim();
        train.firstTrainTime = $("#firstTrainTime").val().trim();
        train.frequency = $("#frequency").val().trim();

        console.log(train)
        // push each ref from above and push to firebase database. 
        database.ref().push({
            name: train.name,
            destination: train.destination,
            firstTrainTime: train.firstTrainTime,
            frequency: train.frequency,
        });

        // Need to set up event handlers to catch train  
    });

    function updatetrainlist(train) {
        var tbody = $("#trainScheduleElem");

        var tr = $("<tr>");
        tbody.append(tr);
        var td = $("<td>");
        td.text(train.name);
        tr.append(td);
        var td = $("<td>");
        td.text(train.destination);
        tr.append(td);
        var td = $("<td>");
        td.text(train.frequency);
        tr.append(td);
        var td = $("<td>");
        td.text(train.nextArrival);
        tr.append(td);
        var td = $("<td>");
        td.text(train.minutesAway);
        tr.append(td);
    };

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        var train = {};
        train.name = childSnapshot.val().name;
        train.destination = childSnapshot.val().destination;
        train.firstTrainTime= childSnapshot.val().firstTrainTime;
        train.frequency= parseInt(childSnapshot.val().frequency);

        console.log(typeof train.frequency)
        // calculate Next Arrival + Minutes away , switched from "m mm" to "kk", Switched back
        var firstFormat = "m mm";
        var calcMinutesAway = moment(train.frequency, firstFormat);

            // cant figure out to/fromNow, how to get LT to sync up an
            //make it so next arrival is correct, switched 
        train.nextArrival= moment().to(calcMinutesAway, "LT");
            if (train.nextArrival <=0){
                train.nextArrival = 0;
            }
        console.log("next arrival " + train.nextArrival);

        // keeps giving times in the 900's. 
        train.minutesAway = moment().diff(calcMinutesAway, "minutes")
        console.log("minutes away " + train.minutesAway);

        updatetrainlist(train)
    });

});