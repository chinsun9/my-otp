/* eslint-disable no-unused-vars */

function genkey() {
  const fetchResponsePromise = fetch('/genkey');
  fetchResponsePromise
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Something went wrong on api server!');
    })
    .then((response) => {
      console.log('fetch', response);
    })
    .catch((error) => {
      console.error(error);
    });
}

function login() {
  const fetchResponsePromise = fetch('/login', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({
      inputKey: document.myForm.inputKey.value,
      inputOtp: document.myForm.inputOtp.value,
    }), // body data type must match "Content-Type" header
  });
  fetchResponsePromise
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Something went wrong on api server!');
    })
    .then((response) => {
      console.log('fetch', response);
    })
    .catch((error) => {
      console.error(error);
    });
}

function padZeros(num, digit) {
  return `${num}`.padStart(digit, '0');
}

function getotp() {
  const fetchResponsePromise = fetch('/otp', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({ inputKey: document.myForm.inputKey.value }),
  });
  fetchResponsePromise
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Something went wrong on api server!');
    })
    .then((response) => {
      console.log('fetch', response);
    })
    .catch((error) => {
      console.error(error);
    });
}

function printClock() {
  const currentDate = new Date(); // 현재시간

  const curHours = currentDate.getHours();
  const curSeconds = currentDate.getSeconds();
  const amPm = curHours >= 12 ? 'PM' : 'AM';
  const currentHours = padZeros(curHours >= 12 ? curHours - 12 : curHours, 2);
  const currentMinute = padZeros(currentDate.getMinutes(), 2);
  const currentSeconds = curSeconds >= 50 ? `<span style="color:#de1951;">${padZeros(curSeconds, 2)}</span>` : padZeros(curSeconds, 2);

  document.querySelector('#time').innerHTML = `${currentHours}:${currentMinute}:${currentSeconds} <span style='font-size:50px;'>${amPm}</span>`;
}

printClock();

setInterval(printClock, 1000);
