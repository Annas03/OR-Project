let arrivalRate, serviceRate, serviceTimeMin, serviceTimeMax, numberOfEvents;

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
  let totalIntervalTime = 0;
  let totalServiceTime = 0;
  
  for (let i = 0; i < numberOfEvents; i++) {
    const arrivalCount = poissonDistribution(arrivalRate);
    totalIntervalTime +=  arrivalCount;
    const arrival = arrivalTime + arrivalCount
    const service = exponentialDistribution(serviceRate);
    arrivalTime = arrival;
    serviceTime = service;
    totalServiceTime += serviceTime
    
    if (arrival > endTime) {
      startTime = arrival;
    } else {
      startTime = endTime;
    }
    
    endTime = startTime + service;
    turnAroundTime = endTime - arrival;
    waitTime = turnAroundTime - serviceTime;
    responseTime = Math.round(startTime) - Math.round(arrivalTime);

    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td class="font-semibold border text-center px-2 py-3">${Math.round(arrival)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(startTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(endTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(serviceTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(turnAroundTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(waitTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(responseTime)}</td>
    `;
 
  // Append the table row to the table body
  document.querySelector('.t-body-1').appendChild(tableRow)
  }
  
  serverUtilization = ((numberOfEvents-1)/totalIntervalTime)/(numberOfEvents/totalServiceTime);
  document.querySelector('#util').innerHTML += serverUtilization > 1 ?  100 + "%" : Math.round(serverUtilization.toFixed(2)*100) + "%"
}

function simulateMM2() {
  arrivalRate = Number(document.getElementById('lambdas').value);
  serviceRate = Number(document.getElementById('mews').value);
  numberOfEvents = Number(document.getElementById('random-no').value)
  let arrivalTime = 0;
  let startTime = 0;
  let endTime = 0;
  let turnaroundTime = 0;
  let waitTime = 0;
  let responseTime = 0;
  let serverUtilization = 0;
  let server1Utilization = 0
  let server2Utilization = 0
  let totalServiceTime = 0

   // Initialize variables for the two servers
   let server1EndTime = 0;
   let server2EndTime = 0;
   let server1StartTime = 0;
   let server2StartTime = 0;
   let server = ''
  
  for (let i = 0; i < numberOfEvents; i++) {
    const interArrivalTime = poissonDistribution(arrivalRate)
    // totalIntervalTime += interArrivalTime
    const arrival = arrivalTime + interArrivalTime;
    const serviceTime = exponentialDistribution(serviceRate);
    totalServiceTime += serviceTime
    arrivalTime = Math.round(arrival);
    
    if(server1EndTime <= arrivalTime){
      startTime = arrivalTime
      server1StartTime = arrivalTime
      server1EndTime = arrivalTime + serviceTime
      endTime = server1EndTime
      turnaroundTime = server1EndTime - server1StartTime;
      waitTime = server1StartTime - arrivalTime;
      server = 'S1'
    }
    else if(server2EndTime <= arrivalTime){
      server2StartTime = arrivalTime
      startTime = arrivalTime
      server2EndTime =  arrivalTime + serviceTime
      endTime = server2EndTime
      turnaroundTime = server2EndTime - arrivalTime;
      waitTime = server2StartTime - arrivalTime;
      server = 'S2'
    }
    else if(arrivalTime < server1EndTime && arrivalTime < server2EndTime){
      if(server1EndTime <= server2EndTime){
        server1StartTime =  server1EndTime
        startTime = server1StartTime
        server1EndTime = server1EndTime + serviceTime
        endTime = server1EndTime
        turnaroundTime = server1EndTime - server1StartTime;
        waitTime = server1StartTime - arrivalTime;
        server = 'S1'
      }
      else{
        server2StartTime = server2EndTime
        startTime = server2StartTime
        server2EndTime =  server2EndTime + serviceTime
        endTime = server2EndTime
        turnaroundTime = server2EndTime - server2StartTime;
        waitTime = server2StartTime - arrivalTime;
        server = 'S2'
      }
    }
    responseTime = startTime - arrivalTime;
    server == 'S1' ? server1Utilization += endTime - startTime : server2Utilization += endTime - startTime
    
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td class="font-semibold border text-center px-2 py-3">${Math.round(arrivalTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(startTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(endTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${server}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(serviceTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(turnaroundTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(waitTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(responseTime)}</td>
    `;

  // Append the table row to the table body
  document.querySelector('.t-body-2').appendChild(tableRow)
  }
  
  serverUtilization = ((server1Utilization + server2Utilization)/totalServiceTime)*100;
  console.log(serverUtilization)
  document.querySelector('#util').innerHTML += serverUtilization.toFixed(0) + "%"
}

// Calculate M/G/1

function expDistribution(lambda) {
  return -Math.log(1 - Math.random()) / lambda;
}

function uniformDistribution(min, max) {
  return Math.random() * (max - min) + min;
}

function simulateMG1() {
  arrivalRate = Number(document.getElementById('lambdas').value);
  serviceTimeMin = Number(document.getElementById('mins').value)
  serviceTimeMax = Number(document.getElementById('maxs').value)
  n = Number(document.getElementById('random-no').value)

  let arrivalTime = 0;
  let startTime = 0;
  let endTime = 0;
  let serviceTime = 0;
  let turnAroundTime = 0;
  let waitTime = 0;
  let responseTime = 0;
  let serverUtilization = 0;
  let totalIntervalTime = 0;
  let totalServiceTime = 0;

  for (let i = 0; i < n; i++) {
    const interArrivalTime = expDistribution(arrivalRate);
    totalIntervalTime += interArrivalTime
    const arrival = arrivalTime + interArrivalTime;
    const service = uniformDistribution(serviceTimeMin, serviceTimeMax);
    arrivalTime = arrival;
    serviceTime = service;
    totalServiceTime += serviceTime;

    startTime = Math.max(arrival, endTime);
    endTime = startTime + service;

    turnAroundTime = endTime - arrival;
    waitTime = turnAroundTime - serviceTime;
    responseTime = startTime - arrivalTime;

    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
        <td class="font-semibold border text-center px-2 py-3">${Math.round(arrival)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(startTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(endTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(serviceTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(turnAroundTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(waitTime)}</td>
        <td class="font-semibold border text-center px-2 py-3">${Math.round(responseTime)}</td>
    `;
    document.querySelector('.t-body-1').appendChild(tableRow)
  }

  serverUtilization = ((n-1)/totalIntervalTime)/(n/totalServiceTime);
  document.querySelector('#util').innerHTML += serverUtilization > 1 ?  100 + "%" : Math.round(serverUtilization.toFixed(2)*100) + "%"
}

let selectedModel = 'mm1s'

document.getElementById("mm1s").addEventListener('click', () => {
  implementMM()
  document.querySelector('#table-1').style.display = 'block'
  document.querySelector('#table-2').style.display = 'none'
  selectedModel = 'mm1s'
  document.getElementById("mm1s").style.borderBottom = 'thin solid black'
})

document.getElementById('mm2s').addEventListener('click', () => {
  implementMM()
  document.querySelector('#table-1').style.display = 'none'
  document.querySelector('#table-2').style.display = 'block'
  selectedModel = 'mm2s'
  document.getElementById('mm2s').style.borderBottom = 'thin solid black'
})

document.getElementById('mg1s').addEventListener('click', () => {
  implementMG()
  document.querySelector('#table-1').style.display = 'block'
  document.querySelector('#table-2').style.display = 'none'
  selectedModel = 'mg1s'
  document.getElementById("mg1s").style.borderBottom = 'thin solid black'
})

document.getElementById('mg2s').addEventListener('click', () => {
  implementMG()
  document.querySelector('#table-1').style.display = 'none'
  document.querySelector('#table-2').style.display = 'block'
  selectedModel = 'mg2s'
  document.getElementById("mg2s").style.borderBottom = 'thin solid black'
})


document.getElementById('gg1s').addEventListener('click', () => {
  implementGG()
  document.querySelector('#table-1').style.display = 'block'
  document.querySelector('#table-2').style.display = 'none'
  selectedModel = 'gg1s'
  document.getElementById("gg1s").style.borderBottom = 'thin solid black'
})

document.getElementById('gg2s').addEventListener('click', () => {
  implementGG()
  document.querySelector('#table-1').style.display = 'none'
  document.querySelector('#table-2').style.display = 'block'
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
  document.querySelector('#util').innerHTML = 'Server Utilization: '
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
  document.querySelector('#util').innerHTML = 'Server Utilization: '
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
  document.querySelector('#util').innerHTML = 'Server Utilization: '
}

document.getElementById('mm1s').click()

document.getElementById('calculates').addEventListener('click', () => {
  document.querySelector('.t-body-1').innerHTML = ''
  document.querySelector('.t-body-2').innerHTML = ''
  document.querySelector('#util').innerHTML = 'Server Utilization: '
    switch (selectedModel) {
        case 'mm1s':
          simulateMM1();
          break;
        case 'mm2s':
          simulateMM2();
          break;
        case 'mg1s':
          simulateMG1();
          break;
        default:
          break;
      }
})