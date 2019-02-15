function Pipe(min, max, speed){
  this.Spacing = random(min,max);
  this.Top = random(20, height - 20 - this.Spacing);
  this.Bottom = height - this.Top - this.Spacing;
  this.x = width;
  this.w = 40;
  var Once = true;
  
  this.Show = function(){
    fill(255);
    rect(this.x, 0, this.w, this.Top);
    rect(this.x, height-this.Bottom, this.w, this.Bottom);
  }
  
  this.Update = function(bird){
    this.x -= speed;
    if(this.x < bird.x - bird.Diameter/2 - 1 && Once){
      if(Score <= 80){
        GREEN = GREEN +2;
      }else if(Score <=335){
        BLUE = BLUE -2;
        RED = RED +2;
      }
      Score++;
      Once = false;
    }
  }
  
  this.offScreen = function(){
    return this.x < -(this.w) ? true : false; 
  }
  
  this.Hit = function(bird){
    
    // Calculates the hit considering that the 'bird' is a circle. Hard AF but it's done :)
    
    if(bird == undefined){
      debugger;
    }

    var PipeW = this.x + this.w;;
    var Radius = bird.Diameter/2;
    var Radius_DistanceX1 = bird.x - Radius;
    var Radius_DistanceX2 = bird.x + Radius;
    var BTop = height-this.Bottom;
    var RadiusPow = Math.pow(Radius,2);
    var D1Pow = Math.pow((bird.y - this.Top),2);
    var D2Pow = Math.pow((BTop - bird.y),2);
    
    
    if(bird.y < this.Top && (this.x < Radius_DistanceX2 && PipeW > Radius_DistanceX1)){
      return true;
    }

    if(bird.y > BTop && (this.x < Radius_DistanceX2 && PipeW > Radius_DistanceX1)){
      return true;
    }
    
    if(this.x > bird.x){
      if(bird.y > this.Top && bird.y < this.Top + Radius){
        if(this.x < bird.x + Math.sqrt(RadiusPow - D1Pow)){
            return true;
        }
      }
      
      if(bird.y < BTop && bird.y > BTop - (Radius)){
        if(this.x < bird.x + Math.sqrt(RadiusPow - D2Pow)){
            return true;
        }
      }
    }
    
    if(bird.x > this.x && bird.x < PipeW){
      if(bird.y - Radius < this.Top || bird.y + Radius > BTop){
        return true;
      }
    }
    
    if(PipeW < bird.x && PipeW > Radius_DistanceX1){
      if(bird.y > this.Top && bird.y < this.Top + Radius ){
        if(bird.x < PipeW + Math.sqrt(RadiusPow - D1Pow) ){
          return true;
        }
      }
    
      if(bird.y + Radius > BTop && bird.y < BTop){
        if(bird.x < PipeW + Math.sqrt(RadiusPow - D2Pow) ){
          return true;
        }
      }
    }
    
    return false;
  }
  
 }
