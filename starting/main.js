const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {
        this.field = field;
    }

    print() {
        for (let i = 0 ; i < this.field.length ; i++) {
            let word = this.field[i][0];
            for (let j = 1 ; j < this.field[i].length ; j++) {
                word += this.field[i][j];
            };
            console.log(word); 
        }
    }

    currentPosition() {
        let x = 0;
        let y = 0;
        let currentPosition = this.field[y][x];
        while (currentPosition !== '*') {
            x++;
            if (x >= this.field[y].length) {
                x = 0;
                y++;
            }
            currentPosition = this.field[y][x];
        }
        return [x, y] 
    }

    move() {
        this.print();
        let x = this.currentPosition()[0];
        let y = this.currentPosition()[1];
        let incorrectPosition = false;
        let newPosition;
        while (!incorrectPosition) {
            let move = prompt('Which way do you want to move ? Press 4 for left, 6 for right, 8 for up or 2 for down : ');
            if (move === '4'){
                x = x-1;
            } else if (move === '6'){
                x = x+1;
            } else if (move === '8'){
                y = y-1;
            } else if (move === '2'){
                y = y+1;
            } else {
                console.log('please enter a correct move');
                continue;}
            if (x < 0 || y < 0 || x > this.field[y].length || y >= this.field.length){
                console.log("You went out of the field ! You lose :-( ");
                incorrectPosition = true;
                continue;
            }
            newPosition = this.field[y][x];
            if (newPosition === hat) {
                console.log('You found your hat ! You win !');
                incorrectPosition = true;
            } else if (newPosition === hole) {
                console.log('You fell in a hole !');
                incorrectPosition = true;
            } else {
                this.field[y][x] = '*';
                this.print();
                }

        }
        
    }

    generateField(width=40, height=10, percentage=80) {
        let newField = [];
        for (let i = 0 ; i < height ; i++) {
            let newLine = [];
            for (let j = 0 ; j < width ; j++){
                let randomNum = Math.random();
                let newSquare;
                if (randomNum < percentage/100){
                    newSquare = fieldCharacter;
                } else {newSquare = hole;}
                newLine.push(newSquare);                 
            }
            newField.push(newLine);
        }
        let x1 = Math.floor(Math.random()*width);
        let x2 = Math.floor(Math.random()*width);
        let y1 = Math.floor(Math.random()*height);
        let y2 = Math.floor(Math.random()*height);
        while (x1 === x2 && y1 === y2) {
            x1 = Math.floor(Math.random()*width);
            x2 = Math.floor(Math.random()*width);
            y1 = Math.floor(Math.random()*height);
            y2 = Math.floor(Math.random()*height);
        }
        newField[y1][x1] = pathCharacter;
        newField[y2][x2] = hat;        
        this.field = newField;
        //this.print()

    }

};




const myField = new Field([
    ['░', '*', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
])
;


myField.generateField(60,10,80);
myField.move();


