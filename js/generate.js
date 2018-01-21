buttons.push({name: '20 figures', fun: (inputBitmap,context) => {
      generateFigures(20,context);
    }});

function generateFigures(count, context) {

    context.fillStyle = 'white';
    context.fillRect(0, 0, 255, 255); //czyścimy wszystko

    var figures = []; //tu będą informacje o figurach
    while (figures.length < count) {
        var r = 12 + Math.floor(Math.random() * 10); //promień
        var figure = {x: r + 2 + Math.floor(Math.random() * (256 - 2 * r - 4)),
            y: r + 2 + Math.floor(Math.random() * (256 - 2 * r - 4)),
            r: r,
            type: 2 + Math.floor(Math.random() * 4), //2 to koło, 3 i więcej to wielokąt
            points: []};

        //sprawdzamy, czy figury się nie nakładają
        var canDraw = true;
        for (var otherFigure of figures){
            var distance = Math.sqrt(Math.pow(otherFigure.x - figure.x, 2) + Math.pow(otherFigure.y - figure.y, 2));//odległość środków
            var minimumDistance = otherFigure.r + figure.r + 2;//suma promieni plus minimalny margines
            if (distance < minimumDistance) {
                canDraw = false;
                break;
            }
        }
        if (!canDraw)
        {
            continue;//anulujemy rysowanie
        }
        if (figure.type < 3) {//koło
            context.beginPath();
            context.arc(figure.x, figure.y, figure.r, 0, 2 * Math.PI, false);
            context.fillStyle = 'black';
            context.fill();
        } else {//wielokąt
            var alfaChange = 360 / figure.type;
            if (figure.type % 2 == 0) {
                var alfa = -90 + alfaChange / 2;
            } else {
                alfa = -90;
            }
            for (var j = 0; j < figure.type; j++) {
                figure.points.push({x: figure.x + Math.cos(alfa * Math.PI / 180) * figure.r, y: figure.y + Math.sin(alfa * Math.PI / 180) * figure.r});
                alfa += alfaChange;
            }

            context.fillStyle = 'black';
            context.beginPath();
            context.moveTo(figure.points[0].x, figure.points[0].y);//punkt startu
            for (var k = 1; k < figure.points.length; k++) {
                context.lineTo(figure.points[k].x, figure.points[k].y);//kolejne punkty
            }
            context.fill();
            context.closePath();
        }
        figures.push(figure);
    }

}

