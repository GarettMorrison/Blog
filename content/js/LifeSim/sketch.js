//Global Variables

var creatureData;
var creatureDataCountA;
var creatureDataCountB;
var creatureDataCountC;
var creatureDataCountD;

var drawColors;
var drawFeed;
var drawMobility;
var drawFur;

  function setDrawColors(){
    drawColors = 1;
    drawFeed = 0;
    drawMobility = 0;
    drawFur = 0;
  } 

  function setDrawFeed(){
    drawColors = 0;
    drawFeed = 1;
    drawMobility = 0;
    drawFur = 0;
  } 


  function setDrawMobility(){
    drawColors = 0;
    drawFeed = 0;
    drawMobility = 1;
    drawFur = 0;
  } 


  function setDrawFur(){
    drawColors = 0;
    drawFeed = 0;
    drawMobility = 0;
    drawFur = 1;
  } 




// Sketch One
var worldP5 = function( world ) { // p could be any variable name\


  //Constants
  // var collumns = 450;
  // var rows = 220;
  // var resolution = 8;
  
  var collumns = 375;
  var rows = 200;
  var resolution = 6;


  var terrain;

  var season = 0;


  var oceanRGB = "rgb(0, 0, 50)";
  var landRGB = "rgb(134, 89, 45)";
  var shoreRGB = "rgb(0, 102, 153)";
  var tundraRGB = "rgb(170, 170, 200)"

  var carnivoreRGB = "rgb(204, 41, 0)";
  var herbivoreRGB = "rgb(242, 192, 120)";
  var omnivoreRGB = "rgb(158, 123, 155)";


  var algae;
  var creature;

  var tickCount;
  var tickTotal;


  world.setup = function(){
    tickCount = 0;
    tickTotal = 0;


    drawColors = 1;
    drawFeed = 0;
    drawMobility = 0;

    world.createCanvas(collumns*resolution+1, rows*resolution+1);


    terrain = makeFullGridArray(); //Make intial terrain array
    for(i = 0; i < collumns; i++){  //Cycle through full grid
      for(j = 0; j < rows; j++){
        if(i == 0 || i == collumns - 1 || j == 0 || j == rows -1){ //Add borders
          terrain[i][j] = 0;
        }
        else{ //Set interior to water
          terrain[i][j] = 1;
        }
      }
    }



    //Add random islands
    var islandCount = randomNum(3) + 1;

    for(count = 0; count <= islandCount; count++){
      var xNew = randomNum(collumns);
      var yNew = randomNum(rows);
      var landsize = randomNum(1) + 1;
      if(xNew > 0 && xNew < collumns - 1 && yNew > 0 && yNew < rows - 1){  //Insure not breaking borders
        terrain[xNew][yNew] = 2;
      }

    }


    for(i = 1; i < rows - 1; i++){
      terrain[collumns - 2][i] = 4;
    }


    //Draw initial map
    for(i = 0; i < collumns; i++){
      for(j = 0; j < rows; j++){
        drawTile(i, j);
      }
    }

    //Interesting land/tundra
    for(cycle = 0; cycle < 3; cycle ++){
      for(i = 1; i < collumns - 1; i++){  //Cycle through full grid
        for(j = 1; j < rows  - 1; j++){

          growTerrain(2, 2, 8)
          growTerrain(4, 4, 8)
        }
      }
    }

    //Normal tundra start
    for(cycle = 0; cycle < 50; cycle ++){
      for(i = 1; i < collumns - 1; i++){  //Cycle through full grid
        for(j = 1; j < rows  - 1; j++){
          //Expand Tundra
          growTerrain(4, 4, 2)
        }
      }
    }


    //Normal Expansion tundra/land
    for(cycle = 0; cycle < 10; cycle ++){
      for(i = 1; i < collumns - 1; i++){  //Cycle through full grid
        for(j = 1; j < rows  - 1; j++){
          //Expand Tundra
          growTerrain(4, 4, 2)
          //Expand Land
          growTerrain(2, 2, 2);
        }
      }
    }

    //Smooth Tundra/Land
    for(cycle = 0; cycle < 2; cycle ++){
      for(i = 1; i < collumns - 1; i++){  //Cycle through full grid
        for(j = 1; j < rows  - 1; j++){
          //Expand Tundra
          fillTerrain(4, 1, 3)
          //Expand Land
          fillTerrain(2, 1, 3);
        }
      }
    }

    //Add shoreline
    for(cycle = 0; cycle < 10; cycle ++){
      for(i = 1; i < collumns - 1; i++){  //Cycle through full grid
        for(j = 1; j < rows  - 1; j++){

          if(terrain[i][j] != 2 && terrain[i][j] != 4){
            growTerrain(4, 3, 1)
            growTerrain(2, 3, 1)
            growTerrain(3, 3, 1)
          }
        }
      }
    }

    //Smooth shoreline
    for(cycle = 0; cycle < 1; cycle ++){
      for(i = 1; i < collumns - 1; i++){  //Cycle through full grid
        for(j = 1; j < rows  - 1; j++){

          if(terrain[i][j] != 2 && terrain[i][j] != 4){
            fillTerrain(3, 1, 3)
          }
        }
      }
    }





    startCreature();
    newAlgae(600); //Make a new algae

  }

  function growTerrain(typeDetect, typeGrow, range){
    var testSum = 0;
      var testRan = 0;
      if(terrain[i][j] != typeGrow){
        testSum = 0 - Math.pow(range, 2);
        testSum = getSurroundingTerrain(i, j, typeDetect, range);
        testRan = Math.pow(range*2 + 1, 2)
        testRan = testRan - Math.pow(range, 2); 
        testRan = randomNum(testRan);
        if(testSum > testRan){
          terrain[i][j] = typeGrow;
          drawTile(i, j);
        }
      }
  }

  function fillTerrain(typeGrow, range, requirement){
    var testSum = 0;
    if(terrain[i][j] != typeGrow){
      testSum = getSurroundingTerrain(i, j, typeGrow, range);

      if(testSum > requirement){
        terrain[i][j] = typeGrow;
        drawTile(i, j);
      }
    }
  }

  function getSurroundingTerrain(x, y, testVar, range){
    var terrainSum = 0;
      for(a = -1*range; a <= range; a++){
        for(b = -1*range; b <= range; b++){
          if(x+a > 0 && x+a < collumns - 1 && y+b > 0 && y+b < rows - 1){
            if(terrain[x + a][y + b] == testVar){
              terrainSum++;
            }  
          }
        }
      }
    return(terrainSum);
  }



  world.draw = function(){

    tickTotal ++;
    if(creature.length == 0){ //Ensure some starters survive
      if(tickTotal < 500){
        startCreature();
      }
    }
    creatureCollisionMap = null;
    creatureCollisionMap = makeFullGridArray(); //Make new collisionMap for creatures
    for(c = 0; c < creature.length; c++){ //Add all Creatures to collision
      creatureCollisionMap[creature[c].x][creature[c].y] = c;
    }

    algaeCollisionMap = null;
    algaeCollisionMap = makeFullGridArray(); //Make new collisionMap for algae
    for(c = 0; c < algae.length; c++){ //Add all algae to collision
      algaeCollisionMap[algae[c].x][algae[c].y] = c;
    }


    for(c = 0; c < creature.length; c++){ //Loop all creatures
     if(creature[c].kill != 1){ // Dont do anything if dead
        creature[c].moveCount ++;
        if(creature[c].moveCount > creature[c].moveAtValue){
          creature[c].moveCount = 0;
          creature[c] = moveCreature(creature[c], c);
          creature[c].food = creature[c].food - creature[c].moveCost;
          if(terrain[creature[c].x][creature[c].y] == 4 && creature[c].fur != 1){
          creature[c].food = creature[c].food - 6;
          }
        }



        if(creature[c].food>=creature[c].foodSplit){
          mitosis(c);
        }

          creature[c].food = creature[c].food - creature[c].tickCost;

        if(creature[c].food < 1){
          creature[c].kill = 1;
        }
     }
    }//END LOOP OF ALL CREATURES

    //Kill Creatures
    for(i = creature.length-1; i>=0; i=i-1){
      if(creature[i].kill == 1){
        drawTile(creature[i].x, creature[i].y);
        creature.splice(i,1);
      }
    }

    //Algae stuff
    //Kill algae
    if(algae != null){
      for(i = algae.length-1; i >=0; i=i-1){
        if(algae[i].kill == 1){
          algae.splice(i,1);
        }
      }
    }


    newAlgae(15); //Make a new algae


    //Do Big Data
    if(tickCount > 50){
        creatureData = creature;
        creatureDataCountA = 1;
        creatureDataCountB = 1;
        creatureDataCountC = 1;
        creatureDataCountD = 1;

        var fleeCount = 0;
        var attractCount = 0;

        // for(i=0; i<creature.length; i++){
        //   for(j=0; j<creature[i].sight.length; j++){
        //     if(creature[i].sight[j].flee == 1){
        //       fleeCount++;
        //     }
        //     else if(creature[i].sight[j].flee == 0){
        //       attractCount++;
        //     }
        //   }
        // }
        // var fleeRatio = fleeCount/(attractCount+fleeCount;
        // fleeRatio = fleeRatio * 100;
        // fleeRatio = Math.ceil(fleeRatio);

        // console.log(fleeRatio);

        tickCount = 0;
      }else{
        tickCount = tickCount + 1;
      }
    }

  //Make initial creature
  function startCreature(){
    var xNew = randomNum(collumns - 2) + 1;
    var yNew = randomNum(rows - 2) + 1;
    if(terrain[xNew][yNew] == 1){
      creature = Array(1);
      creature[0] = {
        //Processing Variables
        x: xNew,
        y: yNew,
        food: 2000,
        direction: 0,
        kill:0,
        turnCount: 0,
        moveCount: 0,
        tickCost: .5,
        moveCost: 1,
        //"DNA" Variables
        foodSplit: 200,
        turnAtValue: 10,
        moveAtValue: 2,
        directionPriority: 1,
        Rgb: 150,
        rGb: 150,
        rgB: 150,
        herbivore: 1,
        carnivore: 0,
        aquatic: 1,
        terrestrial: 0,
        fur: 0,
        sight: [],
        sense: [],
      }
    }
    else{
      creature = Array(0);
    }
  }

  var sightCheckCoords = Array(
    {r:1, //Start Range1
      d:0, },//End Range1 (0)
    {r:1, //Start Range2
      d:-1, },
    {r:2,
      d:0, },
    {r:1,
      d:1, }, //End Range2 (3)
    {r:2, //Start Range3
      d:-1, },
    {r:3,
      d:0, },
    {r:2,
      d:1, }, //End Range3 (6)
    {r:2, //Start Range4
      d:-2, },
    {r:3,
      d:-1, },
    {r:4,
      d:0, },
    {r:3,
      d:1, },
    {r:2,
      d:2, }, //End Range4 (11)
    );

  /*
  Order of sight values
  0 - food algae
  1 - food creature
  2 - foodSplit
  3 - turnAtValue
  4 - moveAtValue
  5 - Rgb
  6 - rGb
  7 - rgB
  8 - herbivore
  9 - carnivore
  10 - aquatic
  11 - terrestrial
  12 - fur
  13 - land terrain
  14 - shore terrain
  15 - ocean terrain
  16 - tundra terrain
  */

  function sightFindValue(value, x, y){
    var output = 0;
    if(x >= 0 && x < collumns && y >= 0  && y < rows){
      if(value == 0){
        if(algaeCollisionMap[x][y] != null && algae[algaeCollisionMap[x][y]].kill != 1){
          output = algae[algaeCollisionMap[x][y]].food;
        }
      }
      else if(value == 1){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].food;
        }
      }
      else if(value == 2){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].foodSplit;
        }
      }
      else if(value == 3){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].turnAtValue;
        }
      }
      else if(value == 4){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].moveAtValue;
        }
      }
      else if(value == 5){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].Rgb;
        }
      }
      else if(value == 6){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].rGb;
        }
      }
      else if(value == 7){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].rgB;
        }
      }
      else if(value == 8){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].herbivore;
        }
      }
      else if(value == 9){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].carnivore;
        }
      }
      else if(value == 10){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].aquatic;
        }
      }
      else if(value == 11){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].terrestrial;
        }
      }
      else if(value == 12){
        if(creatureCollisionMap[x][y] != null && creature[creatureCollisionMap[x][y]].kill != 1){
          output = creature[creatureCollisionMap[x][y]].fur;
        }
      }
      else if(value == 13){
        if(terrain[x][y] == 3){
          output = 1;
        }
      }
      else if(value == 14){
        if(terrain[x][y] == 1){
          output = 1;
        }
      }
      else if(value == 15){
        if(terrain[x][y] == 2){
          output = 1;
        }
      }
      else if(value == 16){
        if(terrain[x][y] == 4){
          output = 1;
        }
      }
    }
    return(output);
  }

  var senseAreaCoords =  Array(
    {r:1, //Start Range1
      d:0, },//End Range1 (0)
    {r:2, //Start Range2
      d:0, },
    {r:1,
      d:1, }, //End R2
    {r:3, //Start R3
      d:0, },
    {r:2,
      d:1, },
    {r:1,
      d:2, }, //End R3
    {r:4, //Start R4
      d:0, },
    {r:3,
      d:1, },
    {r:2,
      d:2, },
    {r:1,
      d:3, }, //End R4
    {r:5,   //Start R5
      d:0, },
    {r:4,
      d:1, },
    {r:3,
      d:2, },
    {r:2,
      d:3, },
    {r:1,
      d:4, }, //End R5

    );

  function senseArea(x, y, range, value){
    var rangeLength;
    if(range = 0){
      rangeLength = 1;
    }
    else if(range = 1){
      rangeLength = 3;
    }
    else if(range = 2){
      rangeLength = 6;
    }
    else if(range = 3){
      rangeLength = 10;
    }
    else if(range = 4){
      rangeLength = 15;
    }

    var sumSense = 0;


    for(i = 0; i < rangeLength; i++){
      var senseAdd = sightFindValue(x + senseAreaCoords[i].d, y - senseAreaCoords[i].r, value) //Check North
      sumSense = sumSense + senseAdd;

      var senseAdd = sightFindValue(x + senseAreaCoords[i].r, y + senseAreaCoords[i].d, value) //Check East
      sumSense = sumSense + senseAdd;
      
      var senseAdd = sightFindValue(x - senseAreaCoords[i].d, y + senseAreaCoords[i].r, value) //Check South
      sumSense = sumSense + senseAdd;
      
      var senseAdd = sightFindValue(x - senseAreaCoords[i].r, y + senseAreaCoords[i].d, value) //Check West
      sumSense = sumSense + senseAdd;
    }

    return(sumSense);
  }

  function moveCreature(specCreature, c){
    var xNew;
    var yNew;

    //Start Direction adjustments
    if(specCreature.sight.length>0){ //Run Sight Stull
        var northAppealSum = Math.random();
        var eastAppealSum = Math.random();
        var southAppealSum = Math.random();
        var westAppealSum = Math.random();

        for(j=0; j<specCreature.sight.length; j++){ //Cycle all sights
          var sightCheckCount;

          //sightCheckCount is 1 greater than the actual index value, so it functions as a cap

          if(specCreature.sight[j].sightRange == 0){ //Range 1
            sightCheckCount = 1;
          }else 
          if(specCreature.sight[j].sightRange == 1){  //Range 2
            sightCheckCount = 4;
          }else 
          if(specCreature.sight[j].sightRange == 2){  //Range 3
            sightCheckCount = 7;
          }else 
          if(specCreature.sight[j].sightRange == 3){ //Range 4
            sightCheckCount = 12;
          }

          var northAppeal = 0;
          var eastAppeal = 0;
          var southAppeal = 0;
          var westAppeal = 0;



          for(i=0; i<sightCheckCount; i++){ //Test north coords
            var xSight = specCreature.x + sightCheckCoords[i].d;
            var ySight = specCreature.y - sightCheckCoords[i].r;
            northAppeal = northAppeal + sightFindValue(specCreature.sight[j].detectVar, xSight, ySight);
          }
          for(i=0; i<sightCheckCount; i++){ //Test east coords
            var xSight = specCreature.x + sightCheckCoords[i].r;
            var ySight = specCreature.y - sightCheckCoords[i].d;
            eastAppeal = eastAppeal + sightFindValue(specCreature.sight[j].detectVar, xSight, ySight);
          }

          for(i=0; i<sightCheckCount; i++){ //Test south coords
            var xSight = specCreature.x + sightCheckCoords[i].d;
            var ySight = specCreature.y + sightCheckCoords[i].r;
            southAppeal = southAppeal + sightFindValue(specCreature.sight[j].detectVar, xSight, ySight);
          }

          for(i=0; i<sightCheckCount; i++){ //Test west coords
            var xSight = specCreature.x - sightCheckCoords[i].r;
            var ySight = specCreature.y + sightCheckCoords[i].d;
            westAppeal = westAppeal + sightFindValue(specCreature.sight[j].detectVar, xSight, ySight);
          }

          var sumAppeal = northAppeal + eastAppeal + southAppeal + westAppeal;
          if(sumAppeal>0){
            northAppeal = northAppeal/sumAppeal;
            eastAppeal = eastAppeal/sumAppeal;
            southAppeal = southAppeal/sumAppeal;
            westAppeal = westAppeal/sumAppeal;
          }


          if(specCreature.sight[j].flee == 1){
          northAppealSum = northAppealSum - northAppeal*specCreature.sight[j].priority;
          eastAppealSum = eastAppealSum - eastAppeal*specCreature.sight[j].priority;
          southAppealSum = southAppealSum - southAppeal*specCreature.sight[j].priority;
          westAppealSum = westAppealSum - westAppeal*specCreature.sight[j].priority;

            // northAppealSum = northAppealSum*-1;
            // eastAppealSum = eastAppealSum*-1;
            // southAppealSum = southAppealSum*-1;
            // westAppealSum = westAppealSum*-1;

          }else{
          northAppealSum = northAppealSum + northAppeal*specCreature.sight[j].priority;
          eastAppealSum = eastAppealSum + eastAppeal*specCreature.sight[j].priority;
          southAppealSum = southAppealSum + southAppeal*specCreature.sight[j].priority;
          westAppealSum = westAppealSum + westAppeal*specCreature.sight[j].priority;
          }
        } //End cycle all sights


        //Add a small amount for previous direction
        if(specCreature.direction == 0){
          northAppealSum = northAppealSum + 1;
        }else
        if(specCreature.direction == 1){ 
          eastAppealSum = eastAppealSum + 1;
        }else
        if(specCreature.direction == 2){
          southAppealSum = southAppealSum + 1;
        }else
        if(specCreature.direction == 3){
          westAppealSum = westAppealSum + 1;
        }


      //Actually set direction to new orientation
      if(northAppealSum >= eastAppealSum && northAppealSum >= southAppealSum && northAppealSum >= westAppealSum){
        specCreature.direction = 0;
      } else
      if(eastAppealSum >= northAppealSum && eastAppealSum >= southAppealSum && eastAppealSum >= westAppealSum){
        specCreature.direction = 1;
      } else
      if(southAppealSum >= northAppealSum && southAppealSum >= eastAppealSum && southAppealSum >= westAppealSum){
        specCreature.direction = 2;
      } else
      if(westAppealSum >= northAppealSum && westAppealSum >= southAppealSum && westAppealSum >= eastAppealSum){
        specCreature.direction = 3;
      }

    }//End Direction Adjustments


    //End Direction Adjustments

    if(specCreature.direction == 0){ //Up
      xNew = specCreature.x;
      yNew = specCreature.y-1;
    }
    if(specCreature.direction == 1){ //Right
      xNew = specCreature.x+1;
      yNew = specCreature.y;
    }
    if(specCreature.direction == 2){ //Down
      xNew = specCreature.x;
      yNew = specCreature.y+1;
    }
    if(specCreature.direction == 3){ //Left
      xNew = specCreature.x-1;
      yNew = specCreature.y;
    }

    let collision = 0;  //Test for collisions

    if(terrain[xNew][yNew] == 0){ //Test for map border collision
      collision = 1;
    }
    if(specCreature.aquatic != 1){ //Prevent non aquatics from moving in water
      if(terrain[xNew][yNew] == 1){
        collision = 1;
      }
    }
    if(specCreature.terrestrial != 1){ //Prevent non terrestrials from moving on land or tundra
      if(terrain[xNew][yNew] == 2){
        collision = 1;
      }
      if(terrain[xNew][yNew] == 4){
        collision = 1;
      }
    }

    if(specCreature.carnivore == 0){  //Test for creature collisions
      if(creatureCollisionMap[xNew][yNew] != null){
          collision = 1;
      }
    }

    if(specCreature.herbivore == 0){  //Test for algae collisions
      if(algaeCollisionMap[xNew][yNew] != null){
        collision = 1;
      }
    }




    if(collision == 1){ //If there is an obstacle
      specCreature.turnCount = 0; //reduce turncount to 0

      var turnVar = randomNum(2);

      if(turnVar == 0){ //Turn Clockwise
        specCreature.direction = specCreature.direction + 1;
        if(specCreature.direction > 3){ 
          specCreature.direction = 0;
        }
      }
      if(turnVar == 1){ //Turn CounterClockwise
        specCreature.direction = specCreature.direction - 1;
        if(specCreature.direction < 0){
          specCreature.direction = 3;
        }
      }
    } //End obstacle

    if(collision == 0){  //No obstacle

      specCreature.turnCount = specCreature.turnCount + 1; //Increment turnCount
      if(specCreature.turnCount > specCreature.turnAtValue){ //Test if it's time to Math.randomly turn
        specCreature.direction = randomizeOverflow(specCreature.direction, 2, 3, 0);
        specCreature.turnCount = 0; //reduce turncount to 0
      }



      if(specCreature.herbivore == 1){ //Eat algae if herbivore
        if(algaeCollisionMap[xNew][yNew] != null){
          algae[algaeCollisionMap[xNew][yNew]].kill = 1;
          specCreature.food = specCreature.food + algae[algaeCollisionMap[xNew][yNew]].food;
        }
      } //End Eat Algae


      if(specCreature.carnivore == 1){  //Eat creature if carnivore
        if(creatureCollisionMap[xNew][yNew] != null){
          creature[creatureCollisionMap[xNew][yNew]].kill = 1;
          specCreature.food = specCreature.food + creature[creatureCollisionMap[xNew][yNew]].food;
        }
      }


      drawTile(specCreature.x, specCreature.y);

      //Fix collisionMap
      creatureCollisionMap[specCreature.x][specCreature.y] = null;
      creatureCollisionMap[xNew][yNew] = c;

      specCreature.x = xNew;
      specCreature.y = yNew;

      drawCreature(specCreature);
    } //End No Obstacle


    return(specCreature);
  }


  function mitosis(c){
    mitosisDirection = randomNum(4); //Pick new potential child location

      if(mitosisDirection == 0){ //Up
        xNew = creature[c].x;
        yNew = creature[c].y-1;
      }
      if(mitosisDirection == 1){ //Right
        xNew = creature[c].x+1;
        yNew = creature[c].y;
      }
      if(mitosisDirection == 2){ //Down
        xNew = creature[c].x;
        yNew = creature[c].y+1;
      }
      if(mitosisDirection == 3){ //Left
        xNew = creature[c].x-1;
        yNew = creature[c].y;
      }

        var collision = 0;


          if(algaeCollisionMap[xNew][yNew] != null){
            collision = 1;
          }


        if(creatureCollisionMap[xNew][yNew] != null){
            collision = 1;
        }



        if(terrain[xNew][yNew] == 0){ //Test for map border collision
          collision = 1;
        }

    if(collision == 0){ //Make New Baby
      creature[c].food = creature[c].food/2;

      creatureLength = creature.length;

        creature[creatureLength] = {
          //Processing Variables
            x: xNew,
            y: yNew, 
            food: creature[c].food,
            direction: creature[c].direction,
            kill: 0,        
            turnCount: 0,
            moveCount: 0,
            tickCost: 0,
            moveCost: 0,
            //"DNA" Variables
            moveAtValue: creature[c].moveAtValue,
            foodSplit: creature[c].foodSplit,
            turnAtValue: creature[c].turnAtValue,
            directionPriority: creature[c].directionPriority,
            Rgb: creature[c].Rgb,
            rGb: creature[c].rGb,
            rgB: creature[c].rgB,
            herbivore: creature[c].herbivore,
            carnivore: creature[c].carnivore,
            aquatic: creature[c].aquatic,
            fur: creature[c].fur,
            terrestrial: creature[c].terrestrial,
            sight: [],
            };
      for(i=0; i<creature[c].sight.length; i++){  //Clone any sight objects
        creature[creatureLength].sight[i] = [];
        creature[creatureLength].sight[i].priority = creature[c].sight[i].priority;
        creature[creatureLength].sight[i].detectVar  = creature[c].sight[i].detectVar;
        creature[creatureLength].sight[i].sightRange  = creature[c].sight[i].sightRange;
        creature[creatureLength].sight[i].flee  = creature[c].sight[i].flee;
      }

      creature[creatureLength] = mutate(creature[creatureLength]);
      creature[creatureLength].moveCost = 
                1 
                +creature[creatureLength].carnivore 
                +creature[creatureLength].herbivore
                +creature[creatureLength].aquatic
                +creature[creatureLength].terrestrial
                +creature[creatureLength].fur*2
                +creature[creatureLength].sight.length/2
                +6/(creature[creatureLength].moveAtValue);
        if(creature[creatureLength].terrestrial == 1 && creature[creatureLength].aquatic == 1){
          creature[creatureLength].moveCost = creature[creatureLength].moveCost + 2;
        }
        if(creature[creatureLength].carnivore == 1 && creature[creatureLength].herbivore == 1){
          creature[creatureLength].moveCost = creature[creatureLength].moveCost + 5;
        }

      creature[creatureLength].tickCost = 0.2;

      creatureCollisionMap[xNew][yNew] = creatureLength; //Add new child to collisionMap

      world.fill(creature[creatureLength].Rgb,creature[creatureLength].rGb,creature[creatureLength].rgB); //Set internal color
      world.stroke(creature[creatureLength].Rgb,creature[creatureLength].rGb,creature[creatureLength].rgB);

      drawCreature(creature[creatureLength]);
    } //End new Baby
  }

  function drawCreature(specCreature){
    world.noStroke();

    if(drawColors==1){
      world.fill(specCreature.Rgb,specCreature.rGb,specCreature.rgB);
    }

    
  // var carnivoreRGB = "rgb(204, 41, 0)";
  // var herbivoreRGB = "rgb(126, 178, 221)";
  // var omnivoreRGB = "rgb(103, 111, 84)";


    if(drawMobility==1){
      if(specCreature.terrestrial == 1){
        if(specCreature.aquatic == 1){
          world.fill(158, 123, 155); // Amphibian
        }
        else{
          world.fill(242, 192, 120); // Terrestrial
        }
      }
      else{
        world.fill(204, 41, 0); // Aquatic
      }
    }
    if(drawFeed==1){
      if(specCreature.herbivore == 1){
        if(specCreature.carnivore == 1){
          world.fill(158, 123, 155); // Omnivore
        }
        else{
          world.fill(242, 192, 120); // Herbivore
        }
      }
      else{
        world.fill(204, 41, 0); // Carnivore
      }
    }
    if(drawFur == 1){
      if(specCreature.fur == 1){
        world.fill(0, 0, 0);
      }
      else{
        world.fill(255, 255, 255);
      }
    }
    world.rect(specCreature.x*resolution + 1, specCreature.y*resolution + 1, resolution-3, resolution-3);
  }


  function randomize(initial, maxChange, maximum, minimum){
    var change = maxChange - randomNum(maxChange*2+1);
    var output = initial + change;

    if(output > maximum){
      output = maximum;
    }
    if(output < minimum){
      output = minimum;
    }

    return(output);
  }

  function randomizeOverflow(initial, maxChange, maximum, minimum){
    var change = maxChange - randomNum(maxChange*2+1);
    var output = initial + change;

    if(output > maximum){
      output = output - maximum + minimum;
    }
    if(output < minimum){
      output = output + maximum - minimum;
    }
    return(output);
  }

  function randomNum(maximum){
    var output = Math.random()*maximum;
    output = Math.floor(output);
    return(output);
  }

  function mutate(specCreature){
    var mutationDegree = randomNum(15); //Set up Mutation severity
    if(mutationDegree > 5){ //No Mutation
      mutationCount = 0;
    }else if(mutationDegree <= 5 && mutationDegree > 0){ //Major Mutation
      mutationCount = 3;
    }else if(mutationDegree == 0){ //Severe Mutation
      mutationCount = 6;
    }

    for(i = 0; i<mutationCount; i++){ //Loop as many mutations as specified
      var geneCount = 14 + specCreature.sight.length*4; //Set total number of genes that can be altered 
      var mutationVariable = randomNum(geneCount);  //Pick what to alter

      //Test if one of the independent genes was selected
      if(mutationVariable == 0){ 
        specCreature.foodSplit = randomize(specCreature.foodSplit, 60, 1000, 2);
      }
      else if(mutationVariable == 1){
        specCreature.turnAtValue = randomize(specCreature.turnAtValue, 4, 16, 1);
      }
      else if(mutationVariable == 2){
        specCreature.herbivore = randomize(specCreature.herbivore, 1, 1, 0);
      }
      else if(mutationVariable == 3){
        specCreature.carnivore = randomize(specCreature.carnivore, 1, 1, 0);
      }
      else if(mutationVariable == 4){
        specCreature.Rgb = randomizeOverflow(specCreature.Rgb, 40, 255, 10);
      }
      else if(mutationVariable == 5){
        specCreature.rGb = randomizeOverflow(specCreature.rGb, 40, 255, 10);
      }
      else if(mutationVariable == 6){
        specCreature.rgB = randomizeOverflow(specCreature.rgB, 40, 255, 10);
      }
      else if(mutationVariable == 7){
        specCreature.moveAtValue = randomize(specCreature.moveAtValue, 4, 16, 1);
      }
      else if(mutationVariable == 8){
        specCreature.aquatic = randomize(specCreature.aquatic, 1, 1, 0);
      }
      else if(mutationVariable == 9){
        specCreature.terrestrial = randomize(specCreature.terrestrial, 1, 1, 0);
      }
      else if(mutationVariable == 10){
        specCreature.fur = randomize(specCreature.fur, 1, 1, 0);
      }
      else if(mutationVariable == 11){
        specCreature.directionPriority = randomize(specCreature.directionPriority, 5, 20, 0);
      }

      //Test if a dependent var was selected
      else if(mutationVariable == 12){ //Add new Sight
        var newSight = specCreature.sight.length;
        specCreature.sight[newSight] = [];
        specCreature.sight[newSight].priority = randomNum(21);
        specCreature.sight[newSight].detectVar = randomNum(17);
        specCreature.sight[newSight].sightRange = randomNum(4);
        specCreature.sight[newSight].flee = randomNum(2);
      }
      else if(mutationVariable == 13){ //Remove Sight
        if(specCreature.sight.length>0 ){
          var deleteSight = randomNum(specCreature.sight.length-1);
          delete specCreature.sight[deleteSight].priority;
          delete specCreature.sight[deleteSight].detectVar;
          delete specCreature.sight[deleteSight].sightRange;
          delete specCreature.sight[deleteSight].flee;
          specCreature.sight.splice(deleteSight, 1);
        }
      }
      else if(mutationVariable > 13){ //Vary individual part of sight
        var mutationSightOverflow = mutationVariable - 13; //Setup how far above to vary

        var sightMutationVar =  mutationSightOverflow; //Setup which part to vary
        while(sightMutationVar > 4){
          sightMutationVar = sightMutationVar - 4;
        }


        var sightMutated = sightMutationVar/4; //Setup which sight to vary
        sightMutated = Math.ceil(sightMutated);

        if(sightMutationVar == 1){
          specCreature.sight[sightMutated-1].priority = randomNum(21);
        }
        else if(sightMutationVar == 2){
          specCreature.sight[sightMutated-1].detectVar = randomNum(17);
        }
        else if(sightMutationVar == 3){
          specCreature.sight[sightMutated-1].sightRange = randomNum(4);
        }
        else  if(sightMutationVar == 4){
          specCreature.sight[sightMutated-1].flee = randomNum(2);
        }
      }


  }

  return(specCreature);
  }


  //Make Starting Terrain Map
  function makeFullGridArray(){
    grid = Array(collumns);
    for(i = 0; i<grid.length; i++){
      grid[i] = Array(rows);
    }
    return grid;
  }

  //Draw individual Terrain Tiles
  function drawTile(x, y){
    type = terrain[x][y];
    world.fill(0);
    world.stroke(0);
    if(type == 0){
      world.fill(50);
      world.stroke(50);
    }else if(type == 1){
      world.fill(oceanRGB);
      world.stroke(oceanRGB);
    }else if(type == 2){
      world.fill(landRGB);
      world.stroke(landRGB);
    }else if(type == 3){
      world.fill(shoreRGB);
      world.stroke(shoreRGB);
    }else if(type == 4){
      world.fill(tundraRGB);
      world.stroke(tundraRGB);
    }
    world.rect(x*resolution, y*resolution, resolution - 1, resolution - 1)
  }


  //Make new Algae
  function newAlgae(repeat){
    for(j = 0; j < repeat; j++){
      if(algae == null){
        algae = Array(1);
        algaeLength = 0;
      }else{
        algaeLength = algae.length;
      }

    var error = 0;
    var xNew = randomNum(collumns - 2) + 1;
    var yNew = randomNum(rows - 2) + 1;

    //Test for algae occupation of square
    for(i = 0; i < algaeLength; i++){ //By algae
      if(algae[i].x == xNew && algae[i].y == yNew){
        error = 1; 
      }
    }

    for(i = 0; i < creature.length; i++){ //By creature
      if(creature[i].x == xNew && creature[i].y == yNew){
        error = 1; 
      }
    }

      if(error == 0){
        algae[algaeLength] = {
          x:xNew,
          y:yNew,
          food: randomNum(500),
          kill:0,
        };

        if(terrain[algae[algaeLength].x][algae[algaeLength].y] == 2){
          algae[algaeLength].food = algae[algaeLength].food*6;
        }
        
        if(terrain[algae[algaeLength].x][algae[algaeLength].y] == 4){
          algae[algaeLength].food = algae[algaeLength].food*0.6;
        }

        //Draw algae
        world.fill(44, 153, 36);
        world.stroke(26, 61, 24);
        world.rect((algae[algaeLength].x*resolution) + 1, (algae[algaeLength].y*resolution) + 1, resolution - 3, resolution - 3);
      }
    }
  }
