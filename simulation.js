let arrivalRate, serviceRate, min, max, numberOfEvents;

// M/M/1 Simulation:

function exponentialDistribution(serviceRate) {
  return -(serviceRate)*(Math.log(1 - Math.random()));
}

function poissonDistribution(arrivalRate) {
  const L = Math.exp(-arrivalRate);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

function simulateMM1() {
  arrivalRate = Number(document.getElementById('lambdas').value);serviceRate = Number(document.getElementById('mews').value);
  numberOfEvents = Number(document.getElementById('random-no').value)
  let arrivalTime = 0;
  let startTime = 0;
  let endTime = 0;
  let serviceTime = 0;
  let turnAroundTime = 0;
  let waitTime = 0;
  let responseTime = 0;
  let serverUtilization = 0;
  
  for (let i = 0; i < numberOfEvents; i++) {
    const interArrivalTime = poissonDistribution(arrivalRate)
    const arrival = arrivalTime + interArrivalTime;
    const service = exponentialDistribution(serviceRate);
    arrivalTime = arrival;
    serviceTime = service;
    
    if (arrival > endTime) {
      startTime = arrival;
    } else {
      startTime = endTime;
    }
    
    endTime = startTime + service;
    turnAroundTime = endTime - arrival;
    waitTime = startTime - arrival;
    responseTime = waitTime + service;
    
    serverUtilization += serviceTime / (endTime - startTime);

    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td class="border px-6 py-4">${arrival.toFixed(2)}</td>
        <td class="border px-6 py-4">${startTime.toFixed(2)}</td>
        <td class="border px-6 py-4">${endTime.toFixed(2)}</td>
        <td class="border px-6 py-4">${serviceTime.toFixed(2)}</td>
        <td class="border px-6 py-4">${turnAroundTime.toFixed(2)}</td>
        <td class="border px-6 py-4">${waitTime.toFixed(2)}</td>
        <td class="border px-6 py-4">${responseTime.toFixed(2)}</td>
    `;

  // Append the table row to the table body
  document.querySelector('.t-body').appendChild(tableRow)
  }
  
  serverUtilization = serverUtilization / numberOfEvents;
  document.querySelector('#util').innerHTML += serverUtilization.toFixed(2)*100 + "%"
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
          simulateMM1();
          break;
        case 'mm2s':
          MM2Simulation()
          break;
        default:
          break;
      }
})