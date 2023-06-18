// Step 2: Chi-Square Testing

const distributions = ['poisson', 'exponential', 'uniform', 'normal']

const ObservedarrivalTimes = [9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
const ObservedserviceTimes = [10, 8, 12, 10, 9, 7, 11, 10, 8, 9, 5];

// Define the expected frequencies based on a theoretical distribution (e.g., uniform distribution)
// You can choose the appropriate distribution based on your requirements and assumptions

const expectedArrivalTimeFrequencies = [6, 4, 8, 12, 10, 14, 8, 6, 7, 11];
const expectedServiceTimeFrequencies = [6, 5, 4, 7, 1, 5, 7, 9, 11, 2, 9];

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
    const gamma = function(n) {
      if (n === 1) return 1;
      return (n - 1) * gamma(n - 1);
    };
  
    // Calculate the p-value using the chi-square distribution approximation
    const pValue = 1 - chiSquareCDF(chiSquare, degreesOfFreedom);
  
    return pValue;
  }
  
  function chiSquareCDF(x, k) {
    if (k <= 0 || x < 0) return NaN;
  
    let term = Math.exp(-0.5 * x);
    let sum = term;
    let i = 1;
  
    while (i < k / 2) {
      term *= x / (2 * i);
      sum += term;
      i++;
    }
  
    return sum;
  }
  
const result = chiSquareTest(ObservedarrivalTimes, expectedArrivalTimeFrequencies);
  
// Interpret and display the results graphically
document.getElementById('chi-test').innerHTML += result.statistic.toFixed(2)
document.getElementById('p-value').innerHTML += result.pValue.toFixed(2)
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
    observed: ObservedarrivalTimes,
    expected: expectedArrivalTimeFrequencies,
  },
  ["Interval 1", "Interval 2", "Interval 3", "Interval 4"],
  "Arrival Time Chi-Square Test"
);

// Display the bar plot for service time frequencies
displayChiBarPlot(
  {
    observed: ObservedserviceTimes,
    expected: expectedServiceTimeFrequencies,
  },
  ["Interval 1", "Interval 2", "Interval 3", "Interval 4"],
  "Service Time Chi-Square Test"
);
