const fs = require('fs');
const numbersArr = fs.readFileSync('input.txt').toString().split("\n").map(Number);

/** Part 1 */

let elves = [];
let elfCaleries = 0;

numbersArr.forEach(calories => {

    if (calories > 0) {
        elfCaleries += calories;
    } else {
        elves.push(elfCaleries);
        elfCaleries = 0;
    }

});

// calories top elf is carrying 
console.log(Math.max(...elves));

/** Part 2 */

let sum = 0;

[1,2,3].forEach( _ => {
    const topElf = Math.max(...elves);
    elves = elves.filter(e => e !== topElf);
    sum += topElf;
});

// sum of calories top 3 elves are carrying
console.log(sum)

