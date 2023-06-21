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
  
  function simulateMM1(arrivalRate, serviceRate, n) {
    let arrivalTime = 0;
    let startTime = 0;
    let endTime = 0;
    let serviceTime = 0;
    let turnAroundTime = 0;
    let waitTime = 0;
    let responseTime = 0;
    let serverUtilization = 0;
    
    console.log("Arrival Time\tStart Time\tEnd Time\tService Time\tTurnaround Time\tWait Time\tResponse Time");
    
    for (let i = 0; i < n; i++) {
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
      
      console.log(
        `${arrival.toFixed(2)}\t\t${startTime.toFixed(2)}\t\t${endTime.toFixed(2)}\t\t${serviceTime.toFixed(2)}\t\t${turnAroundTime.toFixed(2)}\t\t${waitTime.toFixed(2)}\t\t${responseTime.toFixed(2)}`
      );
    }
    
    serverUtilization = serverUtilization / n;
    console.log("\nServer Utilization Rate:", serverUtilization.toFixed(2));
  }
  
  // Example usage
  const arrivalRate = 2.15; // Average number of arrivals per unit time
  const serviceRate = 1.58; // Average number of services per unit time
  const numberOfEvents = 10; // Number of arrivals to simulate
  
  simulateMM1(arrivalRate, serviceRate, numberOfEvents);
  