buttons.push({name: 'Rotation k*90deg', fun: (inputBitmap) => {
        return [
            {name: '90, 1', bitmap: bitmapProcessing_RotationK90(inputBitmap, 90, 1)},
            {name: '90, 2', bitmap: bitmapProcessing_RotationK90(inputBitmap, 90, 2)},
            {name: '180, 1', bitmap: bitmapProcessing_RotationK90(inputBitmap, 180, 1)},
            {name: '180, 2', bitmap: bitmapProcessing_RotationK90(inputBitmap, 180, 2)},
            {name: '270, 1', bitmap: bitmapProcessing_RotationK90(inputBitmap, 270, 1)},
            {name: '270, 2', bitmap: bitmapProcessing_RotationK90(inputBitmap, 270, 2)}
        ]
    }});

buttons.push({name: 'Rotation Theta v.1', fun: (inputBitmap) => {

        var allBitmaps = [];
        for (var i = 1; i < 10; i++) {
            var bitmap = bitmapProcessing_RotationTheta(inputBitmap, i * 15);
            allBitmaps.push({name: i + '*15', bitmap});
        }
        return allBitmaps;
    }});
buttons.push({name: 'Rotation Theta v.2', fun: (inputBitmap) => {
        var lastBitmap = inputBitmap;
        var allBitmaps = [];
        for (var i = 1; i < 10; i++) {
            lastBitmap = bitmapProcessing_RotationTheta(lastBitmap, 15);
            allBitmaps.push({name: i + '*15', bitmap: lastBitmap});
        }
        return allBitmaps;
    }});
buttons.push({name: 'Rotation Theta v.3', fun: (inputBitmap) => {

        var allBitmaps = [];
        for (var i = 1; i < 10; i++) {
            var bitmap = bitmapProcessing_RotationThetaA(inputBitmap, i * 15);
            allBitmaps.push({name: i + '*15', bitmap});
        }
        return allBitmaps;
    }});
buttons.push({name: 'Rotation Theta v.4', fun: (inputBitmap) => {
        var lastBitmap = inputBitmap;
        var allBitmaps = [];
        for (var i = 1; i < 10; i++) {
            lastBitmap = bitmapProcessing_RotationThetaA(lastBitmap, 15);
            allBitmaps.push({name: i + '*15', bitmap: lastBitmap});
        }
        return allBitmaps;
    }});


buttons.push({name: 'Reflections v.1', fun: (inputBitmap) => {
        return [
            {name: 'V', bitmap: bitmapProcessing_Reflections(inputBitmap, 0)},
            {name: 'H', bitmap: bitmapProcessing_Reflections(inputBitmap, 1)},
            {name: 'D1', bitmap: bitmapProcessing_Reflections(inputBitmap, 2)},
            {name: 'D2', bitmap: bitmapProcessing_Reflections(inputBitmap, 3)}
        ]
    }});
buttons.push({name: 'Zoom In 1', fun: (inputBitmap) => {
        var lastBitmap = inputBitmap;
        var allBitmaps = [];
        for (var i = 1; i < 10; i++) {
            lastBitmap = bitmapProcessing_ZoomIn(lastBitmap);
            allBitmaps.push({name: '', bitmap: lastBitmap});
        }
        return allBitmaps;
    }});

buttons.push({name: 'Zoom In 2', fun: (inputBitmap) => {
        return [
            {name: '0', bitmap: bitmapProcessing_ZoomInByQuarter(inputBitmap, 0)},
            {name: '1', bitmap: bitmapProcessing_ZoomInByQuarter(inputBitmap, 1)},
            {name: '', bitmap: bitmapProcessing_ZoomIn(inputBitmap)},
            {name: '2', bitmap: bitmapProcessing_ZoomInByQuarter(inputBitmap, 2)},
            {name: '3', bitmap: bitmapProcessing_ZoomInByQuarter(inputBitmap, 3)}
        ]
    }});


buttons.push({name: 'Zoom Out 1', fun: (inputBitmap) => {
        return [
            {name: '0', bitmap: bitmapProcessing_ZoomOutByQuarter(inputBitmap, 0)},
            {name: '1', bitmap: bitmapProcessing_ZoomOutByQuarter(inputBitmap, 1)},
            {name: '', bitmap: bitmapProcessing_ZoomOut(inputBitmap)},
            {name: '2', bitmap: bitmapProcessing_ZoomOutByQuarter(inputBitmap, 2)},
            {name: '3', bitmap: bitmapProcessing_ZoomOutByQuarter(inputBitmap, 3)}
        ]
    }});

buttons.push({name: 'Zoom Out 2', fun: (inputBitmap) => {
        var lastBitmap = inputBitmap;
        var allBitmaps = [];
        for (var i = 1; i < 10; i++) {
            lastBitmap = bitmapProcessing_ZoomOut(lastBitmap);
            allBitmaps.push({name: i, bitmap: lastBitmap});
        }
        return allBitmaps;
    }});

