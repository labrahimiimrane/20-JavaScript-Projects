const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play And Pause Video
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }
}

// Update Play And play Icon
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = "<i class='fa fa-play-circle-o' aria-hidden='true'></i>"
    } else{
        play.innerHTML = "<i class='fa fa-pause-circle-o' aria-hidden='true'></i>"
    }
}

// Update Progress And Timestamp
function updateProgress(){
    progress.value = (video.currentTime / video.duration) * 100;
    
    // Get Minites
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins)
    }

    // Get Seconds
    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10){
        secs = '0' + String(secs)
    }

    timestamp.innerHTML = `${mins}:${secs}`
}

// Set Video Time To Progress
function setVideoProgress(){
    video.currentTime =(+progress.value * video.duration) / 100;
}

// Stop Video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress)