//End World
};

var myp5 = new p5(worldP5, 'c1');







// Show foodSplitValue
var dataA = function( data ) { 
  var currentRow = 0;
  var storedData = [];

  data.setup = function() {
    data.createCanvas(100, 400);
  };

  data.draw = function() {

    if(creatureDataCountA == 1){ //Run if new data is input
      creatureDataCountA = 0;

      if(currentRow*10 > data.width){
        data.resizeCanvas(currentRow*10+100, 400);
        for(i=0; i<currentRow; i++){
          for(j=0; j<storedData[i].length; j++){ //Actually draw new row
            var blue = 0;
            if(storedData[i][j] > 255){
              blue = storedData[i][j] - 255;
            }
            data.fill(storedData[i][j], 0, blue);
            data.stroke(storedData[i][j], 0, blue);
            data.rect(i*10, j*10, 10, 10);
          }
        }
      }

      storedData[currentRow] = Array(20);
      var bucketValue;
      for(i=0; i<40; i++){ //Set all values as 0 to start
        storedData[currentRow][i] = 0;
      }

      for(i=0; i<creatureData.length; i++){ //Run through all creatures and make histogramable data
        // bucketValue = Math.floor(creatureData[i].foodSplit/25);
        bucketValue = Math.floor(creatureData[i].moveAtValue);

        storedData[currentRow][bucketValue] = storedData[currentRow][bucketValue] + 1;
      }
      for(i=0; i<storedData[currentRow].length; i++){ //Actually draw new row
        var blue = 0;
        if(storedData[currentRow][i] > 255){
          blue = storedData[currentRow][i] - 255;
        }
        data.fill(storedData[currentRow][i], 0, blue);
        data.stroke(storedData[currentRow][i], 0, blue);
        data.rect(currentRow*10, i*10, 10, 10);
      }

      currentRow ++;
    }//End new data run
  };
};
var myp5 = new p5(dataA, 'c2');


