buttons.push({
    name: 'Posterize',
    fun: (inputBitmap) => {
        return [
            { name: '', bitmap: posterize(inputBitmap, 10) },
            { name: '', bitmap: posterize(inputBitmap, 8) },
            { name: '', bitmap: posterize(inputBitmap, 6) },
            { name: '', bitmap: posterize(inputBitmap, 4) },
            { name: '', bitmap: posterize(inputBitmap, 2) },
        ]
    }
});

function posterize(inputBitmap, levels) {
    var myNewBitmap = new ImageData(inputBitmap.width, inputBitmap.height);
    for (var x = 0; x < inputBitmap.width * inputBitmap.height * 4; x++) {
        myNewBitmap.data[x] = processPixel(inputBitmap.data[x], levels)
    }
    return myNewBitmap

}

function processPixel(pixel, levels) {
    var levels1 = levels - 1;
    var rlevel = (pixel >> 16) & 0xff;
    var glevel = (pixel >> 8) & 0xff;
    var blevel = pixel & 0xff;
    rlevel = (((rlevel * levels) >> 8) * 255) / levels1;
    glevel = (((glevel * levels) >> 8) * 255) / levels1;
    blevel = (((blevel * levels) >> 8) * 255) / levels1;
    return ((0xff000000 & pixel) | (rlevel << 16) | (glevel << 8) | blevel);
}