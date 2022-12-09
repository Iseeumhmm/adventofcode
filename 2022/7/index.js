const fs = require('fs');
const file = fs.readFileSync('input.txt').toString().split("\n")

let dirs = {"/":{ parent: "", files: [], dirs: [] }}
let currentDir = ""

const isRoot = dir => dir === "/" ? dir : dir + "/"

file.forEach(line => {
    let cmd = line.split(" ")
    if (line.startsWith("$")) {
        if (cmd[1] === "cd") {
            if (cmd[2] === "/"){
                currentDir = "/"
            }
            else if(cmd[2] === ".."){
                let paths = currentDir.split("/")
                currentDir = paths.slice(0, paths.length - 1).join('/');
            } else {
                currentDir = isRoot(currentDir) + cmd[2]
            }
        }
    } else {
        if (cmd[0] == 'dir') {
            let newDir = isRoot(currentDir) + cmd[1];
            dirs[newDir] = {
                parent: currentDir,
                files: [],
                dirs: []
            }
            dirs[currentDir].dirs.push(newDir)
        } else {
            dirs[currentDir].files.push({file: cmd[1], size: parseInt(cmd[0])})
        }
    }
})

let calcTotalSize = dir => {
    return dirs[dir].files.reduce((tot, file) => tot + file.size, 0) +
            dirs[dir].dirs.reduce((tot, child) => tot + calcTotalSize(child), 0);
}

let partOneTotal = Object.keys(dirs).reduce((tot, key) => {
    let total = calcTotalSize(key);
    if (total <= 100000) tot += total;
    return tot;
}, 0)

let allDirSizes = Object.keys(dirs).map( d => {
    return calcTotalSize(d)
})

let spaceNeeded = 30000000 - (70000000 - calcTotalSize('/'));

let sortedSizes = allDirSizes.sort((a,b)=>a+b).filter((a,b)=>a>spaceNeeded)

console.log("Sum of directories under 100000", partOneTotal)
console.log("Dir to delete to make space for update: ", Math.min(...sortedSizes))
