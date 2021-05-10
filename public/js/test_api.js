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
let resolution = 2;

let deadColor
let aliveColor

let sketchCanvas

function setup() {
  // console.log("Startup Game Of Life")

  var width = windowWidth;
  var height = windowHeight;
  var sketchCanvas = createCanvas(width,height);
  sketchCanvas.id('TEST_API');
  // sketchCanvas.parent("GOL_Area")

  

  columns = floor(width / resolution);
  rows = floor(height / resolution);

  grid = makeDoubleArray(columns,rows)
  for(let i = 0; i < columns; i++){
  	for(let j = 0; j <rows; j++){
  		grid[i][j] = floor(random(2));
  	}
  }


aliveColor = (255,255,255);
deadColor  = (0,0,0);

console.log(sketchCanvas.width)
}

function draw() {

background(deadColor);
    
// console.log(Math.random())
}


