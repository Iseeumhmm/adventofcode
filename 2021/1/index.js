const fs = require('fs');
const numbersArr = fs.readFileSync('input.txt').toString().split("\n").map(Number);

let increased = 0;

/** Part 1 */
numbersArr.forEach( (each, i) => {
    if (typeof numbersArr[i + 1] !== 'undefined' && numbersArr[i + 1] > each) {
        increased++
    }
});

// Result 1
console.log(increased)

increased = 0;

/** Part 2 */
numbersArr.forEach( (_, numIndex) => {
    const windows = [0,1].map((windowIndex)=> {
        let window = 0;
        for ( let n = 0; n < 3; n++ ) {
            window += numbersArr[ numIndex + n + windowIndex];
        }
        return window
    });
    if (!isNaN(windows[1])) {
        increased += windows[0] < windows[1] ? 1 : 0;
    }
    
});

// Result 2
console.log(increased)