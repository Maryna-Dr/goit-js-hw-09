import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  picker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const DELAY = 1000;
let definedTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    countTime(selectedDates[0]);
  },
};

flatpickr(refs.picker, options);
initBtnState();

refs.btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  intervalId = setInterval(ticTimer, DELAY);
}

function countTime(selectDate) {
  const currentDate = options.defaultDate;

  if (selectDate <= currentDate) {
    Notify.failure('Please choose a date in the future');
    return;
  }

  definedTime = selectDate - currentDate;
  refs.btnStart.disabled = false;
}

function ticTimer() {
  if (definedTime === null) return;
  definedTime -= DELAY;

  if (definedTime <= 0) {
    clearInterval(intervalId);
    return;
  }

  updateTimer(convertMs(definedTime));
}

function updateTimer(dateTime) {
  const { days, hours, minutes, seconds } = dateTime;

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function initBtnState() {
  if (definedTime === null || definedTime <= 0) {
    refs.btnStart.disabled = true;
    return;
  }
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
