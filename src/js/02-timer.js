import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    timer: document.querySelector('.timer'),
    input: document.querySelector('#datetime-picker'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    btn: document.querySelector('button'),
};

let selectedData = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedData = selectedDates[0].getTime();

        if (selectedData < Date.now()) {
            Notify.failure('Please choose a date in the future');
            refs.btn.setAttribute('disabled', 'true');
        } else {
            refs.btn.removeAttribute('disabled');
            Notify.success('You can set time by press START');
        }
    },
};

flatpickr(refs.input, options);

const timer = {
    timerId: null,
    disable: (refs.btn.disabled = true),

    start() {
        this.timerId = setInterval(() => {
            const currentDate = Date.now();
            const delta = selectedData - currentDate;
            if (delta <= 0) {
                return;
            }
            const time = convertMs(delta);
            updateClockFace(time);
        }, 1_000);
    },
};

refs.btn.addEventListener('click', () => {
    timer.start();
    refs.btn.disabled = true;
    refs.input.disable = true;
});

const addLeadingZero = value => {
    if (value < 10) {
        return String(value).padStart(2, '0');
    }
    return value;
};

function updateClockFace(time) {
    refs.days.textContent = addLeadingZero(time.days);
    refs.hours.textContent = addLeadingZero(time.hours);
    refs.minutes.textContent = addLeadingZero(time.minutes);
    refs.seconds.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
}

