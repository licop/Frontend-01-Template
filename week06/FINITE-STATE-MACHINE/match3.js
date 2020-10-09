function match(string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;

    for(let s of string) {
        if(s === 'a') {
            foundA = true;
        } else if(foundA && s === 'b') {
            foundB = true;
        } else if(foundB && s === 'c') {
            foundC = true;
        } else if(foundC && s === 'd') {
            foundD = true;
        } else if(foundD && s === 'e') {
            foundE = true;
        } else if(foundE && s === 'f') {
            return true;
        } else {
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
        }
    }
    return false;
}

console.log(match('I abm groot'));