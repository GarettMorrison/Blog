function makeDoubleArray(columns, rows){
	let arr = new Array(columns);
	for(let i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

let columns;
let rows;
let grid;
let resolution = 5;

let deadColor
let aliveColor


function setup() {
  console.log("Startup Game Of Life")

  var width = windowWidth;
  var height = windowHeight;
  var sketchCanvas = createCanvas(width,height);
  // sketchCanvas.parent("GOL_Area")

  

  columns = floor(width / resolution);
  rows = floor(height / resolution);

  grid = makeDoubleArray(columns,rows)
  for(let i = 0; i < columns; i++){
  	for(let j = 0; j <rows; j++){
  		grid[i][j] = floor(random(2));
  	}
  }





 
 aliveColor = "#fafafa";
 deadColor = "#fff";

 aliveColor = "#1b1c1d";
 deadColor = "#232425";


// element = document.querySelector('.header')
// style = getComputedStyle(element)
// deadColor = style.backgroundColor //the RGB value

 // deadColor = document.querySelector("header").style;

 // console.log("sectHeader: " + str(deadColor));


// element = document.querySelector('@mediaf')
// style = getComputedStyle(element)
// aliveColor = style.backgroundColor //the RGB value

 // aliveColor = document.getElementById("sectMain").style.color
  // aliveColor = document.body;

 // console.log("sectMain: " + str(aliveColor));
 // console.log(aliveColor);

  // const metas = document.getElementsByTagName('meta');

  // for (let i = 0; i < metas.length; i++) {
  //   if (metas[i].getAttribute('name') === "theme-color"){
  //     console.log(metas[i])
  //     console.log(metas[i].getAttribute('name'))
  //     console.log(metas[i].getAttribute('content'));
  //   }
  // }

  para = document.getElementsByClassName("header")[0];
  element = window.getComputedStyle(para);
  aliveColor = element.backgroundColor;

  para = document.getElementsByTagName("body")[0];
  element = window.getComputedStyle(para);
  deadColor = element.backgroundColor;

  console.log("deadColor " + str(deadColor));
  console.log("aliveColor " + str(aliveColor));


}

function draw() {
background(deadColor);
    
for(let i = 0; i < columns; i++){
  	for(let j = 0; j <rows; j++){
  		let x = i * resolution;
  		let y = j * resolution;
  		if(grid[i][j] == 1){
  			fill(aliveColor);
  			stroke(aliveColor);
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