// Assuming you have the arrival time and service time data available in separate arrays
const arrivalTimes = [9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
const serviceTimes = [10, 8, 12, 10, 9, 7, 11, 10, 8, 9, 5];

// Step 2: Chi-Square Testing
// Divide the arrival time and service time data into appropriate intervals or categories
// You can use a function to define the intervals based on your specific requirements
function createIntervals(data, intervalSize) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const numIntervals = Math.ceil((max - min) / intervalSize);
  const intervals = [];

  for (let i = 0; i < numIntervals; i++) {
    const lowerBound = min + i * intervalSize;
    const upperBound = min + (i + 1) * intervalSize;
    intervals.push({ lowerBound, upperBound });
  }

  return intervals;
}

// Define the interval size for dividing the data
const intervalSize = 2;

// Divide the arrival time and service time data into intervals
const arrivalTimeIntervals = createIntervals(arrivalTimes, intervalSize);
const serviceTimeIntervals = createIntervals(serviceTimes, intervalSize);

// Calculate the observed frequencies for each interval
function calculateObservedFrequencies(data, intervals) {
  const observedFrequencies = new Array(intervals.length).fill(0);

  data.forEach((value) => {
    for (let i = 0; i < intervals.length; i++) {
      const { lowerBound, upperBound } = intervals[i];
      if (value >= lowerBound && value < upperBound) {
        observedFrequencies[i]++;
        break;
      }
    }
  });

  return observedFrequencies;
}

// Calculate the observed frequencies for arrival time and service time data
const observedArrivalTimeFrequencies = calculateObservedFrequencies(arrivalTimes, arrivalTimeIntervals);
const observedServiceTimeFrequencies = calculateObservedFrequencies(serviceTimes, serviceTimeIntervals);

// Define the expected frequencies based on a theoretical distribution (e.g., uniform distribution)
// You can choose the appropriate distribution based on your requirements and assumptions

const expectedArrivalTimeFrequencies = [6, 4, 8, 12, 10, 14, 8, 6, 7, 11];
const expectedServiceTimeFrequencies = [6, 5, 4, 7, 1, 5, 7, 9, 11, 2];

// Perform the chi-square test using the observed and expected frequencies
// You can use a library like math.js or write your own chi-square test function

function chiSquareTest(observed, expected) {
    // Check if the observed and expected arrays have the same length
    if (observed.length !== expected.length) {
      throw new Error("Observed and expected arrays must have the same length");
    }
  
    // Calculate the chi-square statistic
    let chiSquare = 0;
    for (let i = 0; i < observed.length; i++) {
      const O = observed[i];
      const E = expected[i];
      chiSquare += Math.pow(O - E, 2) / E;
    }
  
    // Calculate the degrees of freedom
    const degreesOfFreedom = observed.length - 1;
  
    // Calculate the p-value
    const pValue = 1 - getPValueFromChiSquare(chiSquare, degreesOfFreedom);
  
    // Return the chi-square statistic and p-value
    return {
      statistic: chiSquare,
      pValue: pValue
    };
  }
  
  function getPValueFromChiSquare(chiSquare, degreesOfFreedom) {
    // Use an approximation formula to calculate the p-value
    const gamma = math.gamma;
    const pValue = gamma.incomplete(0.5 * degreesOfFreedom, 0.5 * chiSquare);
    return pValue;
  }
  
const result = chiSquareTest(observedArrivalTimeFrequencies, expectedArrivalTimeFrequencies);
  
// Interpret and display the results graphically
console.log("Chi-square statistic:", result.statistic);
console.log("P-value:", result.pValue);

// Create a function to display a bar plot
function displayChiBarPlot(data, labels, title) {
  const ctx = document.getElementById(title).getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Observed",
          data: data.observed,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expected",
          data: data.expected,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Frequencies",
          },
        },
        x: {
          title: {
            display: true,
            text: "Intervals",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: title,
          font: { weight: "bold" },
        },
      },
    },
  });
}

// Display the bar plot for arrival time frequencies
displayChiBarPlot(
  {
    observed: observedArrivalTimeFrequencies,
    expected: expectedArrivalTimeFrequencies,
  },
  ["Interval 1", "Interval 2", "Interval 3", "Interval 4"],
  "Arrival Time Chi-Square Test"
);

// Display the bar plot for service time frequencies
displayChiBarPlot(
  {
    observed: observedServiceTimeFrequencies,
    expected: expectedServiceTimeFrequencies,
  },
  ["Interval 1", "Interval 2", "Interval 3", "Interval 4"],
  "Service Time Chi-Square Test"
);
