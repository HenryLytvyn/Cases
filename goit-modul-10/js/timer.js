// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("button[data-start]");
const inputCalendar = document.querySelector("#datetime-picker");
const timerContainer = document.querySelector(".timer");

startBtn.disabled = true;
startBtn.style.cursor = "default";

let date;
let deltaTime;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      date = selectedDates[0];
      startBtn.disabled = false;
      startBtn.style.cursor = "pointer";
    } else {
      alert("Please choose a date in the future");
      startBtn.disabled = true;
      startBtn.style.cursor = "default";
    }

    if (date) {
      deltaTime = date.getTime() - Date.now();
    }
  },
});

startBtn.addEventListener("click", handleCountdown);

function handleCountdown() {
  startBtn.style.cursor = "default";
  inputCalendar.style.cursor = "default";

  const countdownInterval = setInterval(() => {
    if (deltaTime > 999) {
      startBtn.disabled = true;
      inputCalendar.disabled = true;

      deltaTime -= 1000;
      const currentValue = convertMs(deltaTime);
      console.log(currentValue);

      timerContainer.innerHTML = `<div class="field">
  <span class="value" data-days>${String(currentValue.days).padStart(
    2,
    "0"
  )}</span>
  <span class="label">Days</span>
</div>
<div class="field">
  <span class="value" data-hours>${String(currentValue.hours).padStart(
    2,
    "0"
  )}</span>
  <span class="label">Hours</span>
</div>
<div class="field">
  <span class="value" data-minutes>${String(currentValue.minutes).padStart(
    2,
    "0"
  )}</span>
  <span class="label">Minutes</span>
</div>
<div class="field">
  <span class="value" data-seconds>${String(currentValue.seconds).padStart(
    2,
    "0"
  )}</span>
  <span class="label">Seconds</span>
</div>`;
    } else {
      startBtn.disabled = false;
      inputCalendar.disabled = false;

      startBtn.style.cursor = "pointer";
      inputCalendar.style.cursor = "pointer";

      clearInterval(countdownInterval);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
