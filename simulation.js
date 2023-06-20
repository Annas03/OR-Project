let arrivalRate, serviceRate, min, max, randomNo;

// M/M/1 Simulation:

function MM1Simulation(){
    randomNo = Number(document.getElementById('random-no').value)
    arrivalRate = Number(document.getElementById('lambdas').value)
    serviceRate = Number(document.getElementById('mews').value)
}

function MM2Simulation(){
    randomNo = Number(document.getElementById('random-no').value)
    arrivalRate = Number(document.getElementById('lambdas').value)
    serviceRate = Number(document.getElementById('mews').value)
}

let selectedModel = 'mm1'

document.getElementById("mm1s").addEventListener('click', () => {
  implementMM()
  selectedModel = 'mm1s'
  document.getElementById("mm1s").style.borderBottom = 'thin solid black'
})

document.getElementById('mm2s').addEventListener('click', () => {
  implementMM()
  selectedModel = 'mm2s'
  document.getElementById('mm2s').style.borderBottom = 'thin solid black'
})

document.getElementById('mg1s').addEventListener('click', () => {
  implementMG()
  selectedModel = 'mg1s'
  document.getElementById("mg1s").style.borderBottom = 'thin solid black'
})

document.getElementById('mg2s').addEventListener('click', () => {
  implementMG()
  selectedModel = 'mg2s'
  document.getElementById("mg2s").style.borderBottom = 'thin solid black'
})


document.getElementById('gg1s').addEventListener('click', () => {
  implementGG()
  selectedModel = 'gg1s'
  document.getElementById("gg1s").style.borderBottom = 'thin solid black'
})

document.getElementById('gg2s').addEventListener('click', () => {
  implementGG()
  selectedModel = 'gg2s'
  document.getElementById("gg2s").style.borderBottom = 'thin solid black'
})

function implementMM(){
  document.getElementById('lambdas').style.display = 'block'
  document.getElementById('mews').style.display = 'block'
  document.getElementById('maxs').style.display = 'none'
  document.getElementById('mins').style.display = 'none'
  document.getElementById('mean-1s').style.display = 'none'
  document.getElementById('mean-2s').style.display = 'none'
  document.getElementById('variance-1s').style.display = 'none'
  document.getElementById('variance-2s').style.display = 'none'
  document.getElementById(selectedModel).style.borderBottom = 'none'
}

function implementMG(){
  document.getElementById('lambdas').style.display = 'block'
  document.getElementById('mews').style.display = 'none'
  document.getElementById('maxs').style.display = 'block'
  document.getElementById('mins').style.display = 'block'
  document.getElementById('mean-1s').style.display = 'none'
  document.getElementById('mean-2s').style.display = 'none'
  document.getElementById('variance-1s').style.display = 'none'
  document.getElementById('variance-2s').style.display = 'none'
  document.getElementById(selectedModel).style.borderBottom = 'none'
}

function implementGG(){
  document.getElementById('mean-1s').style.display = 'block'
  document.getElementById('mean-2s').style.display = 'block'
  document.getElementById('variance-1s').style.display = 'block'
  document.getElementById('variance-2s').style.display = 'block'
  document.getElementById('mews').style.display = 'none'
  document.getElementById('maxs').style.display = 'none'
  document.getElementById('mins').style.display = 'none'
  document.getElementById('lambdas').style.display = 'none'
  document.getElementById(selectedModel).style.borderBottom = 'none'
}

document.getElementById('mm1s').click()

document.getElementById('calculates').addEventListener('click', () => {
    switch (selectedModel) {
        case 'mm1s':
          MM1Simulation()
          break;
        case 'mm2s':
          MM2Simulation()
          break;
        default:
          break;
      }
})