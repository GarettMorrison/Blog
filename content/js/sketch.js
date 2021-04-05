function makeDoubleArray(columns, rows){
  console.log(columns)
	let arr = new Array(columns);
	for(let i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

let columns;
let rows;
let grid;
let resolution = 10;




function setup() {
  console.log("Startup Game Of Life")

  width = floor(windowWidth);
  height = floor(windowHeight)
  createCanvas(width, height);  
  

  columns = floor(width / resolution);
  rows = floor(height / resolution);

  grid = makeDoubleArray(columns,rows)
  for(let i = 0; i < columns; i++){
  	for(let j = 0; j <rows; j++){
  		grid[i][j] = floor(random(2));
  	}
  }
}

function draw() {
background("#232425");

for(let i = 0; i < columns; i++){
  	for(let j = 0; j <rows; j++){
  		let x = i * resolution;
  		let y = j * resolution;
  		if(grid[i][j] == 1){
        c = color("#1b1c1d")
  			fill(c);
  			stroke(c);
  			rect(x, y, resolution - 1, resolution - 1)
  			}
    	}
  	}


let next = makeDoubleArray(columns, rows);

//Compute Next grid based on previous grid//
  for(let i = 0; i < columns; i++){
  	for(let j = 0; j < rows; j++){
  		let current = grid[i][j];
  		//Count neighbors
  		let sum = 0;

  		let neighbors = neighborCount(grid, i, j);
  		if(current == 0 && neighbors == 3){
  			next[i][j] = 1;
  			}
  		else if(current == 1 && (neighbors > 3 || neighbors < 2)){
  			next[i][j] = 0;
  			}
  		else{
  			next[i][j] = current;
  		}

  	}
  }
grid = next;
}



function neighborCount(grid, x, y){
  		let sum = 0;
  		for(let i = -1; i<2; i++){
  			for(let j = -1; j<2; j++){

  				let col = (x + i + columns) % columns;
  				let row = (y + j + rows) % rows;

  				sum += grid[col][row];
  			}
  		}
  	sum -= grid[x][y];
  	return sum;
}