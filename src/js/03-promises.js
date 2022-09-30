import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const amount = e.target.elements.amount.valueAsNumber;
  const firstDelay = e.target.elements.delay.valueAsNumber;
  const step = e.target.elements.step.valueAsNumber;

  callPromise(firstDelay, step, amount);
}

function callPromise(firstDelayValue, stepValue, numberValue) {
  for (i = 0; i < numberValue; i += 1) {
    createPromise(i + 1, firstDelayValue + stepValue * i)
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
