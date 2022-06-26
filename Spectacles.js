var model_status = "";
var img = "";
var obj = [];
var object_detector = "";

function preload() {
    img = loadImage("Spectacles.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        obj = results
    }
}

function modelLoaded() {
    console.log("Model Loaded");
    model_status = true;
    document.getElementById("status").innerHTML = "Object Detection Status : " + model_status;
    object_detector.detect(img, gotResults);
}

function draw() {
    image(img, 0, 0, 640, 420);
    if(model_status != ""){
        for(var i = 0; i < obj.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected";
            var confidence = floor(obj[i].confidence * 100);
            fill("red");
            text(obj[i].label + " "+confidence+" % ", obj[i].x+10, obj[i].y+15);
            nofill();
            stroke("red");
            rect(obj[i].x,  obj[i].y, obj[i].width, obj[i].height);
        }
    }
}