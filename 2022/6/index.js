const fs = require('fs');
const transmission = fs.readFileSync('input.txt').toString().match(/.{1}/g);

const getTransmission = (transmLenth) => {
    let markers = [];
    transmission.map( (_, i) => {
        if ( i > transmLenth - 1 ) {
            let isTransmission = [];
            for (let n = transmLenth; n > 0; n--) {
                isTransmission.push(transmission[i-n]);
            }
            dups = isTransmission.length !== new Set(isTransmission).size;
            dups === false ? markers.push(i) : null;
        }
    });
    return markers[0];
}

console.log("Part 1 first marker: ", getTransmission(4));
console.log("Part 2 first message: ", getTransmission(14));

