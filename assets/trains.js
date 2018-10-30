
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

  var database = firebase.database();
  var trains = [];

  $("#addTrain").on("click", function () {
      event.preventDefault();
      var train = {};
      train.name = $("#trainName").val().trim();
      train.destination = $("#destination").val().trim();
      train.firstTrainTime = $("#firstTrainTime").val().trim();
      train.frequency = $("#frequency").val().trim();

      database.ref().push({
          name: train.name,
          destination: train.destination,
          firstTrainTime: train.firstTrainTime,
          frequency: train.frequency,
      });

  });

  