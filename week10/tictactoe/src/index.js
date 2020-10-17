// 二维数组
let pattern = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]
// // 一维数组
// let  pattern1 = [1, 0, 0, 0, 0];
let color = 1;
function show() {
    let board = document.getElementById('board');
    board.innerHTML = '';
    
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');

            cell.innerHTML = pattern[i][j] === 2 ? '❌' : 
            pattern[i][j] === 1 ? "⭕️" : "";
            
            cell.addEventListener('click', () => move(j, i));      
            
            board.appendChild(cell);
        }
    }
}

function move(x, y) {
    if(pattern[y][x] !== 0) 
        return;
    pattern[y][x] = color;
    if(checkWin(pattern, color)) {
        console.log(color === 1 ? '⭕️ win' : '❌ win');
    }
    
    color = 3 - color;
    show();    
    
    if(willWin(pattern, color)) {
        console.log(color === 1 ? '⭕️ will win' : '❌ will win');
    }
}

function clone(pattern) {
    return JSON.parse(JSON.stringify(pattern));
}

/**
 * 判断是否要赢
 * @param {*} pattern 
 * @param {*} color 
 */
function willWin(pattern, color) {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(pattern[i][j] !== 0) 
                continue;                
            let tmp = clone(pattern);
            tmp[i][j] = color;
            if(checkWin(tmp, color)) {
                return [j, i];
            }            
        }
    }
    
    return null;
}

// 最好的选择
function bestChoice(pattern, color) {
    let point = willWin(pattern, color);
    if(point) {
        return {
            point: point,
            result: 1
        }
    }
    
    let result = -1;
    
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(pattern[i][j] !== 0) 
                continue;  
            let tmp = clone(pattern);
            tmp[i][j] = color;
            let opp = bestChoice(tmp, 3 - color)
            
            if(-opp.result >= result) {
                point = [j, i];
                result = -opp.result;
            }

        }
    }
    
    return {
        point: point,
        result: point ? result : 0
    }
}

function checkWin(pattern, color) {
    for(let i = 0; i < 3; i++) {
        let win = true
        for(let j = 0; j < 3; j++) {
            if(pattern[i][j] !== color) {
                win = false;
                break;
            }
        }
        if(win) {return true};      
    }
    
    for(let i = 0; i < 3; i++) {
        let win = true
        for(let j = 0; j < 3; j++) {
            if(pattern[j][i] !== color) {
                win = false;
                break;
            }
        }
        if(win) {return true};      
    }

    {
        let win = true
        for(let i = 0; i < 3; i++) {
            if(pattern[i][i] !== color) {
                win = false;
                break;
            }
        }
        if(win) {return true}; 
    }

    {
        let win = true
        for(let i = 0; i < 3; i++) {
            if(pattern[i][2 - i] !== color) {
                win = false;
                break;
            }
        }
        if(win) {return true}; 
    }
}

show();
