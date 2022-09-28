import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    countTime(selectedDates[0]);
  },
};

const refs = {
  picker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
};

let definedTime = null;

addFlatpick();
changeBtnState();

function addFlatpick() {
  const fp = flatpickr(refs.picker, options);
  refs.picker.value = '';
}

function countTime(selectDate) {
  const currentDate = options.defaultDate;

  if (selectDate <= currentDate) {
    alert('Please choose a date in the future');
    return;
  }

  definedTime = selectDate - currentDate;
  refs.btnStart.disabled = false;
}

function changeBtnState() {
  if (definedTime === null || definedTime <= 0) {
    refs.btnStart.disabled = true;
    return;
  }
}

// дізнатися як очитити інпут після алерту, коли вибрана дата в минулому
// з кнопками розібралася, різницю в часі рахує
// додати конвертор для мілісекунд в нормальний формат
