/**
 * Not finished
 */

const fs = require('fs');
const directionsArr = fs.readFileSync('input.txt').toString().split("\n");

let horizontal = 0;
let depth = 0;

directionsArr.forEach( command => {
    const commandArr = command.split(" ");
    switch(commandArr[0]) {
        case 'forward':
            horizontal += Number(commandArr[1]);
            console.log("forward: ", Number(commandArr[1]))
            break;
        case 'up':
            depth += Number(commandArr[1]);
            console.log("up: ", Number(commandArr[1]))
        case 'down':
            depth -= Number(commandArr[1]);
            console.log("down: ", Number(commandArr[1]))
            break;
    }
    console.log(horizontal + " " + depth)
})