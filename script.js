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
}

function startMusic(){
    if(!music){
        return;
    }

    if(!music.src){
        music.load();
    }

    const playRequest = music.play();

    if(playRequest){
        playRequest
            .then(() => setMusicButton(true))
            .catch(() => {
                music.load();
                setTimeout(() => {
                    music.play()
                        .then(() => setMusicButton(true))
                        .catch(() => setMusicButton(false));
                }, 120);
            });
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


/* =========================================
   BIRTHDAY DATE & TIME COUNTDOWN
========================================= */


/*
    SET YOUR BIRTHDAY DATE AND TIME HERE

    Format:
    YYYY-MM-DDTHH:MM:SS

    Example:
    September 16, 2026 at 12:00 AM

    Change this date and time according
    to your birthday surprise.
*/
const birthdayDate =
    new Date("2026-08-04T00:00:00").getTime();

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const redirectDelaySeconds = 5;
let redirectCountdown = redirectDelaySeconds;
let redirectTimer = null;
let countdownTimer = null;
const forceRedirectTest = true;

function startRedirectCountDown(){

    if(redirectTimer !== null){
        return;
    }

    redirectCountdown = redirectDelaySeconds;

    const waitingText =
        document.querySelector(".waiting-text");

    if(waitingText){
        waitingText.textContent =
            "🎉 Surprise is ready! Redirecting in 5 seconds...";
    }

    daysElement.innerText = "00";
    hoursElement.innerText = "00";
    minutesElement.innerText = "00";
    secondsElement.innerText =
        redirectCountdown.toString().padStart(2, "0");

    redirectTimer = setInterval(() => {

        redirectCountdown--;

        secondsElement.innerText =
            redirectCountdown.toString().padStart(2, "0");

        if(redirectCountdown <= 0){
            clearInterval(redirectTimer);
            redirectTimer = null;

            sessionStorage.setItem(
                "countdownComplete",
                "true"
            );

            window.location.href =
                "surprise.html";
        }

    }, 1000);
}


function updateCountdown(){

    if(forceRedirectTest){
        if(countdownTimer !== null){
            clearInterval(countdownTimer);
            countdownTimer = null;
        }

        startRedirectCountDown();
        return;
    }

    /* If countdown elements are not on this page,
       stop the countdown code safely. */

    if(
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ){
        return;
    }


    const now =
        new Date().getTime();


    const difference =
        birthdayDate - now;


    /* Countdown finished */

    if(difference <= 0){

        clearInterval(countdownTimer);


        daysElement.innerText = "00";
        hoursElement.innerText = "00";
        minutesElement.innerText = "00";
        secondsElement.innerText = "00";


        sessionStorage.setItem(
            "countdownComplete",
            "true"
        );

        startRedirectCountDown();

        return;

    }


    /* Calculate Days */

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    /* Calculate Hours */

    const hours =
        Math.floor(
            (difference %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    /* Calculate Minutes */

    const minutes =
        Math.floor(
            (difference %
            (1000 * 60 * 60)) /
            (1000 * 60)
        );


    /* Calculate Seconds */

    const seconds =
        Math.floor(
            (difference %
            (1000 * 60)) /
            1000
        );


    /* Update Days */

    daysElement.innerText =
        days
        .toString()
        .padStart(2, "0");


    /* Update Hours */

    hoursElement.innerText =
        hours
        .toString()
        .padStart(2, "0");


    /* Update Minutes */

    minutesElement.innerText =
        minutes
        .toString()
        .padStart(2, "0");


    /* Update Seconds */

    secondsElement.innerText =
        seconds
        .toString()
        .padStart(2, "0");

}


/* Start Countdown */

updateCountdown();


/* Update every second */

countdownTimer =
    setInterval(
        updateCountdown,
        1000
    );