buttons.push({name: 'Random Distribution', fun: (inputBitmap) => {
        return [
            {name: '2', bitmap: bitmapProcessing_RandomDistribution(inputBitmap, 2)},
            {name: '4', bitmap: bitmapProcessing_RandomDistribution(inputBitmap, 4)},
            {name: '8', bitmap: bitmapProcessing_RandomDistribution(inputBitmap, 8)},
            {name: '16', bitmap: bitmapProcessing_RandomDistribution(inputBitmap, 16)},
            {name: '32', bitmap: bitmapProcessing_RandomDistribution(inputBitmap, 32)},
        ]
    }});








function bitmapProcessing_RotationK90(myBitmap, angle, version)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);
    switch (angle)
    {
        case 90:
            if (version == 1)
            {
                for (let x = 0; x < myWidth; x++)
                {
                    for (let y = 0; y < myHeight; y++)
                    {
                        myNewBitmap.setPixel(255 - y, x, myBitmap.getPixel(x, y));
                    }
                }

            } else // version 2
            {
                for (let x = 0; x < myWidth; x++)
                {
                    for (let y = 0; y < myHeight; y++)
                    {
                        myNewBitmap.setPixel(x, y, myBitmap.getPixel(y, 255 - x));
                    }
                }

            }
            break;
        case 180:
            if (version == 1)
            {
                for (let x = 0; x < myWidth; x++)
                {
                    for (let y = 0; y < myHeight; y++)
                    {
                        myNewBitmap.setPixel(255 - x, 255 - y, myBitmap.getPixel(x, y));
                    }
                }

            } else // version 2
            {
                for (let x = 0; x < myWidth; x++)
                {
                    for (let y = 0; y < myHeight; y++)
                    {
                        myNewBitmap.setPixel(x, y, myBitmap.getPixel(255 - x, 255 - y));
                    }
                }

            }
            break;
        case 270:
            if (version == 1)
            {
                for (let x = 0; x < myWidth; x++)
                {
                    for (let y = 0; y < myHeight; y++)
                    {
                        myNewBitmap.setPixel(y, 255 - x, myBitmap.getPixel(x, y));
                    }
                }

            } else // version 2
            {
                for (let x = 0; x < myWidth; x++)
                {
                    for (let y = 0; y < myHeight; y++)
                    {
                        myNewBitmap.setPixel(x, y, myBitmap.getPixel(255 - y, x));
                    }
                }

            }
            break;
    }

    return myNewBitmap;
}




function bitmapProcessing_RotationTheta(myBitmap, theta) {
    var w = myBitmap.width;
    var h = myBitmap.height;
    myNewBitmap = new ImageData(w, h);
    var cost = Math.cos(-theta * Math.PI / 180.0);
    var sint = Math.sin(-theta * Math.PI / 180.0);
    var xs = w / 2;
    var ys = h / 2;

    for (var x = 0; x < w; x++)
    {
        for (var y = 0; y < h; y++)
        {
            var x1 = Math.round(xs + ((x - xs) * cost - (y - ys) * sint + 0.5));
            var y1 = Math.round(ys + ((x - xs) * sint + (y - ys) * cost + 0.5));
            if ((x1 >= 0) && (x1 < w) && (y1 >= 0) && (y1 < h))
                myPixel = myBitmap.getPixel(x1, y1);
            else
                myPixel = {r: 255, g: 127, b: 255, a: 255};

            myNewBitmap.setPixel(x, y, myPixel);
        }
    }
    return myNewBitmap;
}
function bitmapProcessing_RotationThetaA(myBitmap, theta) {
    var w = myBitmap.width;
    var h = myBitmap.height;
    myNewBitmap = new ImageData(w, h);
    var cost = Math.cos(-theta * Math.PI / 180.0);
    var sint = Math.sin(-theta * Math.PI / 180.0);
    var xs = w / 2;
    var ys = h / 2;

    for (var x = 0; x < w; x++)
    {
        for (var y = 0; y < h; y++)
        {
            var x1 = Math.round(xs + ((x - xs) * cost - (y - ys) * sint + 0.5));
            var y1 = Math.round(ys + ((x - xs) * sint + (y - ys) * cost + 0.5));
            myNewBitmap.setPixel(x1, y1, myBitmap.getPixel(x, y));
        }
    }
    return myNewBitmap;
}
function bitmapProcessing_Reflections(myBitmap, version)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);
    switch (version)
    {
        case 0:
            for (var x = 0; x < myWidth; x++)
            {
                for (var y = 0; y < myHeight; y++)
                {
                    myNewBitmap.setPixel(255 - x, y, myBitmap.getPixel(x, y));
                }
            }

            break;
        case 1:
            for (var x = 0; x < myWidth; x++)
            {
                for (var y = 0; y < myHeight; y++)
                {
                    myNewBitmap.setPixel(x, 255 - y, myBitmap.getPixel(x, y));
                }
            }

            break;
        case 2:
            for (var x = 0; x < myWidth; x++)
            {
                for (var y = 0; y < myHeight; y++)
                {
                    myNewBitmap.setPixel(y, x, myBitmap.getPixel(x, y));
                }
            }

            break;
        case 3:
            for (var x = 0; x < myWidth; x++)
            {
                for (var y = 0; y < myHeight; y++)
                {
                    myNewBitmap.setPixel(255 - x, 255 - y, myBitmap.getPixel(x, y));
                }
            }

            break;
    }
    return myNewBitmap;
}

