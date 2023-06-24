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

function simulateMM2Queue(n, arrivalRate, serviceRate) {
  
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

  console.log("ArrivalTime\tServiceTime\tStartTime\tEndTime\tServer\tTurnaroundTime\twaitTime\tResponseTime");

  // Initialize variables for the two servers
  let server1EndTime = 0;
  let server2EndTime = 0;
  let server1StartTime = 0;
  let server2StartTime = 0;
  let server = ''

  // Simulate the queue
  for (let i = 0; i < n; i++) {
    const interArrivalTime = poissonDistribution(arrivalRate)
    const arrival = arrivalTime + interArrivalTime;
    const serviceTime = exponentialDistribution(serviceRate);
    totalServiceTime += serviceTime

    arrivalTime = arrival;


    if(server1EndTime <= arrivalTime){
      startTime = arrivalTime
      server1StartTime = arrivalTime
      server1EndTime = arrivalTime + serviceTime
      endTime = server1EndTime
      turnaroundTime = server1EndTime - server1StartTime;
      waitTime = server1StartTime - arrivalTime;
      server = 'S1'
      server1Utilization += endTime - startTime
    }
    else if(server2EndTime <= arrivalTime){
      server2StartTime = arrivalTime
      startTime = arrivalTime
      server2EndTime =  arrivalTime + serviceTime
      endTime = server2EndTime
      turnaroundTime = server2EndTime - arrivalTime;
      waitTime = server2StartTime - arrivalTime;
      server = 'S2'
      server2Utilization += endTime - startTime
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
        server1Utilization += endTime - startTime
      }
      else{
        server2StartTime = server2EndTime
        startTime = server2StartTime
        server2EndTime =  server2EndTime + serviceTime
        endTime = server2EndTime
        turnaroundTime = server2EndTime - server2StartTime;
        waitTime = server2StartTime - arrivalTime;
        server = 'S2'
        server2Utilization += endTime - startTime
      }
    }
    responseTime = waitTime + serviceTime;

    console.log(
      `${arrivalTime.toFixed(2)}\t\t${serviceTime.toFixed(2)}\t\t${startTime.toFixed(2)}\t\t${endTime.toFixed(2)}\t\t${server}\t\t${turnaroundTime.toFixed(2)}\t\t${waitTime.toFixed(2)}\t\t${responseTime.toFixed(2)}\t`);

  }
  serverUtilization = ((server1Utilization + server2Utilization)/totalServiceTime)*100;
  
  console.log("Server Utilization: " + serverUtilization.toFixed(0) + "%")

}

// Example usage
const n = 8; // Number of arrivals
const arrivalRate = 2.15; // Arrival rate (lambda)
const serviceRate = 1.58; // Service rate (mu)

const simulationResults = simulateMM2Queue(n, arrivalRate, serviceRate);
console.log(simulationResults);