// Show detectVar
let dataB = function(data) {
  var currentRow = 0;
  var storedData = [];

  data.setup = function() {
    data.createCanvas(500, 170);
  };

  data.draw = function() {
    if(creatureDataCountB == 1){ //Run if new data is input
      creatureDataCountB = 0;

      if(currentRow*10 > data.width){
        data.resizeCanvas(currentRow*10+300, 170);
        for(i=0; i<currentRow; i++){
          for(j=0; j<storedData[i].length; j++){ //Actually draw new row
            var blue = 0;
            if(storedData[i][j] > 255){
              blue = storedData[i][j] - 255;
            }
            data.fill(0, storedData[i][j]/4, blue/4);
            data.stroke(0, storedData[i][j]/4, blue/4);
            data.rect(i*10, j*10, 10, 10);
          }
        }
      }

      storedData[currentRow] = Array(15);
      var bucketValue;
      for(i=0; i<17; i++){ //Set all values as 0 to start
        storedData[currentRow][i] = 0;
      }

      for(i=0; i<creatureData.length; i++){ //Run through all creatures and make heatmapabble data
        if(creatureData[i].sight != null){
          for(j = 0; j < creatureData[i].sight.length; j++){
            bucketValue = creatureData[i].sight[j].detectVar;
            storedData[currentRow][bucketValue]++;
          }
        }
      }



      for(i=0; i<storedData[currentRow].length; i++){ //Actually draw new row
        var blue = 0;
        if(storedData[currentRow][i] > 255){
          blue = storedData[currentRow][i] - 255;
        }
        data.fill(0, storedData[currentRow][i]/4, blue/4);
        data.stroke(0, storedData[currentRow][i]/4, blue/4);
        data.rect(currentRow*10, i*10, 10, 10);
      }


      currentRow ++;
    }//End new data run
  };
};

