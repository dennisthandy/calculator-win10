const socialOpen = document.querySelector('.open');
const socialContainer = document.querySelector('.social-container');

socialOpen.addEventListener('click', showSocial);

function showSocial() {
  socialOpen.classList.toggle('active');
  socialContainer.classList.toggle('open');
}

//main code
const panel = document.querySelector('.calculator__panel');
const input = document.querySelectorAll('.calculator__button');
const dataDisplay = document.querySelector('.calculator__data');
const historyDisplay = document.querySelector('.calculator__history');

let data = [];
let dummy = [];

input.forEach((item, i) => {
  item.addEventListener('click', setData)
});

function setData(event) {
  switch (event.target.value) {
    case 'C':
      historyDisplay.innerHTML = '';
      dataDisplay.innerHTML = '0';
      data = [];
      dummy = []
      break;
    case 'CE':
      dataDisplay.innerHTML = '0';
      dummy = []
      break;
    case '%':
    case '/':
    case 'x':
    case '-':
    case '+':
      data.push(Number(dataDisplay.innerText.replace(',','.')));
      data.push(event.target.value);
      historyDisplay.innerHTML = data.join('').replace('.',',');
      if (data.length >= 3) {
        calculate(data)
        // data = [];
      } else {
        dataDisplay.innerHTML = '';
      }
      dummy = []
      break;
    case '=':
      if (!isNaN(Number(dataDisplay.innerText.replace(',','.')))) {
        data.push(Number(dataDisplay.innerText.replace(',','.')));
      }
      historyDisplay.innerHTML = data.join('').replace('.',',')+"=";
      calculate(data)
      data = [];
      dummy = [];
      break;
    default:
      dummy.push(event.target.value);
      dataDisplay.innerHTML = dummy.join('');
      // dataDisplay.innerHTML = dataDisplay.innerText.substring(1);
      break;
  }
  // console.log('data', data, dummy)
}

function calculate(data) {
  let current = null;
  let operand = null;
  let total = 0;

  for (var i = 0; i < data.length; i++) {
    if (!isNaN(data[i])) {
      if (current === null) {
        current = data[i];
      } else {
        total = calculateProcess(current, data[i], operand);
        // console.log(current, operand, data[i], total)
        current = total;
      }
    } else {
      operand = data[i];
      // console.log('o',operand);
    }
  }
  if (total != 0 && total.toString().includes('.')) {
    total = total.toFixed(2);
  }
  total == 0 ? total = dataDisplay.innerText : total = total
  dataDisplay.innerHTML = total.toString().replace('.',',');
  // data = [];
}

function calculateProcess(number1, number2, operand) {
  switch (operand) {
    case '+':
      return number1 + number2;
      break;
    case '-':
      return number1 - number2;
      break;
    case 'x':
      return number1 * number2;
      break;
    case '/':
      return number1 / number2;
      break;
    case '%':
      return number1 % number2;
      break;
  }
}
