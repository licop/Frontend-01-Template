function match(string) {
    let foundA = false
    for(let s of string) {
        if(s === 'a') {
            foundA = true
        } else if(foundA && s === 'b') {
            return true
        } else {
            foundA = false
        }
    }
    return false
}

console.log(match('I abm groot'));