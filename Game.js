var Score;
var RED;
var GREEN;
var BLUE;
  
function Game(SpacingMin, SpacingMax, Speed, Frequency, Birds){
  this.Finished = false;
  this.Min = SpacingMin;
  this.Max = SpacingMax;
  this.Speed = Speed;
  this.Frequency = Frequency;
  this.Birds = Birds;
  this.Score;
  var pipes = [];
  var bird = [];
  var TemporaryFCount;
  var FrequencyCount;
  var FrequencyBase;
  
  this.Start = function(){
    pipes.push(new Pipe(this.Min, this.Max, this.Speed));

    if(SavedBrains.length > 0){
      for(var i = 0; i < this.Birds; i++){
        var temporaryBrain = PickOne();
        bird.push(new Bird(temporaryBrain));
      }
    }else{
      for(var i = 0; i < this.Birds; i++){
        bird.push(new Bird(i));
      }
    }
    SavedBrains = [];
    Score = 0;
    RED = 0;
    GREEN = 0;
    BLUE = 0;
    aux = 0;
    FrequencyCount = 0;
    FrequencyBase = 0;
    TemporaryFCount = FCount;
  }
  
  this.Run = function(){
    this.BirdRun();
    this.PipesRun();
    this.TextRun();
  }
  
  this.TextRun = function(){    
    this.Score = Score;
    textAlign(CENTER);
    textSize(42); 
    textFont("Arial Black");
    
    fill(255- RED,160 - GREEN,50 - BLUE);
    
    text(Score, 250, 100);
  }
  
  this.BirdUp = function(){
    bird.Up();
  }
  
  this.BirdRun = function(){
    for(var i = 0; i < bird.length; i++){
      bird[i].Show();

      var closestPipe = pipes[0];

      if(pipes[0].x + pipes[0].w < bird[i].x){
        closestPipe = pipes[1];
      }
      
      var Inputs = [];

      Inputs.push(bird[i].y);
      Inputs.push(closestPipe.Top);
      Inputs.push(closestPipe.Bottom);
      Inputs.push(closestPipe.x);

      bird[i].Think(Inputs);
      bird[i].Update();
    }
    
  }
  
  this.PipesRun = function(){
    FrequencyCount++;
     if(FrequencyCount == this.Frequency){
       pipes.push(new Pipe(this.Min, this.Max, this.Speed));
       FrequencyCount = FrequencyBase;
     }
     
    for(var x = pipes.length-1; x >= 0 ; x--){
      pipes[x].Show();
      pipes[x].Update(bird[0]);

      for(var i = 0; i < bird.length; i++){
        if(pipes[x].Hit(bird[i])){
          bird[i].Stop = true;

          bird[i].Brain.Record = bird[i].Brain.MM;
          bird[i].Brain.MM = 0;
          SavedBrains.push(bird[i].Brain.copy());
        }
      }

      var temp  = [];
      for(var i = 0; i < bird.length; i++){
        if(!bird[i].Stop){
          temp.push(bird[i]);
        } 
      }
      bird = temp;

      if(bird.length == 0){
        Sketch();
      }


      if(pipes[x].offScreen()){
        pipes.splice(x, 1);
      }
    }  
  }
  
  // this.DifficultyRun = function(){
  //   if(TemporaryFCount != FCount){
  //     FrequencyCount++;
  //     TemporaryFCount == FCount;
  //   }

  //   if(FCount % 280 == 0){
  //     this.Speed += 0.05;
  //   }
  //   if(this.Min > 60){
  //     if(FCount % 280 == 0){
  //       this.Min = this.Min -2;
  //       this.Max = this.Max -2;
  //       aux++;
  //     }
  //   }
  //   if(aux == 1 && FrequencyCount < (this.Frequency - 20)){
  //     FrequencyBase += 4;
  //     aux = 0;
  //     console.log(FrequencyBase);
  //   }
    
  // }
  
}

function PickOne(){
  var index = 0;
  var r = random(1);
  while(r > 0){
    r = r - SavedBrains[index].Record;
    index++;
  }
  index--;
  return SavedBrains[index].copy();  
}