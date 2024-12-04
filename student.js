const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

function grades (marks) {
    if (marks > 79) {
        return 'A';
    }
    else if (marks >= 60 && marks <= 79){
        return 'B';
    }
    else if (marks >= 50 && marks <= 69){
        return 'C';
    }
    else if (marks >= 40 && marks <= 49){
        return 'D';
    }
    else {
        return 'E'
    }
}

rl.question('Enter student marks : ', 
    (input) => {
    const marks = parseInt(input, 10);

if (isNaN(marks) || marks < 0 || marks> 100) {
    console.log('Invalid input.');
}
else {
    const grd = grades(marks);
    console.log(`The grade for the marks ${marks} is ${grd}`);
}
rl.close();
});

