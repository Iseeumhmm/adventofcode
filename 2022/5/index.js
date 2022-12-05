const fs = require('fs');
const fullInput = fs.readFileSync('input.txt').toString().split("\n");

let cargoArr = fullInput.splice(0,8).map(row=>row.match(/.{1,4}/g).map(column=>column.replace(/[\[\]\s']+/g,'')));

// Create empty cargo array and fill it with the restructured data
let cargo = cargoArr[0].map(_=>[]);
cargoArr.forEach(row =>row.map((each, i)=>{
    if (each !== "") cargo[i].push(each)
}));

ptTwoCargo = JSON.parse(JSON.stringify(cargo));

let instructions = fullInput.splice(2, fullInput.length).map(row=>row.replace(/(move|from|to)/g,'').split(' ').filter(row=>row !== '').map(row=>Number(row)))

// Part 1
instructions.forEach( instruction => {
    for( let i = 0; i < instruction[0]; i++) {
        const craneLift = cargo[instruction[1]-1].shift();
        cargo[instruction[2]-1].unshift(craneLift);
    }
});

let topsOne = ""
cargo.forEach(column => topsOne += column[0])

// Part 2
instructions.forEach( instruction => {
    let craneLift = [];
    for( let i = 0; i < instruction[0]; i++) {
        craneLift.push(ptTwoCargo[instruction[1]-1].shift());
    }
    craneLift.reverse().forEach( lift => {
        ptTwoCargo[instruction[2]-1].unshift(lift);
    });
});

let topsTwo = ""
ptTwoCargo.forEach(column => topsTwo += column[0])

// Answers
console.log("CrateMover 9000: ", topsOne)
console.log("CrateMover 9001: ", topsTwo)


