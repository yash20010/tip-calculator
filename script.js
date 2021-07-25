console.log('Hello world!')

const billInput = document.querySelector('#billCustom')
const tipInput = document.querySelector('#tipCustom')
const peopleInput = document.querySelector('#peopleCustom')
const tipPercent = document.querySelector('.grid')
const customTipPercent = document.querySelector('#tipCustom')

billInput.addEventListener('input', bill)
let initialBill
function bill(e) {
  initialBill = Number(e.target.value)
  if (totalPeople && initialBill && selectedTip !== 0 && selectedTip) {
    calculate(totalPeople, initialBill, selectedTip)
  }
}

tipPercent.addEventListener('click', select)
let selectedTip
function select(e) {
  if (!e.target.value) return
  selectedTip = e.target
  let children = Array.from(tipPercent.children)
  for (let i = 0; i < children.length - 1; i++) {
    if (selectedTip.value === children[i].value) {
      children[i].id = 'tipSelected'
    } else {
      children[i].id = ''
    }
  }
  if (selectedTip.value.includes('%')) {
    selectedTip = parseInt(selectedTip.value)
  } else {
    selectedTip = Number(selectedTip.value)
  }
  if (totalPeople && initialBill && selectedTip !== 0 && selectedTip) {
    calculate(totalPeople, initialBill, selectedTip)
  }
}

customTipPercent.addEventListener('input', customTipInput)

function customTipInput(e) {
  select(e)
}

peopleInput.addEventListener('input', people)
let totalPeople
function people(e) {
  let warning = document.querySelector('.zeroPeople').classList
  totalPeople = parseInt(e.target.value)
  if (totalPeople === 0) {
    warning.remove('hidden')
    warning.add('zeroBorder')
  } else {
    warning.remove('zeroBorder')
    warning.add('hidden')
  }
  if (!totalPeople) return
  if (totalPeople && initialBill && selectedTip !== 0 && selectedTip) {
    calculate(totalPeople, initialBill, selectedTip)
  }
}

function calculate(p, b, t) {
  let tipPerPerson = ((b * t) / 100 / p).toFixed(2)
  let totalPerPerson = ((b * (1 + t / 100)) / p).toFixed(2)
  if (![...document.querySelector('.resetBut').classList].includes('active')) {
    console.log('ran')
    document.querySelector('.resetBut').classList.add('active')
  }
  document.querySelector('.tipOutput').innerText = tipPerPerson
  document.querySelector('.totalOutput').innerText = totalPerPerson
}

document
  .querySelector('.resetBut')
  .addEventListener('click', () => location.reload())
