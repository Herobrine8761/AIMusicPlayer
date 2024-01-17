// Variables.
song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

var progressmusic = document.getElementById("musicprogress");
var timestamp = document.getElementById("timestemp");
var presentVal = 0;
var intervalId;

// Preloading the music
function preload(){
    song = loadSound("music.mp3");
}

// Initializing canvas, webcam, and poseNet, and setting them all up.
function setup(){
    canvas = createCanvas(600, 480);
    canvas.center();

    // Loop centering the canvas every 5 seconds.
    function centerCanvas(){
        canvas.center();
        console.log("Canvas centered." + '\n\n' + "Command executed.");
    }    
    setInterval(centerCanvas, 5000);
    // Looping code end.

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet initialised.");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X: " + leftWristX + " | Left Wrist Y: " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X: " + rightWristX + " | Right Wrist Y: " + rightWristY);
    }
}

// Adding video feed.
function draw(){
    image(video, 0, 0, 600, 470);
}

// Music controls and their functions.
function play(){
    song.play();
    console.log("Now playing: Past Lives; Creator(s): sapientdream, Slushii;");
    startincrease();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop();
    console.log("Stopped playing.")
    stopincrease();
    progressmusic.value = 0;
}
// Adding functions to automate the progress bar.
function startincrease(){
    clearInterval(intervalId);

    intervalId = setInterval(function(){
        increaseval();
        updateLabel();
    }, 1000);
}
function stopincrease(){
    clearInterval(intervalId);
    document.getElementById("timestemp").innerHTML = "0:00";
    presentVal = 0;
}
function increaseval(){
    if(progressmusic.value < progressmusic.max){
        progressmusic.value = presentVal;
        presentVal += 1;
    }
    else{
        presentVal = 155;
        clearInterval(intervalId);
    }
}
function updateLabel(){
    var minutes = Math.floor(presentVal / 60);
    var seconds = presentVal % 60;

    timestamp.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Locking the website to PC only.
function checkDevice(){
    // Get the user agent string.
    var userAgent = navigator.userAgent;

    // Check if the user agent contains keywords indicating a PC/Mac.
    var isPC = /Windows|Macintosh/.test(userAgent);

    // Redirect to notsupported.html if not a PC/Mac.
    if (!isPC) {
      window.location.href = 'notsupported.html';
    }
    else{
        if(window.innerWidth < 1035){
            window.location.href = 'lowwidth.html'
        }
    }
}

// Call the checkDevice function when the page loads
window.onload = checkDevice;