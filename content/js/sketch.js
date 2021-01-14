function makeDoubleArray(columns, rows){
	let arr = new Array(columns);
	for(let i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}



function startCreature(){
  var creature = new Array(1);
  creature[0] = new Array(3);

  //Array goes x, y, food, ]
  creature[0][0] = columns/2;
  creature[0][1] = rows/2;
  creature[0][2] = 5;
  creature[0][3] = 175;
  creature[0][4] = 175;
  creature[0][5] = 175;
  return creature;
}


let columns;
let rows;
let resolution = 10;

let creature;
let grid;
let next;


function setup() {
  createCanvas(1000,500);

  columns = width / resolution;
  rows = height / resolution;


 
 creature = startCreature();

  grid = makeDoubleArray(columns,rows)
  for(let i = 0; i < columns; i++){
  	for(let j = 0; j < rows; j++){
      
      if(i == 0 || i == columns-1 || j == 0 || j == rows-1){
        grid[i][j] = 5;
        }

        else{
      let food = 0;
      let foodTest = 0;
  		
          foodTest= floor(random(2));
          if(foodTest == 1){
              food += floor(random(2));
              food += floor(random(2));
              food += floor(random(2));
          }
        grid[i][j] = food;
        }

  	
    }
  }
}





function draw() {

background(0);

drawMap(grid);

let next = makeDoubleArray(columns, rows);
next = grid;

//Compute Next grid based on previous grid//
//Move Goldfish
for(c = 0; c < creature.length; c++ ){

creature[c] = move(creature[c]);
drawMove(creature[c]);

if(creature[c][2]>=30){
    creature[c][2] = 0;
    creature[creature.length] = Array(creature[c][0], creature[c][1], 0, /*Colors*/ creature[c][3], creature[c][4], creature[c][5],);

    let rgb = floor(random(3));
    let changeVar = (floor(random(100)) - 50);
    if(rgb == 0){
      creature[c][3] = creature[c][3] + changeVar;
    }
    else if(rgb == 1){
      creature[c][4] = creature[c][4] + changeVar;
    }
    else if(rgb == 2){
      creature[c][5] = creature[c][5] + changeVar;
    }


  }

}
 grid = next;
}






function move(specCreature){
let i = specCreature[0];
let j = specCreature[1];

let direction = floor(random(4));
if(direction == 0 && (grid[i][j-1]) != 5){//UP
  specCreature[1] -= 1;
  specCreature[2] += grid[i][j-1];
  grid[i][j-1] = 0;
}

if(direction == 1 && (grid[i][j+1]) != 5){//DOWN
  specCreature[1] += 1;
  specCreature[2] += grid[i][j+1];
  grid[i][j+1] = 0;
}

if(direction == 2 && (grid[i+1][j]) != 5){//RIGHT
  specCreature[0] += 1;  
  specCreature[2] += grid[i+1][j];
  grid[i+1][j] = 0;
}

if(direction == 3 && (grid[i-1][j]) != 5){//LEFT
  specCreature[0] -= 1;
  specCreature[2] += grid[i-1][j];
  grid[i-1][j] = 0;
}
return(specCreature);
}

function drawMove(specCreature){
      let x = specCreature[0] * resolution;
      let y = specCreature[1] * resolution;

      fill(color(specCreature[3], specCreature[4], specCreature[5]));

      stroke(0);
      rect(x, y, resolution - 1, resolution - 1);
}

function drawMap(grid){
  for(let i = 0; i < columns; i++){
    for(let j = 0; j <rows; j++){
      let x = i * resolution;
      let y = j * resolution;

        if(grid[i][j] == 5){
          fill(125);
         stroke(125);
         rect(x, y, resolution - 1, resolution - 1)
        }
        else if(grid[i][j] > 0 && grid[i][j] <5){
          let foodDensityShade = grid[i][j] * 50;
          fill(foodDensityShade);
          stroke(0);
         rect(x, y, resolution - 1, resolution - 1)
        }
      }
    }
}