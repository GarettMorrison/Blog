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

let headerColor
let bodyColor


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





 
 bodyColor = "#fafafa";
 headerColor = "#fff";

 bodyColor = "#1b1c1d";
 headerColor = "#232425";

 console.log(document.body.background)

// element = document.querySelector('.header')
// style = getComputedStyle(element)
// headerColor = style.backgroundColor //the RGB value

 // headerColor = document.querySelector("header").style;

 // console.log("sectHeader: " + str(headerColor));


// element = document.querySelector('@mediaf')
// style = getComputedStyle(element)
// bodyColor = style.backgroundColor //the RGB value

 // bodyColor = document.getElementById("sectMain").style.color
  // bodyColor = document.body;

 // console.log("sectMain: " + str(bodyColor));
 // console.log(bodyColor);

  // const metas = document.getElementsByTagName('meta');

  // for (let i = 0; i < metas.length; i++) {
  //   if (metas[i].getAttribute('name') === "theme-color"){
  //     console.log(metas[i])
  //     console.log(metas[i].getAttribute('name'))
  //     console.log(metas[i].getAttribute('content'));
  //   }
  // }

  element = document.querySelector("h1")
  console.log(element.style)


}

function draw() {
background(headerColor);
    
for(let i = 0; i < columns; i++){
  	for(let j = 0; j <rows; j++){
  		let x = i * resolution;
  		let y = j * resolution;
  		if(grid[i][j] == 1){
  			fill(bodyColor);
  			stroke(bodyColor);
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