var myp5 = new p5(dataB, 'c3');


// Show sight length
let dataC = function(data) {
  var currentRow = 0;
  var storedData = [];

  data.setup = function() {
    data.createCanvas(100, 170);
  };

  data.draw = function() {
    if(creatureDataCountC == 1){ //Run if new data is input
      creatureDataCountC = 0;

      if(currentRow*10 > data.width){
        data.resizeCanvas(currentRow*10+100, 170);
        for(i=0; i<currentRow; i++){
          for(j=0; j<storedData[i].length; j++){ //Actually draw new row
            var blue = 0;
            if(storedData[i][j] > 255){
              blue = storedData[i][j] - 255;
            }
            data.fill(0, storedData[i][j]/2, blue/2);
            data.stroke(0, storedData[i][j]/2, blue/2);
            data.rect(i*10, j*10, 10, 10);
          }
        }
      }

      storedData[currentRow] = Array(20);
      var bucketValue;
      for(i=0; i<20; i++){ //Set all values as 0 to start
        storedData[currentRow][i] = 0;
      }

      for(i=0; i<creatureData.length; i++){ //Run through all creatures and make histogramable data
        bucketValue = Math.floor(creatureData[i].sight.length);

        storedData[currentRow][bucketValue] = storedData[currentRow][bucketValue] + .5;
      }
      for(i=0; i<storedData[currentRow].length; i++){ //Actually draw new row
        var blue = 0;
        if(storedData[currentRow][i] > 255){
          blue = storedData[currentRow][i] - 255;
        }
        data.fill(0, storedData[currentRow][i]/2, blue/2);
        data.stroke(0, storedData[currentRow][i]/2, blue/2);
        data.rect(currentRow*10, i*10, 10, 10);
      }

      currentRow ++;
    }//End new data run
  };
};

