function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const fefs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
  };

  let timeCount = null;
  let btnOn = false;

  fefs.startBtn.addEventListener('click', onBtnStart);
  fefs.stopBtn.addEventListener('click', onBtnStop);

  function onBtnStart() {
    btnOn = true;

    if (btnOn) {
        fefs.startBtn.setAttribute('disabled', 'true');
    };

    timeCount = setInterval(() => {
        fefs.body.style.backgroundColor = getRandomHexColor()}, 1_000);
    }

    function onBtnStop() {
        clearInterval(timeCount);
        fefs.startBtn.removeAttribute('disabled');
    }
