document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('myVideo');
    
    video.addEventListener('ended', function() {
        // Pause at the last frame
        video.currentTime = 0;
    });
});
