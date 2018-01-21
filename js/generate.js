buttons.push({name: '20 figures', fun: (inputBitmap,context) => {
      generateFigures(20,context);
    }});
function generateFigures(count, context){
var figures=[];
      var i=0;
      while(i<count){

            var figure={x:Math.floor(Math.random()*256),
                        y:Math.floor(Math.random()*256),
                        r:12+Math.floor(Math.random()*10),
                        type:Math.floor(Math.random()*6), 
                        points:[]};
            if(figure.type<3){
                  
            }else{
                  var alfaChange=360/figure.type;
                  if(figure.type%2==0){
                        var alfa=-90+  alfaChange/2;   
                  }else{
                        alfa=-90;
                  }
                  for(var j=0;j<figure.type;j++){
                  figure.points.push({x:figure.x+Math.cos(alfa*Math.Pi/180),y:figure.x+Math.cos(alfa*Math.Pi/180)});
                  }
            }
            figures.push([]);
      }

}
