

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
    var firstTrain = moment($("#firstTrain-input").val().trim(), "DD/MM/YY").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
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
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    // Alert
    alert("New train added!");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
  });
  
  /*// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var train = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(train);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);
    var tFrequency = frequency;

    var tTime = "00:00";
    // Prettify the employee start
    var firstTrainSchedule = moment.unix(tTime).format("HH:MM");
  
    // Calculate the next arrival
    // To calculate the next train arrival
    var nextArrival = moment().diff(moment(frequency, "HH:MM"), "minutesAway");
    console.log(nextArrival);
  
    // Calculate the total minutes away
    var minutesAway = nextArrival * trainFrequency;
    console.log(minutesAway);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    firstTrainSchedule + "</td><td>" + nextArrival + "</td><td>" + trainFrequency + "</td><td>" + minutesAway + "</td></tr>");
  
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  */