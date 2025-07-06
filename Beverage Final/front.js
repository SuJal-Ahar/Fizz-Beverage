// Get a reference to the video element
const video = document.getElementById("myVideo");

// Function to play the video and reset it to the first frame when it ends
function playVideo() {
    video.play();
    video.addEventListener("ended", resetVideo);
}

// Function to reset the video to its first frame
function resetVideo() {
    video.currentTime = 0; // Set the video to its first frame
    video.removeEventListener("ended", resetVideo); // Remove the ended event listener
}

// Add a click event listener to the video to trigger the playVideo function
video.addEventListener("click", playVideo);
