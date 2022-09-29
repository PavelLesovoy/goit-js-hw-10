import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
form: document.querySelector('.form'),
delay: document.querySelector('input[name=delay]'),
step : document.querySelector('input[name=step]'),
amount: document.querySelector('input[name=amount]'),
};

refs.form.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  return new Promise((res, rej,) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        res({position, delay});
      }
      else {
        rej({position, delay});
      }
    }, delay);
  });
}

function submitForm(evt) {
  evt.preventDefault();

  let evtDelay = Number(refs.delay.value);
  let evtStep = Number(refs.step.value);
  let evtAmount = Number(refs.amount.value);

  for (let value = 1; value <= evtAmount; value += 1) {
    createPromise(value, evtDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.success(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    evtDelay += evtStep;
  }
}

