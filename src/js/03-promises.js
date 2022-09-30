import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  form: document.querySelector('.form'),
  // btnSubmit: document.querySelector('[type=submit]'),
  // firstDelayField: document.querySelector('[name=delay]'),
  // delayStepField: document.querySelector('[name=step]'),
  // amountField: document.querySelector('[name=amount]'),
};

let intervalId = null;

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const repeatNumber = e.target.elements.amount.value;
  let firstDelay = Number(e.target.elements.delay.value);
  const step = Number(e.target.elements.step.value);

  callPromise(firstDelay, step, repeatNumber);
}

function callPromise(firstDelayValue, stepValue, numberValue) {
  createPromise(1, firstDelayValue)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

  for (i = 2; i <= numberValue; i += 1) {
    createPromise(i, (firstDelayValue += stepValue))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        rejected({ position, delay });
      }
    }, delay);
  });
}
