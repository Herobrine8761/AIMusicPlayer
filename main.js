song = "";
var progressmusic = document.getElementById("musicprogress");
var timestamp = document.getElementById("timestemp");
var presentVal = 0;
var intervalId;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 600, 470);
}

function play(){
    song.play();
    console.log("Now playing: Past Lives; Creator(s): sapientdream, Slushii;");
    startincrease();
}
function stop(){
    song.stop();
    console.log("Stopped playing.")
    stopincrease();
    progressmusic.value = 0;
}

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

function checkDevice(){
    // Get the user agent string
    var userAgent = navigator.userAgent;

    // Check if the user agent contains keywords indicating a PC/Mac/Browser
    var isPC = /Windows|Macintosh/.test(userAgent);

    // Redirect to another page if not a PC/Mac/Browser
    if (!isPC) {
      window.location.href = 'notsupported.html';
    }
}

// Call the checkDevice function when the page loads
window.onload = checkDevice;