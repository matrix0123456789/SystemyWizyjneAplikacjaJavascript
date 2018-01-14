buttons.push({name: 'RGB Channels in Color', fun: (inputBitmap) => {
        var red = bitmapProcessing_Channel(inputBitmap, 'r', false);
        var green = bitmapProcessing_Channel(inputBitmap, 'g', false);
        var blue = bitmapProcessing_Channel(inputBitmap, 'b', false);
        return [
            {name: 'Red', bitmap: red},
            {name: 'Green', bitmap: green},
            {name: 'Blue', bitmap: blue},
            {name: 'Mix', bitmap: bitmapProcessing_CombineChannels(red, green, blue)},
        ]
    }});

buttons.push({name: 'RGB to Gray and B/W', fun: (inputBitmap) => {
        return [
            {name: 'Gray 1', bitmap: bitmapProcessing_Gray(inputBitmap, 1)},
            {name: 'Gray 2', bitmap: bitmapProcessing_Gray(inputBitmap, 2)},
            {name: 'BW 63', bitmap: bitmapProcessing_BW(inputBitmap, 63)},
            {name: 'BW 127', bitmap: bitmapProcessing_BW(inputBitmap, 127)},
            {name: 'BW 191', bitmap: bitmapProcessing_BW(inputBitmap, 191)},
        ]
    }});

buttons.push({name: 'Gray version', fun: (inputBitmap) => {
        return [
            {name: 'Gray 1', bitmap: bitmapProcessing_GrayBitmap(inputBitmap, 0.333, 0.333, 0.333)},
            {name: 'Gray 2', bitmap: bitmapProcessing_GrayBitmap(inputBitmap, 0.2989, 0.5866, 0.1145)},
            {name: 'Gray 3', bitmap: bitmapProcessing_GrayBitmap(inputBitmap, 0.5866, 0.2989, 0.1145)},
            {name: 'Gray 4', bitmap: bitmapProcessing_GrayBitmap(inputBitmap, 0.1145, 0.2989, 0.5866)},
        ]
    }});

buttons.push({name: 'Average color', fun: (inputBitmap) => {
        return [
            {name: '', bitmap: bitmapProcessing_AverageColorBitmap(inputBitmap, 2)},
            {name: '', bitmap: bitmapProcessing_AverageColorBitmap(inputBitmap, 4)},
            {name: '', bitmap: bitmapProcessing_AverageColorBitmap(inputBitmap, 8)},
            {name: '', bitmap: bitmapProcessing_AverageColorBitmap(inputBitmap, 16)},
            {name: '', bitmap: bitmapProcessing_AverageColorBitmap(inputBitmap, 32)},
            {name: '', bitmap: bitmapProcessing_AverageColorBitmap(inputBitmap, 64)},
            {name: '', bitmap: bitmapProcessing_AverageColorBitmap(inputBitmap, 128)},
            {name: '', bitmap: bitmapProcessing_AverageColorBitmap(inputBitmap, 256)},
        ]
    }});

buttons.push({name: 'Quantum color', fun: (inputBitmap) => {
        return [
            {name: '', bitmap: bitmapProcessing_QuantumColorBitmap(inputBitmap, 1)},
            {name: '', bitmap: bitmapProcessing_QuantumColorBitmap(inputBitmap, 2)},
            {name: '', bitmap: bitmapProcessing_QuantumColorBitmap(inputBitmap, 4)},
            {name: '', bitmap: bitmapProcessing_QuantumColorBitmap(inputBitmap, 8)},
            {name: '', bitmap: bitmapProcessing_QuantumColorBitmap(inputBitmap, 16)},
            {name: '', bitmap: bitmapProcessing_QuantumColorBitmap(inputBitmap, 32)},
            {name: '', bitmap: bitmapProcessing_QuantumColorBitmap(inputBitmap, 64)},
            {name: '', bitmap: bitmapProcessing_QuantumColorBitmap(inputBitmap, 128)},
            {name: '', bitmap: bitmapProcessing_QuantumColorBitmap(inputBitmap, 256)},
        ]
    }});
function bitmapProcessing_Channel(myBitmap, channel, allOut)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);

    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var myPixel = myBitmap.getPixel(x, y);
            if (allOut) {
                var myNewPixel = {r: myPixel[channel], g: myPixel[channel], b: myPixel[channel], a: 255}
            } else {
                var myNewPixel = {r: 0, g: 0, b: 0, a: 255}
                myNewPixel[channel] = myPixel[channel];
            }
            myNewBitmap.setPixel(x, y, myNewPixel);
        }
    }

    return myNewBitmap;
}

function bitmapProcessing_CombineChannels(red, green, blue)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);

    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var myPixelR = red.getPixel(x, y);
            var myPixelG = green.getPixel(x, y);
            var myPixelB = blue.getPixel(x, y);
            var myNewPixel = {r: myPixelR.r, g: myPixelG.g, b: myPixelB.b, a: 255}

            myNewBitmap.setPixel(x, y, myNewPixel);
        }
    }

    return myNewBitmap;
}

function bitmapProcessing_Gray(myBitmap, version)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);

    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var myPixel = myBitmap.getPixel(x, y);
            if (version == 1)
                var myGray = (myPixel.r + myPixel.g + myPixel.b) / 3;
            else
                var myGray = myPixel.r * 0.2989 + myPixel.g * 0.5866 + myPixel.b * 0.1145;

            var myNewPixel = {r: myGray, g: myGray, b: myGray, a: 255}

            myNewBitmap.setPixel(x, y, myNewPixel);
        }
    }

    return myNewBitmap;
}
function bitmapProcessing_GrayBitmap(myBitmap, rCoeff, gCoeff, bCoeff)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);

    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var myPixel = myBitmap.getPixel(x, y);

            var myGray = myPixel.r * rCoeff + myPixel.g * gCoeff + myPixel.b * bCoeff;

            var myNewPixel = {r: myGray, g: myGray, b: myGray, a: 255}

            myNewBitmap.setPixel(x, y, myNewPixel);
        }
    }

    return myNewBitmap;
}

function bitmapProcessing_BW(myBitmap, level)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);

    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var myPixel = myBitmap.getPixel(x, y);

            var myGray = myPixel.r * 0.2989 + myPixel.g * 0.5866 + myPixel.b * 0.1145;

            if (myGray > level)
                var myNewPixel = {r: 255, g: 255, b: 255, a: 255}
            else
                var myNewPixel = {r: 0, g: 0, b: 0, a: 255}
            myNewBitmap.setPixel(x, y, myNewPixel);
        }
    }

    return myNewBitmap;
}

function bitmapProcessing_QuantumColorBitmap(myBitmap, quantums)
{
    var myWidth = 256;
    var myHeight = 256;

    var myNewBitmap = new ImageData(256, 256);
    var gap = 256 / quantums;
    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var myPixel = myBitmap.getPixel(x, y);
            myPixel.r = Math.round(myPixel.r / gap) * gap;
            myPixel.g = Math.round(myPixel.g / gap) * gap;
            myPixel.b = Math.round(myPixel.b / gap) * gap;
            myNewBitmap.setPixel(x, y, myPixel);
        }
    }

    return myNewBitmap;
}