

// Assuming you have the arrival time and service time data available in separate arrays
const arrivalTimes = [9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
const serviceTimes = [10, 8, 12, 10, 9, 7, 11, 10, 8, 9, 7];

// Step 3: Queuing Models
// Implement the queuing models (M/M/1, M/M/2, M/G/1, M/G/2, G/G/1, G/G/2) using appropriate mathematical formulas

// let arrivalRate = 1 / (arrivalTimes.reduce((a, b) => a + b, 0) / arrivalTimes.length);
// let serviceRate = 1 / (serviceTimes.reduce((a, b) => a + b, 0) / serviceTimes.length);
let arrivalRate, serviceRate, min, max;

// M/M/1 Queue Model
function calculateMM1() {
  arrivalRate = Number(document.getElementById('lambda').value)
  serviceRate = Number(document.getElementById('mew').value)
  const utilization = arrivalRate / serviceRate;
  const averageQueueLengthQueue = Math.pow(utilization,2) / (1 - utilization)
  const averageWaitingTimeQueue = averageQueueLengthQueue/arrivalRate
  const averageWaitingTimeSystem = averageWaitingTimeQueue + (1/serviceRate)
  const averageQueueLengthSystem = arrivalRate*averageWaitingTimeSystem;

  return {
    utilization,
    averageQueueLengthSystem,
    averageWaitingTimeSystem,
    averageQueueLengthQueue,
    averageWaitingTimeQueue, 
  };
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

function calculatePo(c, rho){
  let res = 0
  for(let n = 0; n<c; n++){
    res += Math.pow((c*rho), n)/factorial(n)
  }
  return 1 / (res + (Math.pow((c*rho), c)/(factorial(c)*(1-rho))))
}

// M/M/2 Queue Model
function calculateMM2() {
  arrivalRate = Number(document.getElementById('lambda').value)
  serviceRate = Number(document.getElementById('mew').value)
  // Calculate utilization
  const utilization = arrivalRate / (2 * serviceRate);

  // Calculate average queue length and waiting 
  const averageQueueLengthQueue = (calculatePo(2, utilization)*Math.pow((arrivalRate/serviceRate),2)*utilization)/(factorial(2)*Math.pow(1-utilization, 2));
  const averageWaitingTimeQueue = averageQueueLengthQueue / arrivalRate
  const averageWaitingTimeSystem = averageWaitingTimeQueue + (1/serviceRate)
  const averageQueueLengthSystem = arrivalRate*averageWaitingTimeSystem;

  return {
    utilization,
    averageQueueLengthSystem,
    averageWaitingTimeSystem,
    averageQueueLengthQueue,
    averageWaitingTimeQueue,
  };
}

// M/G/1 Queue Model
function calculateMG1() {
  arrivalRate = Number(document.getElementById('lambda').value)
  min = Number(document.getElementById('min').value)
  max = Number(document.getElementById('max').value)
  serviceRate = 1/((min + max)/2)

  const utilization = arrivalRate / serviceRate;
  const averageQueueLengthQueue = (Math.pow(arrivalRate,2)*(Math.pow(max-min, 2)/12)+Math.pow(utilization, 2)) / (2*(1-utilization))
  const averageWaitingTimeQueue = averageQueueLengthQueue/arrivalRate
  const averageWaitingTimeSystem = averageWaitingTimeQueue + (1/serviceRate)
  const averageQueueLengthSystem = averageWaitingTimeSystem*arrivalRate

  return {
    utilization,
    averageQueueLengthQueue,
    averageWaitingTimeQueue,
    averageQueueLengthSystem,
    averageWaitingTimeSystem,
  };
}

// M/G/2 Queue Model
function calculateMG2() {
  arrivalRate = Number(document.getElementById('lambda').value)
  min = Number(document.getElementById('min').value)
  max = Number(document.getElementById('max').value)
  serviceRate = 1/((min + max)/2)
  const cs = (Math.pow(min-max,2)/12)/Math.pow(1/serviceRate, 2)

  // Calculate utilization
  const utilization = arrivalRate / (2 * serviceRate);

  // Estimate the average length of queue for G/G/2 model
  const expaverageQueueLengthQueue = (calculatePo(2, utilization)*Math.pow((arrivalRate/serviceRate),2)*utilization)/(factorial(2)*Math.pow(1-utilization, 2));
  const averageWaitingTimeQueue = (expaverageQueueLengthQueue / arrivalRate)*((1+cs)/2)

  const averageQueueLengthQueue = averageWaitingTimeQueue * arrivalRate
  const averageWaitingTimeSystem = averageWaitingTimeQueue + (1/serviceRate)
  const averageQueueLengthSystem = arrivalRate * averageWaitingTimeSystem

  return {
    utilization,
    averageQueueLengthQueue,
    averageQueueLengthSystem,
    averageWaitingTimeSystem,
    averageWaitingTimeQueue,
  };
}

// G/G/1 Queue Model
function calculateGG1() {

  // Calculate utilization
  const utilization = arrivalRate / serviceRate;

  // Estimate the second moment of service time for G/G/1 model
  const serviceTimeSquared = serviceTimes.map((time) => time * time);
  const secondMomentServiceTime =
    serviceTimeSquared.reduce((a, b) => a + b, 0) / serviceTimeSquared.length;

  // Calculate average queue length and waiting time for G/G/1 model
  const averageQueueLength = (secondMomentServiceTime * arrivalRate) / (2 * serviceRate * (1 - utilization));
  const averageWaitingTime = averageQueueLength / arrivalRate;

  return {
    arrivalRate,
    serviceRate,
    utilization,
    averageQueueLength,
    averageWaitingTime,
  };
}

// G/G/2 Queue Model
function calculateGG2() {

  // Calculate utilization
  const utilization = arrivalRate / (2 * serviceRate);

  // Estimate the second moment of service time for G/G/2 model
  const serviceTimeSquared = serviceTimes.map((time) => time * time);
  const secondMomentServiceTime =
    serviceTimeSquared.reduce((a, b) => a + b, 0) / serviceTimeSquared.length;

  // Calculate average queue length and waiting time for G/G/2 model
  const averageQueueLength =
    (utilization * utilization * (1 + utilization)) / (1 - utilization) +
    ((utilization * utilization * utilization) / (1 - utilization)) *
    (1 + (utilization * utilization * (1 + utilization)) / (1 - utilization));
  const averageWaitingTime = averageQueueLength / arrivalRate + secondMomentServiceTime / (2 * serviceRate * (1 - utilization));

  return {
    arrivalRate,
    serviceRate,
    utilization,
    averageQueueLength,
    averageWaitingTime,
  };
}

let selectedModel = 'mm1'

document.getElementById("mm1").addEventListener('click', () => {
  document.getElementById('lambda').style.display = 'block'
  document.getElementById('mew').style.display = 'block'
  document.getElementById('max').style.display = 'none'
  document.getElementById('min').style.display = 'none'
  document.getElementById('mean-1').style.display = 'none'
  document.getElementById('mean-2').style.display = 'none'
  document.getElementById('variance-1').style.display = 'none'
  document.getElementById('variance-2').style.display = 'none'
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'mm1'
  document.getElementById("mm1").style.borderBottom = 'thin solid black'
  console.log('mm1')
})

document.getElementById('mm2').addEventListener('click', () => {
  document.getElementById('lambda').style.display = 'block'
  document.getElementById('mew').style.display = 'block'
  document.getElementById('max').style.display = 'none'
  document.getElementById('min').style.display = 'none'
  document.getElementById('mean-1').style.display = 'none'
  document.getElementById('mean-2').style.display = 'none'
  document.getElementById('variance-1').style.display = 'none'
  document.getElementById('variance-2').style.display = 'none'
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'mm2'
  document.getElementById('mm2').style.borderBottom = 'thin solid black'
  console.log('mm2')
})

document.getElementById('mg1').addEventListener('click', () => {
  document.getElementById('lambda').style.display = 'block'
  document.getElementById('mew').style.display = 'none'
  document.getElementById('max').style.display = 'block'
  document.getElementById('min').style.display = 'block'
  document.getElementById('mean-1').style.display = 'none'
  document.getElementById('mean-2').style.display = 'none'
  document.getElementById('variance-1').style.display = 'none'
  document.getElementById('variance-2').style.display = 'none'
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'mg1'
  document.getElementById("mg1").style.borderBottom = 'thin solid black'
  console.log('mg1')
})

document.getElementById('mg2').addEventListener('click', () => {
  document.getElementById('lambda').style.display = 'block'
  document.getElementById('mew').style.display = 'none'
  document.getElementById('max').style.display = 'block'
  document.getElementById('min').style.display = 'block'
  document.getElementById('mean-1').style.display = 'none'
  document.getElementById('mean-2').style.display = 'none'
  document.getElementById('variance-1').style.display = 'none'
  document.getElementById('variance-2').style.display = 'none'
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'mg2'
  document.getElementById("mg2").style.borderBottom = 'thin solid black'
  console.log('mg2')
})

document.getElementById('gg1').addEventListener('click', () => {
  document.getElementById('mean-1').style.display = 'block'
  document.getElementById('mean-2').style.display = 'block'
  document.getElementById('variance-1').style.display = 'block'
  document.getElementById('variance-2').style.display = 'block'
  document.getElementById('mew').style.display = 'none'
  document.getElementById('max').style.display = 'none'
  document.getElementById('min').style.display = 'none'
  document.getElementById('lambda').style.display = 'none'
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'gg1'
  document.getElementById("gg1").style.borderBottom = 'thin solid black'
  console.log('gg1')
})

document.getElementById('gg2').addEventListener('click', () => {
  document.getElementById('mean-1').style.display = 'block'
  document.getElementById('mean-2').style.display = 'block'
  document.getElementById('variance-1').style.display = 'block'
  document.getElementById('variance-2').style.display = 'block'
  document.getElementById('mew').style.display = 'none'
  document.getElementById('max').style.display = 'none'
  document.getElementById('min').style.display = 'none'
  document.getElementById('lambda').style.display = 'none'
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'gg2'
  document.getElementById("gg2").style.borderBottom = 'thin solid black'
  console.log('gg2')
})

document.getElementById('mm1').click()

document.getElementById('calculate').addEventListener('click', () => {
  document.getElementById('Utilization').innerHTML = 'Utilization Rate : '
  document.getElementById('queue-length-system').innerHTML = 'AverageQueueLength(System) : '
  document.getElementById('queue-length-queue').innerHTML = 'AverageQueueLength(Queue) : '
  document.getElementById('waiting-time-system').innerHTML = 'AverageWaitingTime(System) : '
  document.getElementById('waiting-time-queue').innerHTML = 'AverageWaitingTime(Queue) : '
  let result;
  switch (selectedModel) {
    case 'mm1':
      result = calculateMM1();
      break;
    case 'mm2':
      result = calculateMM2();
      break;
    case 'mg1':
      result = calculateMG1();
      break;
    case 'mg2':
      result = calculateMG2();
      break;
    case 'gg1':
      result = calculateGG1();
      break;
    case 'gg2':
      result = calculateGG2();
      break;
  
    default:
      break;
  }
  document.getElementById('Utilization').innerHTML += result.utilization.toFixed(2)
  document.getElementById('queue-length-system').innerHTML += result.averageQueueLengthSystem.toFixed(2)
  document.getElementById('queue-length-queue').innerHTML += result.averageQueueLengthQueue.toFixed(2)
  document.getElementById('waiting-time-system').innerHTML += result.averageWaitingTimeSystem.toFixed(2)
  document.getElementById('waiting-time-queue').innerHTML += result.averageWaitingTimeQueue.toFixed(2)

  console.log(selectedModel)
  
})
