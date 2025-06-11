'use strict';


// Data

const account1 = {
  owner: 'Nirmal Saini',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, 
  pin: 1111,
   movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Manav Saini',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
   movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Dheeraj Saini',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
   movementsDates: [
    '2021-02-12T11:21:13.123Z',
    '2021-03-10T15:42:54.321Z',
    '2021-05-18T10:05:45.678Z',
    '2021-07-22T09:15:33.456Z',
    '2021-08-30T16:30:21.987Z',
    '2021-10-05T13:44:09.654Z',
    '2021-11-25T18:29:33.111Z',
    '2021-12-31T23:59:59.999Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account4 = {
  owner: 'Tanu Shree Saini',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
   movementsDates: [
    '2022-01-15T08:30:45.000Z',
    '2022-02-28T12:20:30.500Z',
    '2022-04-10T07:45:15.250Z',
    '2022-06-05T14:10:55.125Z',
    '2022-07-20T18:00:00.000Z',
    '2022-09-01T09:35:40.750Z',
    '2022-10-15T16:45:20.375Z',
    '2022-12-31T22:59:59.999Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const accounts = [account1, account2, account3, account4];

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

/////////////////////////////////////////////////
/////////////////////////////////////////////////


const displayMovement=function(acc,sort=false){
    const movements=acc.movements;
    containerMovements.innerHTML="";
    const combineMovDates=acc.movements.map((mov,i)=>
    ({movement:mov,movementDate:acc.movementsDates[i]})
  )
    if(sort)combineMovDates.sort((a,b)=>a.movement-b.movement);
    combineMovDates.forEach(function(obj,i)
{
  const {movement,movementDate}=obj;
    const type=movement>0 ? 'deposit':'withdrawal';
    const day=new Date(movementDate);
    const date=`${day.getDate()}`.padStart(2,'0');
const month=`${day.getMonth()+1}`.padStart(2,'0');
const year =day.getFullYear();
const displayDate=`${date}/${month}/${year}`;
  const formattedMov=new Intl.NumberFormat(acc.locale,{
    style:`currency`,
    currency:acc.currency,
  }).format(movement);
    const html=`
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">  ${i+1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
    </div>`;


    containerMovements.insertAdjacentHTML("afterbegin",html);
})
}


const calcDisplayBalance=function(aco)
{
  aco.balance=aco.movements.reduce(function(acc,mov)
  {return acc+mov}
)
  labelBalance.textContent=`${aco.balance}€`;
}


const initial=function (user)
{
     const arr=user.toLowerCase().split(" ");
     let x="";
     arr.forEach(function(k)
     {
        x+=k[0];
     }
     )
     return x;
}
accounts.forEach(function(ac)
{
    ac.userName=initial(ac.owner);
})


const calcDisplaySummary=function(account,movements)
{
  
  const incomes=Math.trunc(movements.filter(mov => mov>0).reduce((acc,mov)=>acc+mov,0));
  labelSumIn.textContent=`${incomes}€`;
  const withdrawal=Math.trunc(movements.filter(mov=>mov<0).reduce((acc,mov)=>mov+acc,0));
  labelSumOut.textContent=`${Math.abs(withdrawal)}€`;
  const intrest=Math.trunc(movements.filter(mov=>mov>0).map(deposite=>(deposite*account.interestRate)/100).filter(mp=>mp>=1).reduce((acc,mov)=>mov+acc));
  labelSumInterest.textContent=`${intrest}€`;
}



const startLogOutTimer=function(){
  
  const tick=function()
{
  const min=String(Math.trunc(time/60)).padStart(2,0);
  const sec=String(Math.trunc(time%60)).padStart(2,0);
  labelTimer.textContent=`${min}:${sec}`;
  
  if(time===0)
    {clearInterval(timer);
      containerApp.style.opacity=0;
      labelWelcome.textContent="Log in to get started";
    }
    time=time-1;
}
let time=120;
  
tick();
  const timer=setInterval(tick,1000)
  return timer;
}


/////////////////////////////////////////////////////////
/////////////////    EVENT LISTNER    //////////////////
////////////////////////////////////////////////////////
let currentAccount,timer;

btnLogin.addEventListener('click',function(e)
{
  e.preventDefault();
  currentAccount=accounts.find(acc=> acc.userName ===inputLoginUsername.value)
  const now =new Date();
const option={
  hour:'numeric',
  minute:'numeric',
  day:'numeric',
  month:'numeric',
  year:'numeric',
}
labelDate.textContent=new Intl.DateTimeFormat(currentAccount.locale,option).format(now);
  if(currentAccount?.pin===Number(inputLoginPin.value))
  {
    console.log('Login');

    labelWelcome.textContent=`Welcome Back ${currentAccount.owner}`;
    inputLoginPin.value=inputLoginUsername.value="";
    inputLoginPin.blur();
    if(timer)clearInterval(timer);
     timer=startLogOutTimer();
    calcDisplaySummary(currentAccount,currentAccount.movements);
    calcDisplayBalance(currentAccount);
    displayMovement(currentAccount);
    containerApp.style.opacity=100;
  }
  else
  {
    containerApp.style.opacity=0;
  }
});




////// TRANSFER FUNCTION ///////
btnTransfer.addEventListener('click',function(e)
{
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const receiverAcc=accounts.find(acc=>acc.userName===inputTransferTo.value);
  inputTransferTo.value=inputTransferAmount.value="";
  if(amount>0&& receiverAcc && currentAccount.balance>amount && receiverAcc.userName!==currentAccount){
  currentAccount.movements.push(-1*amount);
  receiverAcc.movements.push(amount);
  currentAccount.movementsDates.push(new Date());
  receiverAcc.movementsDates.push(new Date());
  clearInterval(timer);
     timer=startLogOutTimer();
   calcDisplaySummary(currentAccount,currentAccount.movements);
    calcDisplayBalance(currentAccount);
    displayMovement(currentAccount);
  }
})




///////  CLOSE ACCOUNT  ///////

btnClose.addEventListener('click',function(e)
{
  e.preventDefault();
  const deleteUsername=inputCloseUsername.value;
  const deletePin=Number(inputClosePin.value);
  if(deletePin===currentAccount.pin && deleteUsername===currentAccount.userName)
  {
    const index=accounts.findIndex(acc=>acc.userName===currentAccount.userName);
    accounts.splice(index,1);
    containerApp.style.opacity=0;
    labelWelcome.textContent="Log in to get started";

  }
})



///////  LOAN FUNCTION  ////////
btnLoan.addEventListener('click',function(e)
{
  e.preventDefault();
  const loanAmount=Math.round(Number(inputLoanAmount.value));
  inputLoanAmount.value="";
  const check=currentAccount.movements.some(mov=> mov>= loanAmount*0.1);
  if(loanAmount>0 && check)
  {
    setTimeout(function(){
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date());
    clearInterval(timer);
     timer=startLogOutTimer();
      calcDisplaySummary(currentAccount,currentAccount.movements);
    calcDisplayBalance(currentAccount);
    displayMovement(currentAccount);
  },2500
)
}
}
)

//////// SORT BUTTON  ////////
let type=false;
btnSort.addEventListener('click',function(e)
{
  e.preventDefault();
    displayMovement(currentAccount,!type)
    type=!type;
})


