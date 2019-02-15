var game;
var FCount;
var SavedBrains = [];
var MaxScore = 0;
var Generation = 0;
var MutationHappened = false;

function setup() {
  createCanvas(500,700);
  Sketch();
}

function draw() {
  FCount++;
  background(0);
  game.Run();
  StatusText(Generation, MaxScore, 500);
}

function Sketch(){
  
  //Fitness
  var sum = 0;
  for(var i = 0; i < SavedBrains.length; i++){
    sum += SavedBrains[i].Record;
  }
  for(var i = 0; i < SavedBrains.length; i++){
    SavedBrains[i].Record = SavedBrains[i].Record/sum;
  }
  //--


  if(game != undefined && game.Score > MaxScore){
    MaxScore = game.Score;
  }
  // if(SavedBrains.length > 0){
  //   SavedBrains = BrainsQuickSort(SavedBrains);
  // }
  FCount = 1;
  game = null;
  game = new Game(120, 220, 2.5, 120, 500);
  game.Start();
  Generation += 1;
}

// function keyPressed(){
//   if(keyCode == UP_ARROW){
//     game.BirdUp();
//   }
// }

function StatusText(Gen, Record, Population){
  textAlign(RIGHT);
  textSize(14); 
  textFont("Arial Black");
  
  fill(39,41,133);
  text("Generation: " + Gen, 480, 20);
  fill(108,82,159);
  text("Best score: " + Record, 480, 40);
  fill(171,136,180);
  text("Population: " + Population, 480, 60);

}


function BrainsQuickSort(origArray) {
	if (origArray.length <= 1) { 
		return origArray;
	} else {
    
		var left = [];
		var right = [];
		var newArray = [];
		var pivot = origArray.pop();
		var length = origArray.length;

		for (var i = 0; i < length; i++) {
			if (origArray[i].Record > pivot.Record) {
				left.push(origArray[i]);
			} else {
				right.push(origArray[i]);
			}
		}

		return newArray.concat(BrainsQuickSort(left), pivot, BrainsQuickSort(right));
	}
}
