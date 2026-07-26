const slides = Array.from(document.querySelectorAll(".slide-item"));
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");
let current = 0;

function showSlide(index){
    if(slides.length === 0){
        return;
    }

    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === index);
    });
}

function nextSlide(){
    if(slides.length === 0){
        return;
    }

    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide(){
    if(slides.length === 0){
        return;
    }

    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

function setMusicButton(isPlaying){
    if(!musicButton){
        return;
    }

    musicButton.innerHTML = isPlaying
        ? "&#9208; Pause Your Song"
        : "&#127925; Play Your Song";

    musicButton.setAttribute("aria-pressed", String(isPlaying));
    musicButton.setAttribute(
        "aria-label",
        isPlaying ? "Pause your song" : "Play your song"
    );
}

function startMusic(){
    if(!music){
        return;
    }

    if(music.ended){
        music.currentTime = 0;
    }

    const playRequest = music.play();

    if(playRequest){
        playRequest
            .then(() => setMusicButton(true))
            .catch(() => setMusicButton(false));
    }
}

function toggleMusic(event){
    if(event){
        event.preventDefault();
        event.stopPropagation();
    }

    if(!music){
        return;
    }

    if(music.paused){
        startMusic();
    }else{
        music.pause();
        setMusicButton(false);
    }
}

function playMusic(){
    toggleMusic();
}

function toggleTheme(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }
}

if(music){
    music.addEventListener("play", () => setMusicButton(true));
    music.addEventListener("pause", () => setMusicButton(false));
}

window.addEventListener("load", () => {
    const theme = localStorage.getItem("theme");

    if(theme === "dark"){
        document.body.classList.add("dark");
    }

    showSlide(current);
});

if(musicButton){
    musicButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleMusic(event);
    });
}

if(slides.length > 1){
    setInterval(nextSlide, 4000);
}



    
