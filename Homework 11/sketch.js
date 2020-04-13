let myVideo;
let playing;
let button, button2;
let muted;
let volumeDownButton, volumeUpButton;
let myCurrentVolume = 1;

function setup() {
    //noCanvas();

    myVideo = createVideo(['assets/Family project.mp4']);
    button = createButton('play');
    button.class("btn")
    button2 = createButton('mute');

    volumeDownButton = createButton('volume down');
    volumeUpButton = createButton('volume up');
    button.mousePressed(playVideo);
    button2.mousePressed(audioVolume);
    volumeDownButton.mousePressed(volumeDown);
    volumeUpButton.mousePressed(volumeUp);
    //video calbration
    myVideo.size(800, 600);
    myVideo.center();





}

function volumeDown() {
    myCurrentVolume -= .1;
    if (myCurrentVolume <= 0) {
        myCurrentVolume = 0;
    }
    print(myCurrentVolume);
    myVideo.volume(myCurrentVolume);
}

function volumeUp() {
    myCurrentVolume += .1;
    if (myCurrentVolume >= 1) {
        myCurrentVolume = 1;
    }
    print(myCurrentVolume);
    myVideo.volume(myCurrentVolume);
}

function audioVolume() {
    if (muted) {
        button2.html('unmute')
        myVideo.volume(0);
    } else {
        button2.html('mute');
        myVideo.volume(myCurrentVolume);
    }

    muted = !muted;

}
// This function is called when the video loads
function playVideo() {

    if (playing) {
        myVideo.pause();
        button.html('play');
        playing = false;
    } else {
        myVideo.loop();
        button.html('pause');
        playing = true;

    }
    // playing = !playing;
    myVideo.volume(1);
}
