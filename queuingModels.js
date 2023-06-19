// Assuming you have the arrival time and service time data available in separate arrays
const arrivalTimes = [9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
const serviceTimes = [10, 8, 12, 10, 9, 7, 11, 10, 8, 9, 7];

// Step 3: Queuing Models
// Implement the queuing models (M/M/1, M/M/2, M/G/1, M/G/2, G/G/1, G/G/2) using appropriate mathematical formulas

const arrivalRate = 1 / (arrivalTimes.reduce((a, b) => a + b, 0) / arrivalTimes.length);
const serviceRate = 1 / (serviceTimes.reduce((a, b) => a + b, 0) / serviceTimes.length);

// M/M/1 Queue Model
function calculateMM1() {
  const utilization = arrivalRate / serviceRate;
  const averageQueueLength = utilization / (1 - utilization);
  const averageWaitingTime = averageQueueLength / arrivalRate;

  return {
    arrivalRate,
    serviceRate,
    utilization,
    averageQueueLength,
    averageWaitingTime,
  };
}

// M/M/2 Queue Model
function calculateMM2() {
  // Calculate utilization
  const utilization = arrivalRate / (2 * serviceRate);

  // Calculate average queue length and waiting time
  const averageQueueLength = (2 * utilization * utilization) / (1 - utilization);
  const averageWaitingTime = averageQueueLength / arrivalRate;

  return {
    arrivalRate,
    serviceRate,
    utilization,
    averageQueueLength,
    averageWaitingTime,
  };
}

// M/G/1 Queue Model
function calculateMG1(serviceTimes) {

  const utilization = arrivalRate / serviceRate;

  // Estimate the second moment of service time for G/G/1 model
  const serviceTimeSquared = serviceTimes.map((time) => time * time);
  const secondMomentServiceTime =
    serviceTimeSquared.reduce((a, b) => a + b, 0) / serviceTimeSquared.length;

  // Calculate average queue length and waiting time for M/G/1 model
  const rhoSquared = utilization * utilization;
  const averageQueueLength = (rhoSquared + utilization) / (1 - utilization);
  const averageWaitingTime = averageQueueLength / arrivalRate + secondMomentServiceTime / (2 * serviceRate * (1 - utilization));

  return {
    arrivalRate,
    serviceRate,
    utilization,
    averageQueueLength,
    averageWaitingTime,
  };
}

// M/G/2 Queue Model
function calculateMG2(serviceTimes) {

  // Calculate utilization
  const utilization = arrivalRate / (2 * serviceRate);

  // Estimate the second moment of service time for G/G/2 model
  const serviceTimeSquared = serviceTimes.map((time) => time * time);
  const secondMomentServiceTime =
    serviceTimeSquared.reduce((a, b) => a + b, 0) / serviceTimeSquared.length;

  // Calculate average queue length and waiting time for M/G/2 model
  const rhoSquared = utilization * utilization;
  const averageQueueLength =
    (rhoSquared * (1 + utilization)) / (1 - utilization) +
    ((2 * utilization * utilization) / (1 - utilization)) *
    (1 + (rhoSquared * (1 + utilization)) / (1 - utilization));
  const averageWaitingTime = averageQueueLength / arrivalRate + secondMomentServiceTime / (2 * serviceRate * (1 - utilization));

  return {
    arrivalRate,
    serviceRate,
    utilization,
    averageQueueLength,
    averageWaitingTime,
  };
}

// G/G/1 Queue Model
function calculateGG1(serviceTimes) {

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
function calculateGG2(serviceTimes) {

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
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'mm1'
  document.getElementById("mm1").style.borderBottom = 'thin solid black'
  console.log('mm1')
})

document.getElementById('mm2').addEventListener('click', () => {
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'mm2'
  document.getElementById('mm2').style.borderBottom = 'thin solid black'
  console.log('mm2')
})

document.getElementById('mg1').addEventListener('click', () => {
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'mg1'
  document.getElementById("mg1").style.borderBottom = 'thin solid black'
  console.log('mg1')
})

document.getElementById('mg2').addEventListener('click', () => {
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'mg2'
  document.getElementById("mg2").style.borderBottom = 'thin solid black'
  console.log('mg2')
})

document.getElementById('gg1').addEventListener('click', () => {
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'gg1'
  document.getElementById("gg1").style.borderBottom = 'thin solid black'
  console.log('gg1')
})

document.getElementById('gg2').addEventListener('click', () => {
  document.getElementById(selectedModel).style.borderBottom = 'none'
  selectedModel = 'gg2'
  document.getElementById("gg2").style.borderBottom = 'thin solid black'
  console.log('gg2')
})

document.getElementById('mm1').click()

document.getElementById('calculate').addEventListener('click', () => {
  document.getElementById('arrival-rate').innerHTML = 'Arrival Rate : '
  document.getElementById('service-rate').innerHTML = 'Service Rate : '
  document.getElementById('Utilization').innerHTML = 'Utilization Rate : '
  document.getElementById('queue-length').innerHTML = 'AverageQueueLength : '
  document.getElementById('waiting-time').innerHTML = 'AverageWaitingTime : '
  let result;
  switch (selectedModel) {
    case 'mm1':
      result = calculateMM1();
      break;
    case 'mm2':
      result = calculateMM2();
      break;
    case 'mg1':
      result = calculateMG1(serviceTimes);
      break;
    case 'mg2':
      result = calculateMG2(serviceTimes);
      break;
    case 'gg1':
      result = calculateGG1(serviceTimes);
      break;
    case 'gg2':
      result = calculateGG2(serviceTimes);
      break;
  
    default:
      break;
  }
  document.getElementById('arrival-rate').innerHTML += result.arrivalRate.toFixed(2)
  document.getElementById('service-rate').innerHTML += result.serviceRate.toFixed(2)
  document.getElementById('Utilization').innerHTML += result.utilization.toFixed(2)
  document.getElementById('queue-length').innerHTML += result.averageQueueLength.toFixed(2)
  document.getElementById('waiting-time').innerHTML += result.averageWaitingTime.toFixed(2)

  console.log(selectedModel)
  
})

// Call the queuing model functions and display the results
// const mm1Results = calculateMM1(arrivalTimes, serviceTimes);
// console.log("M/M/1 Results:", mm1Results);

// const mm2Results = calculateMM2(arrivalTimes, serviceTimes);
// console.log("M/M/2 Results:", mm2Results);

// const mg1Results = calculateMG1(arrivalTimes, serviceTimes);
// console.log("M/G/1 Results:", mg1Results);

// const mg2Results = calculateMG2(arrivalTimes, serviceTimes);
// console.log("M/G/2 Results:", mg2Results);

// const gg1Results = calculateGG1(arrivalTimes, serviceTimes);
// console.log("G/G/1 Results:", gg1Results);

// const gg2Results = calculateGG2(arrivalTimes, serviceTimes);
// console.log("G/G/2 Results:", gg2Results);
