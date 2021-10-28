const time_HTMLelement = document.querySelector('#time');

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
      input_key: document.myForm.input_key.value,
      input_otp: document.myForm.input_otp.value,
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
    body: JSON.stringify({ input_key: document.myForm.input_key.value }), // body data type must match "Content-Type" header
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
  const clock = time_HTMLelement; // 출력할 장소 선택
  const currentDate = new Date(); // 현재시간
  const calendar = `${currentDate.getFullYear()
  }-${
    currentDate.getMonth() + 1
  }-${
    currentDate.getDate()}`; // 현재 날짜
  let amPm = 'AM'; // 초기값 AM
  let currentHours = addZeros(currentDate.getHours(), 2);
  const currentMinute = addZeros(currentDate.getMinutes(), 2);
  let currentSeconds = addZeros(currentDate.getSeconds(), 2);

  if (currentHours >= 12) {
    // 시간이 12보다 클 때 PM으로 세팅, 12를 빼줌
    amPm = 'PM';
    currentHours = addZeros(currentHours - 12, 2);
  }

  if (currentSeconds >= 50) {
    // 50초 이상일 때 색을 변환해 준다.
    currentSeconds = `<span style="color:#de1951;">${currentSeconds}</span>`;
  }
  clock.innerHTML = `${currentHours
  }:${
    currentMinute
  }:${
    currentSeconds
  } <span style='font-size:50px;'>${
    amPm
  }</span>`; // 날짜를 출력해 줌

  setTimeout('printClock()', 1000); // 1초마다 printClock() 함수 호출
}
printClock();

function addZeros(num, digit) {
  // 자릿수 맞춰주기
  let zero = '';
  num = num.toString();
  if (num.length < digit) {
    for (i = 0; i < digit - num.length; i++) {
      zero += '0';
    }
  }
  return zero + num;
}