var myp5 = new p5(dataC, 'c4');


// Draw food ratio
let dataD = function(data) {
  var carnivoreRGB = "rgb(204, 41, 0)";
  var herbivoreRGB = "rgb(242, 192, 120)";
  var omnivoreRGB = "rgb(158, 123, 155)";

  var currentRow = 0;
  var storedData = [];

  data.setup = function() {
    data.createCanvas(100, 200);
  };

  data.draw = function() {
    if(creatureDataCountD == 1){ //Run if new data is input
      creatureDataCountD = 0;

      if(currentRow*10 > data.width){
        data.resizeCanvas(currentRow*10+100, 200);
        for(i=0; i<currentRow; i++){//Actually draw new row
                  //Draw stuff
            data.stroke(carnivoreRGB);
            data.fill(carnivoreRGB);
            data.rect(i*10, 0, 10, storedData[i].carnRatio);

            data.stroke(omnivoreRGB);
            data.fill(omnivoreRGB);
            data.rect(i*10, storedData[i].carnRatio, 10, storedData[i].omnRatio);

            data.stroke(herbivoreRGB);
            data.fill(herbivoreRGB);
            data.rect(i*10, storedData[i].carnRatio + storedData[i].omnRatio, 10, storedData[i].herbRatio);

            data.stroke(155);
            data.fill(155);
            data.rect(i*10, storedData[i].carnRatio + storedData[i].omnRatio + storedData[i].herbRatio, 10, storedData[i].omnRatio);
        }
      }

      storedData[currentRow] = {
        carnValue: 0,
        herbValue: 0,
        omnValue: 0,
        nullValue: 0,

        carnRatio: 0,
        herbRatio: 0,
        omnRatio: 0,
        nullRatio: 0,
      };


      for(i=0; i<20; i++){ //Set all values as 0 to start
        storedData[currentRow][i] = 0;
      }
      for(i=0; i<creatureData.length; i++){ //Tally all 
        if(creatureData[i].carnivore == 1){
          if(creatureData[i].herbivore == 1){
            storedData[currentRow].omnValue++;
          }else{
            storedData[currentRow].carnValue++;
          }
        }
        else if(creatureData[i].herbivore == 1){
          storedData[currentRow].herbValue++;
        }
        else{
          storedData[currentRow].carnValue++;
        }
      }

      //Take averages
      storedData[currentRow].carnRatio = Math.floor(200*storedData[currentRow].carnValue/creatureData.length);
      storedData[currentRow].herbRatio = Math.floor(200*storedData[currentRow].herbValue/creatureData.length);
      storedData[currentRow].omnRatio = Math.floor(200*storedData[currentRow].omnValue/creatureData.length);
      storedData[currentRow].nullRatio = Math.floor(200*storedData[currentRow].nullValue/creatureData.length);

      //Draw stuff
      data.stroke(carnivoreRGB);
      data.fill(carnivoreRGB);
      data.rect(currentRow*10, 0, 10, storedData[currentRow].carnRatio);

      data.stroke(omnivoreRGB);
      data.fill(omnivoreRGB);
      data.rect(currentRow*10, storedData[currentRow].carnRatio, 10, storedData[currentRow].omnRatio);

      data.stroke(herbivoreRGB);
      data.fill(herbivoreRGB);
      data.rect(currentRow*10, storedData[currentRow].carnRatio + storedData[currentRow].omnRatio, 10, storedData[currentRow].herbRatio);

      data.stroke(155);
      data.fill(155);
      data.rect(currentRow*10, storedData[currentRow].carnRatio + storedData[currentRow].omnRatio + storedData[currentRow].herbRatio, 10, storedData[currentRow].omnRatio);




      currentRow ++;
    }//End new data run
  };
};

var myp5 = new p5(dataD, 'c5');