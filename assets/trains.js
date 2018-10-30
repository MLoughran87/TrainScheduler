
    $(document).ready(function(){
        
   

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
  // Uncaught error - firebase not definted? see error in console. 

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

  });

});