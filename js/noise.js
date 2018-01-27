buttons.push({name: 'Noise', fun: (inputBitmap) => {
        var ret = [];
        ret.push({name: "Szumy czarne", bitmap: bitmapProcessing_AddNoise(inputBitmap, 1000, {r: 0, g: 0, b: 0})});
        ret.push({name: "Szumy białe", bitmap: bitmapProcessing_AddNoise(inputBitmap, 1000, {r: 255, g: 255, b: 255})});
        ret.push({name: "Szumy losowe", bitmap: bitmapProcessing_AddRandomNoise(inputBitmap, 1000, false)});
        ret.push({name: "Szumy losowe kolorowe", bitmap: bitmapProcessing_AddRandomNoise(inputBitmap, 1000, true)});

        return ret;
    }});


function bitmapProcessing_AddNoise(inputBitmap, count, newPixel) {
    var myNewBitmap = new ImageData(//kopia
            new Uint8ClampedArray(inputBitmap.data),
            inputBitmap.width,
            inputBitmap.height
            )
    var myWidth = 256;
    var myHeight = 256;
    for (var i = 0; i < count; i++) {
        var x = Math.floor(Math.random() * 255);
        var y = Math.floor(Math.random() * 255);
        myNewBitmap.setPixel(x, y, newPixel);
    }
    return myNewBitmap;
}
function bitmapProcessing_AddRandomNoise(inputBitmap, count, color) {
    var myNewBitmap = new ImageData(//kopia
            new Uint8ClampedArray(inputBitmap.data),
            inputBitmap.width,
            inputBitmap.height
            )
    var myWidth = 256;
    var myHeight = 256;
    for (var i = 0; i < count; i++) {
        var x = Math.floor(Math.random() * 255);
        var y = Math.floor(Math.random() * 255);
        var r, g, b;
        if (color) {
            r = Math.floor(Math.random() * 255);
            g = Math.floor(Math.random() * 255);
            b = Math.floor(Math.random() * 255);
        } else {
            r = g = b = Math.floor(Math.random() * 255);
        }
        var newPixel = {r, g, b}
        myNewBitmap.setPixel(x, y, newPixel);
    }
    return myNewBitmap;
}
