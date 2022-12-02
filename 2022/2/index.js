const fs = require('fs');
const firstArray = fs.readFileSync('input.txt').toString().split("\n").map(r=>r.split(/\s+/g));

const rpl = {"X":"A","Y":"B","Z":"C"}
let  trnslt = {"A":1,"B":2,"C":3}
const win = {"A":2,"B":3,"C":1}
const loose = {"A":3,"B":1,"C":2}

const secondArray = JSON.parse(JSON.stringify(firstArray))

const total = firstArray.map(r=>{
    r[1]=rpl[r[1]];
    g = r.map((e,i)=>e[i]=trnslt[e]);
    return (g[0] == g[1] ? 3 : g[0] == 1 && g[1] == 2 ? 6 : g[0] == 3 && g[1] == 1 ? 6 : g[0] == 2 && g[0] < g[1] ? 6 : 0) + g[1];
}).reduce((a,b)=>a+b, 0);

console.log(total) // Part 1

const newTotal = secondArray.map(r=>r[1] == "X" ? Number(loose[r[0]]) : r[1] == "Y" ? Number(trnslt[r[0]]) + 3 : r[1] == "Z" ? Number(win[r[0]]) + 6 : null).reduce((a,b)=>a+b, 0);

console.log(newTotal) // Part 2

