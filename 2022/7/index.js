const fs = require('fs');
const consoleInputs = fs.readFileSync('input.txt').toString().split("\n").map(e=>e.replace(/(\$|\s)/g,'','')).map(e=>e.match(/[0-9]+/g)?e.match(/[0-9]+/g)[0]:e)

let totals = []
let path = []
consoleInputs.forEach( item => {
    if (item.match(/cd+/g)) {
         if (item.match(/\.\.+/g)) {
            path.pop()
         } else {
            path.push(item)
         }
    } else if (!item.match(/(ls|dir)+/g)) {
       path.forEach(each=>totals.push([each,Number(item)]))
    }
})

let keysUsed = []
let dirFiles = []
totals.forEach(total=>{
    let key = total[0]
    if (!keysUsed.some(k=>k===key)) {
        keysUsed.push(key)
        dirFiles.push(totals.filter((tot=>tot[0]===key)))
    }
})

let tots = []
const directoryTotals = (dir) => {
    key = dir[0][0]
    t = dir.map(e=>e[1]).reduce((a,b)=>a+b)
    console.log ({[key]: t})
    tots.push(t)
}

console.log("Directory Files: \n")
console.log(dirFiles)

console.log("\Directory Totals: \n")
dirFiles.forEach(e=>directoryTotals(e))

console.log("\nTotal: ",tots.filter(t=>t<=100000).reduce((a,b)=>a+b))




