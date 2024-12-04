const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});
function carSpeed (speed) {
    const speedLimit = 70;
    const demeritInterval = 5;
    const suspension = 12;

    if (speed < speedLimit) {
        console.log("Ok");    }
        else {
            const demeritPoints = Math.floor((speed-speedLimit) / demeritInterval);
            console.log(`points:${demeritPoints}`);
            if (demeritPoints > suspension){
                console.log("License suspended");
            
            }

        }
}

rl.question('Enter the car speed : ', 
    (input) => {
    const speed = parseInt(input, 10);
    if (!isNaN(speed)) {
        carSpeed(speed);
    }
    else {
        console.log("Please enter a valid number.");
    }
    rl.close();
});