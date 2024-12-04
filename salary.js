const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function NetSalary(basicSalary, benefits) {
  const taxBrackets = [
    { upperLimit: 24000, rate: 0.1 },
    { upperLimit: 32333, rate: 0.25 },
    { upperLimit: Infinity, rate: 0.3 }
  ];

  const nhifRates = [
    { upperLimit: 5999, rate: 150 },
    { upperLimit: 7999, rate: 300 },
    { upperLimit: 11999, rate: 400 },
    { upperLimit: 14999, rate: 500 },
    { upperLimit: 19999, rate: 600 },
    { upperLimit: 24999, rate: 750 },
    { upperLimit: 29999, rate: 850 },
    { upperLimit: 34999, rate: 900 },
    { upperLimit: 39999, rate: 950 },
    { upperLimit: Infinity, rate: 1000 }
  ];

  const nssfDeduction = Math.min(basicSalary * 0.06, 1080);
  const grossSalary = basicSalary + benefits;

  let remainingIncome = grossSalary;
  let payee = 0;
  for (let bracket of taxBrackets) {
    const taxableAmount = Math.min(remainingIncome, bracket.upperLimit);
    payee += taxableAmount * bracket.rate;
    remainingIncome -= taxableAmount;
    if (remainingIncome <= 0) break;
  }

  let nhifDeduction = 0;
  for (let rate of nhifRates) {
    if (grossSalary <= rate.upperLimit) {
      nhifDeduction = rate.rate;
      break;
    }
  }

  const netSalary = grossSalary - (payee + nhifDeduction + nssfDeduction);

  return {
    grossSalary: grossSalary.toFixed(2),
    payee: payee.toFixed(2),
    nhifDeduction: nhifDeduction.toFixed(2),
    nssfDeduction: nssfDeduction.toFixed(2),
    netSalary: netSalary.toFixed(2)
  };
}

rl.question('Enter your basic salary: ', (basicSalaryInput) => {
  const basicSalary = parseFloat(basicSalaryInput);

  rl.question('Enter your benefits: ', (benefitsInput) => {
    const benefits = parseFloat(benefitsInput);

    if (isNaN(basicSalary) || isNaN(benefits)) {
      console.log("Invalid input. Please enter numeric values.");
    } else {
      const salaryDetails = NetSalary(basicSalary, benefits);

      console.log(
        `Salary Breakdown:\n` +
        `Gross Salary: KES ${salaryDetails.grossSalary}\n` +
        `PAYEE (Tax): KES ${salaryDetails.payee}\n` +
        `NHIF Deduction: KES ${salaryDetails.nhifDeduction}\n` +
        `NSSF Deduction: KES ${salaryDetails.nssfDeduction}\n` +
        `Net Salary: KES ${salaryDetails.netSalary}`
      );
    }

    rl.close(); 
  });
});
