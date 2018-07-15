

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBLtnPlW7hn3WWySQEf1mpk6qYmTPDBY34",
  authDomain: "trainhw-a9976.firebaseapp.com",
  databaseURL: "https://trainhw-a9976.firebaseio.com",
  projectId: "trainhw-a9976",
  storageBucket: "",
  
};

firebase.initializeApp(config);
  
  var dataRef = firebase.database();
  
  // 2. Button for adding Trains
  $("#submit-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = moment($("#firstTrain-input").val().trim(), "HH:mm").format("LT");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      train: trainName,
      destination: trainDestination,
      firstTrainTime: firstTrain,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    dataRef.ref().push(newTrain);
    
  
    // Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);
  
    // Alert
    alert("New train added!");
  
    
   

    var tTime = "00:00";
    // Prettify the train start
    var firstTrainSchedule = moment.unix(tTime).format("HH:mm");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {
  

  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().firstTrainTime;
  var trainFrequency = childSnapshot.val().frequency;

  var startTimeConverted = moment(trainStart, "HH:mm")
  var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
  var timeRemainder = timeDiff % trainFrequency;
  var minToTrain = trainFrequency - timeRemainder;
  var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm");

console.log(minToTrain);
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>"  + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minToTrain + "</td></tr>");
  
  
  });
  
  
  