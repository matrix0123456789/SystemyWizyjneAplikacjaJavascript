buttons.push({name: '20 figures', fun: (inputBitmap,context) => {
      generateFigures(20,context);
    }});
function generateFigures(count, context){

context.fillStyle = 'white';

context.fillRect(0,0,255,255);
      var figures=[];
      while(figures.length<count){

            var figure={x:Math.floor(Math.random()*256),
                        y:Math.floor(Math.random()*256),
                        r:12+Math.floor(Math.random()*10),
                        type:Math.floor(Math.random()*6), 
                        points:[]};
            if(figure.type<3){
                  context.beginPath();
      context.arc(figure.x, figure.y, figure.r, 0, 2 * Math.PI, false);
      context.fillStyle = 'black';
      context.fill();
            }else{
                  var alfaChange=360/figure.type;
                  if(figure.type%2==0){
                        var alfa=-90+  alfaChange/2;   
                  }else{
                        alfa=-90;
                  }
                  for(var j=0;j<figure.type;j++){
                  figure.points.push({x:figure.x+Math.cos(alfa*Math.PI/180)*figure.r,y:figure.y+Math.sin(alfa*Math.PI/180)*figure.r});
                        alfa+=alfaChange;
                  }
           
context.fillStyle = 'black';
context.beginPath();
context.moveTo(figure.points[0].x, figure.points[0].y);
for(var k=1;k<figure.points.length;k++){
context.lineTo(figure.points[k].x, figure.points[k].y);
}
context.fill();
context.closePath();
                   }
            figures.push(figure);
      }

}
