function simulateMM1Queue(lambda, mu, totalCustomers) {
    const arrivalTimes = [];
    const serviceTimes = [];
  
    let currentTime = 0;
    let customersServed = 0;
    let totalWaitingTime = 0;
  
    function generateRandomExponential(rate) {
      return -Math.log(1 - Math.random()) / rate;
    }
  
    while (customersServed < totalCustomers) {
      const nextArrivalTime = generateRandomExponential(lambda);
      const nextServiceTime = generateRandomExponential(mu);
  
      const arrivalTime = currentTime + nextArrivalTime;
  
      if (customersServed === 0 || arrivalTime < serviceTimes[0]) {
        // Arrival event
        currentTime = arrivalTime;
        arrivalTimes.push(currentTime);
        serviceTimes.push(currentTime + nextServiceTime);
  
        customersServed++;
      } else {
        // Departure event
        const departureTime = serviceTimes.shift();
        totalWaitingTime += departureTime - arrivalTimes.shift();
      }
    }
  
    const avgWaitingTime = totalWaitingTime / totalCustomers;
    const avgServiceTime = serviceTimes.reduce((acc, time) => acc + time, 0) / totalCustomers;
  
    console.log("Simulation Results:");
    console.log("-------------------");
    console.log(`Average Waiting Time: ${avgWaitingTime.toFixed(2)} seconds`);
    console.log(`Average Service Time: ${avgServiceTime.toFixed(2)} seconds`);
  }
  
  // Example usage
  const lambda = 0.2; // Arrival rate: 0.2 customers per second
  const mu = 0.4; // Service rate: 0.4 customers per second
  const totalCustomers = 10; // Total number of customers to simulate
  
  simulateMM1Queue(lambda, mu, totalCustomers);