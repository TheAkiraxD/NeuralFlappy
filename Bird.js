function Bird(brain){
  this.y = height/2;
  this.x = 70;
  this.Velocity = 0;
  this.Gravity = 0.9;
  this.Lift = 16;
  this.Diameter = 40;
  var Stop = false;
  this.Brain;
  if(brain instanceof NeuralNetwork){
    this.Brain = brain;
    this.Brain.mutate(0.1);
    if(MutationHappened){
      this.Brain.Misc1 += 1;
      MutationHappened = false;
    }
  }else{
    this.Brain = new NeuralNetwork(4,4,1, brain);
  }
  
  
  this.Think = function(inpts){
    var output = this.Brain.predict(inpts);
    if(output > 0.5){
      this.Up();
    }
  }

  this.Show = function(){
    var filling = "rgba("+ this.Brain.Misc3[0] +","+ this.Brain.Misc3[1] +","+ this.Brain.Misc3[2] +", 0.8)";
    fill(filling);
    ellipse(this.x, this.y, this.Diameter, this.Diameter);

    textAlign(CENTER);
    textSize(12); 
    textFont("Arial Black");
    fill(255,255,255);
    text(this.Brain.Misc1, this.x, this.y);
    
  }

  this.Update = function(){
    this.Brain.MM++;
    this.Velocity += this.Gravity;
    this.Velocity *= 0.9;
    this.y += this.Velocity;
    
    if(this.y > height){
      this.y = height;
      this.Velocity = 0;
    }
    
    if(this.y < 0){
      this.y = 0;
      this.Velocity = 0;
    }
  }
  
  this.Up = function(){
    for(var x = 0; x < this.Lift; x++){
      this.Velocity--;
      if(Stop)
        break;
    }
  }
  
}
function MutationFunc(val, i, j){
  var attemp = Math.floor((Math.random() * 100) + 1);
  if(attemp <= 1){
    debugger;
    var res = Math.random() * 2 - 1
    return res;
  }else{
    return val;
  }
}


function CustomMutation(brain,chance) {
  var nume = Math.floor((Math.random() * 100) + 1);
  if(nume <= chance){
    var which = Math.floor((Math.random() * 4) + 1);


    var pos = Math.floor((Math.random() * 2) + 0);
    var qtd =  Math.floor((Math.random() * 60) + 1);

    if(brain.Misc3[pos] + qtd > 255){
      brain.Misc3[pos] -= qtd;
    }else{
      brain.Misc3[pos] += qtd;
    }

    var row;
    var col;
    
    brain.Misc1 += 1;
    brain.IdNumber += 1;

    brain

    switch(which){
      case 1: //weights_ih
        row = Math.floor((Math.random() * (brain.hidden_nodes-1)) + 0);
        col = Math.floor((Math.random() * (brain.input_nodes-1)) + 0);
        brain.weights_ih.data[row][col] = Math.random() * 2 - 1;
        break;
      case 2: //weights_ho
        row = Math.floor((Math.random() * (brain.output_nodes-1)) + 0);
        col = Math.floor((Math.random() * (brain.hidden_nodes-1)) + 0);
        brain.weights_ho.data[row][col] = Math.random() * 2 - 1;
        break;
      case 3: //bias_h
        row = Math.floor((Math.random() * (brain.hidden_nodes-1)) + 0);
        col = 0;
        brain.bias_h.data[row][col] = Math.random() * 2 - 1;
        break;
      case 4: //bias_o
        row = Math.floor((Math.random() * (brain.output_nodes-1)) + 0);
        col = 0;
        brain.bias_h.data[row][col] = Math.random() * 2 - 1;
        break;
    }

  }
  

}