function bitmapProcessing_ZoomIn(myBitmap)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);

    for (var x = 0; x < myWidth / 2; x++)
    {
        for (var y = 0; y < myHeight / 2; y++)
        {
            var myPixel = myBitmap.getPixel(myWidth / 4 + x, myHeight / 4 + y);
            myNewBitmap.setPixel(2 * x, 2 * y, myPixel);
            myNewBitmap.setPixel(2 * x, 2 * y + 1, myPixel);
            myNewBitmap.setPixel(2 * x + 1, 2 * y, myPixel);
            myNewBitmap.setPixel(2 * x + 1, 2 * y + 1, myPixel);
        }
    }

    return myNewBitmap;
}
function bitmapProcessing_ZoomInByQuarter(myBitmap, quarter)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);
    var dx = quarter == 1 || quarter == 3;
    var dy = quarter == 2 || quarter == 3;

    for (var x = 0; x < myWidth / 2; x++)
    {
        for (var y = 0; y < myHeight / 2; y++)
        {
            var myPixel = myBitmap.getPixel(dx * (myWidth / 2) + x,
                    dy * (myHeight / 2) + y);
            myNewBitmap.setPixel(2 * x, 2 * y, myPixel);
            myNewBitmap.setPixel(2 * x, 2 * y + 1, myPixel);
            myNewBitmap.setPixel(2 * x + 1, 2 * y, myPixel);
            myNewBitmap.setPixel(2 * x + 1, 2 * y + 1, myPixel);
        }
    }

    return myNewBitmap;
}

function bitmapProcessing_ZoomOut(myBitmap)
{
    var myWidth = 128;
    var myHeight = 128;

    var myNewBitmap = new ImageData(256, 256);

    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            myNewBitmap.setPixel(x, y, myBitmap.getPixel(2 * x, 2 * y));
            myNewBitmap.setPixel(x + myWidth, y, myBitmap.getPixel(2 * x + 1, 2 * y));
            myNewBitmap.setPixel(x, y + myHeight, myBitmap.getPixel(2 * x, 2 * y + 1));
            myNewBitmap.setPixel(x + myWidth, y + myHeight, myBitmap.getPixel(2 * x + 1, 2 * y + 1));
        }
    }

    return myNewBitmap;
}
function bitmapProcessing_ZoomOutByQuarter(myBitmap, quarter)
{
    var myWidth = 128;
    var myHeight = 128;

    var myNewBitmap = new ImageData(256, 256);
    var dx = quarter == 1 || quarter == 3;
    var dy = quarter == 2 || quarter == 3;

    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var myPixel = myBitmap.getPixel(2 * x + dx, 2 * y + dy);

            myNewBitmap.setPixel(x, y, myPixel);
            myNewBitmap.setPixel(x + myWidth, y, myPixel);
            myNewBitmap.setPixel(x, y + myHeight, myPixel);
            myNewBitmap.setPixel(x + myWidth, y + myHeight, myPixel);
        }
    }

    return myNewBitmap;
}
function bitmapProcessing_RandomDistribution(myBitmap, coeff)
{
    var myNewBitmap = new ImageData(256, 256);

    var side = 256 / coeff;
    var howMany = coeff * coeff;
    var myNumbers = [], myControlNumbers = [];

    for (var i = 0; i < howMany; i++)
    {
        myNumbers[ i ] = -1;
        myControlNumbers[ i ] = 0;
    }

    for (var i = 0; i < howMany; i++)
    {
        do
            var randomNumber = Math.floor(Math.random() * howMany);
        while (myControlNumbers[ randomNumber ] > 0)
        myNumbers[ i ] = randomNumber;
        myControlNumbers[ randomNumber ] = 1;
    }

    for (var w = 0; w < coeff; w++)
        for (var k = 0; k < coeff; k++)
        {
            var segment = w * coeff + k;
            var segment2 = myNumbers[ segment ] | 0;
            var w2 = Math.floor(segment2 / coeff);
            var k2 = segment2 % coeff;
            for (var y = 0; y < side; y++)
            {
                for (var x = 0; x < side; x++)
                {
                    myNewBitmap.setPixel(k2 * side + x, w2 * side + y, myBitmap.getPixel(k * side + x, w * side + y));

                }
            }
        }

    return myNewBitmap;
}