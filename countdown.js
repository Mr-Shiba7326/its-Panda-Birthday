(() => {
    const SURPRISE_PAGE = "surprise.html";
    const TARGET_TIME = new Date("2026-08-04T00:00:00").getTime();
    const SHORT_COUNTDOWN_SECONDS = 8;
    const UNLOCK_KEY = "birthdaySurpriseUnlocked";

    if (window.location.pathname.endsWith(SURPRISE_PAGE)) {
        return;
    }

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    const waitingText = document.querySelector(".waiting-text");

    let mainTimer = null;
    let shortTimer = null;

    function setWaitingText(message) {
        if (waitingText) {
            waitingText.textContent = message;
        }
    }

    function updateCountdownDisplay(days, hours, minutes, seconds) {
        if (daysElement) daysElement.innerText = String(days).padStart(2, "0");
        if (hoursElement) hoursElement.innerText = String(hours).padStart(2, "0");
        if (minutesElement) minutesElement.innerText = String(minutes).padStart(2, "0");
        if (secondsElement) secondsElement.innerText = String(seconds).padStart(2, "0");
    }

    function openSurprise() {
        localStorage.setItem(UNLOCK_KEY, "true");
        sessionStorage.setItem("countdownComplete", "true");
        window.location.href = SURPRISE_PAGE;
    }

    function startShortCountdown() {
        if (shortTimer !== null) return;

        let remainingSeconds = SHORT_COUNTDOWN_SECONDS;

        function tickShortCountdown() {
            if (remainingSeconds > 0) {
                setWaitingText("🎉 Surprise is ready! Opening soon...");
                updateCountdownDisplay(0, 0, 0, remainingSeconds);
                remainingSeconds--;
            } else {
                clearInterval(shortTimer);
                shortTimer = null;
                openSurprise();
            }
        }

        tickShortCountdown();
        shortTimer = setInterval(tickShortCountdown, 1000);
    }

    function updateCountdown() {
        const now = Date.now();
        const difference = TARGET_TIME - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            updateCountdownDisplay(days, hours, minutes, seconds);
            setWaitingText("⏳ A little more wait... 💖");
            return;
        }

        if (difference === 0) {
            openSurprise();
            return;
        }

        startShortCountdown();
    }

    updateCountdown();
    mainTimer = setInterval(updateCountdown, 1000);
})();