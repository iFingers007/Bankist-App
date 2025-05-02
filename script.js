'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jehoiada Abu',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2025-04-15T21:31:17.178Z',
    '2025-04-16T07:42:02.383Z',
    '2025-04-17T09:15:04.904Z',
    '2025-04-18T10:17:24.185Z',
    '2025-04-19T14:11:59.604Z',
    '2025-04-20T17:01:17.194Z',
    '2025-04-21T23:36:17.929Z',
    '2025-04-22T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Hillary Chenemi',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2025-03-20T13:15:33.035Z',
    '2025-03-21T09:48:16.867Z',
    '2025-03-22T06:04:23.907Z',
    '2025-03-30T14:18:46.235Z',
    '2025-04-05T16:33:06.386Z',
    '2025-04-21T14:43:26.374Z',
    '2025-04-22T18:49:59.371Z',
    '2025-04-23T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

// const accounts = [account1, account2];

// BANKIST APP

/*
// Data
const account1 = {
  owner: 'Jehoiada Abu',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Hillary Chenemi',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
*/

const account3 = {
  owner: 'Kamal Eagleseye',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2015-01-01T13:15:33.035Z',
    '2015-01-30T09:48:16.867Z',
    '2015-02-25T06:04:23.907Z',
    '2025-03-25T14:18:46.235Z',
    '2025-04-05T16:33:06.386Z',
    '2025-04-10T14:43:26.374Z',
    '2025-04-22T18:49:59.371Z',
  ],
  currency: 'USD',
  locale: 'en-GB',
};

const account4 = {
  owner: 'Motun Motun',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2015-01-18T21:31:17.178Z',
    '2015-02-23T07:42:02.383Z',
    '2025-01-28T09:15:04.904Z',
    '2025-04-01T10:17:24.185Z',
    '2025-04-22T17:01:17.194Z',
    '2025-03-20T23:36:17.929Z',
    '2025-04-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'fi-FI', // de-DE
};

const account5 = {
  owner: 'Sam Besty',
  movements: [40, -100, 700, -550, 90, 200],
  interestRate: 1,
  pin: 5555,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
  ],
  currency: 'NGN',
  locale: 'en-NG',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
};

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatDate(date, acc.locale);

    const formattedMov = formatCurr(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = formatCurr(withdrawals, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);

const updateUI = function (acc) {
  displayMovements(acc);

  // Display Balace
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, logout user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started!';
      inputLoginPin.value = inputLoginUsername.value = '';
      inputLoginPin.blur();
    }

    // Decrease 1s
    time--;
  };

  // Set Time To 5 Minutes
  let time = 300;

  tick();

  // Call the Timer every Second
  const timer = setInterval(tick, 1000);
  return timer;
};
let currentAccount, timer;

// Fake Always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Event Listeners
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // DisplayUI and Message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner
      // .split(' ')[0]
    }`;

    // Clear Input Logins
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    // Display Movements
    containerApp.style.opacity = 100;

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);

    // Create Current Date and Time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // Display Date
    /*
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const mins = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${mins}`;
    */
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Wrong Username or Pin, TRY AGAIN!';
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    alert('Invalid Login Details');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  inputTransferAmount;

  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    receiverAccount &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    currentAccount !== receiverAccount
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Update Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogoutTimer();

    alert('Transfer Successful');
  } else {
    alert('Invalid Transfer Details');
    // const errorStr = `<p> Wrong receiver account ${receiverAccount} or Amount ${amount} </p>`;
    // opTransfer.insertAdjacentHTML('afterend', errorStr);
  }

  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    
    setTimeout(function () {
      currentAccount.movements.push(amount);
      updateUI(currentAccount);

      // Update Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Send Alert of loan
      alert(`Loan of ${formatCurr(amount, currentAccount.locale, currentAccount.currency)} approved`)
    }, 1000);

    updateUI(currentAccount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Reset Timer
    clearInterval(timer);
    timer = startLogoutTimer();

    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
  else {
    alert('Not Eligible for this amount')
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // Check for correct details
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);

    alert('Account Deleted Succesfully');
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
  } else {
    alert('Wrong details');
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
