buttons.push({name: 'Filters', fun: (inputBitmap) => {
        var ret = [];
        for (var filter of window.filters) {
            ret.push({name: filter.name, bitmap: bitmapProcessing_MatrixFilter(inputBitmap, filter.matrix)});
        }
        return ret;
    }});

buttons.push({name: 'Filtr medianowy, minimalny i maksymalny', fun: (inputBitmap) => {
        var ret = [];
        for (var i = 0; i < 9; i++) {
            ret.push({name: i + 1, bitmap: bitmapProcessing_FilterBySorting(inputBitmap, 3, i)});
        }
        return ret;
    }});

buttons.push({name: 'Redukcja szumu', fun: (inputBitmap) => {
        var ret = [];
        ret.push({name: "własny algorytm", bitmap: bitmapProcessing_NoiseReduction(inputBitmap, 3)});

        return ret;
    }});
window.filters = [
    {name: "rozmycie 3x3", matrix: [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]]},
    {name: "rozmycie 7x7", matrix: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]]},
    {name: "wyostrzenie 3x3", matrix: [
            [-1, -1, -1],
            [-1, 9, -1],
            [-1, 1, -1]]},
    {name: "wyostrzenie 5x5", matrix: [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, 25, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]]},
    {name: "Wykrywanie krawędzi", matrix: [
            [0, -1, 0],
            [-1, 4, -1],
            [0, -1, 0]]},
]
function bitmapProcessing_MatrixFilter(inputBitmap, matrix) {
    var myWidth = 256;
    var myHeight = 256;
    var matrixSize = matrix.length;
    var matrixOffsetForPixel = (matrixSize - 1) / 2;
    var normalize = 0;
    for (var mx = 0; mx < matrixSize; mx++) {
        for (var my = 0; my < matrixSize; my++) {
            normalize += matrix[mx][my];//sumujemy wartości w macierzy wejściowej
        }
    }
    if (normalize == 0) {
        normalize = 1;//zapobiega dzieleniu przez 0
    }
    var myNewBitmap = new ImageData(256, 256);
    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var myPixel = {r: 0, g: 0, b: 0};
            for (var mx = 0; mx < matrixSize; mx++) {
                for (var my = 0; my < matrixSize; my++) {
                    var old = calcPixelByOffset(x, y, mx, my, matrixSize);
                    var oldPixel = inputBitmap.getPixel(old.x, old.y);

                    myPixel.r += oldPixel.r * matrix[mx][my];//operacje są na liczbach zmiennoprzecinkowych
                    myPixel.g += oldPixel.g * matrix[mx][my];
                    myPixel.b += oldPixel.b * matrix[mx][my];
                }
            }
            myPixel.r = myPixel.r / normalize;
            myPixel.g = myPixel.g / normalize;
            myPixel.b = myPixel.b / normalize;
            myNewBitmap.setPixel(x, y, myPixel);
        }
    }
    return myNewBitmap;
}

function bitmapProcessing_FilterBySorting(inputBitmap, size, number) {
    var myWidth = 256;
    var myHeight = 256;
    var myNewBitmap = new ImageData(256, 256);
    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var pixels = [];
            for (var mx = 0; mx < size; mx++) {
                for (var my = 0; my < size; my++) {
                    var old = calcPixelByOffset(x, y, mx, my, size);
                    var oldPixel = inputBitmap.getPixel(old.x, old.y);

                    pixels.push(oldPixel);
                }
            }
            pixels = pixels.sort((a, b) => (a.r + a.g + a.b) - (b.r + b.g + b.b));//sortujemy całe piksele według jasności
            myNewBitmap.setPixel(x, y, pixels[number]);
        }
    }
    return myNewBitmap;
}
function bitmapProcessing_NoiseReduction(inputBitmap, size) {
    //Idea tego algorytmu polega na tym, że jeśli spośród 9 pikseli w sąsiedztwie nasz iksel jest najciemniejszy, to podmieniamy go na drógi najciemniejszy, a jeśli jest najjaśniejszy, to an drógi najjaśniejszy
    var myWidth = 256;
    var myHeight = 256;
    var myNewBitmap = new ImageData(256, 256);
    var pixelsToCompare = size * size;
    for (var x = 0; x < myWidth; x++)
    {
        for (var y = 0; y < myHeight; y++)
        {
            var pixels = [];
            for (var mx = 0; mx < size; mx++) {
                for (var my = 0; my < size; my++) {
                    var old = calcPixelByOffset(x, y, mx, my, size);
                    var oldPixel = inputBitmap.getPixel(old.x, old.y);
                    pixels.push(oldPixel);
                }
            }
            pixels = pixels.sort((a, b) => (a.r + a.g + a.b) - (b.r + b.g + b.b));//sortujemy całe piksele według jasności
            var myPixel = inputBitmap.getPixel(x, y);

            var first = pixels[0];
            var last = pixels[pixels.length - 1];
            if (myPixel.r == first.r && myPixel.g == first.g && myPixel.b == first.b)
                myPixel = pixels[1];
            else if (myPixel.r == last.r && myPixel.g == last.g && myPixel.b == last.b)
                myPixel = pixels[pixels.length - 2];


            myNewBitmap.setPixel(x, y, myPixel);
        }
    }
    return myNewBitmap;
}
function calcPixelByOffset(x, y, mx, my, size) {
    var offsetForPixel = (size - 1) / 2;
    var oldX = x - offsetForPixel + mx;
    var oldY = y - offsetForPixel + my;

    //jeśli wyjdziemy poza granice, udajemy że jest tam lustrzane odbicie bitmapy
    if (oldX > 255)
        oldX = 510 - oldX;
    else if (oldX < 0)
        oldX = -oldX;
    if (oldY > 255)
        oldY = 510 - oldY;
    else if (oldY < 0)
        oldY = -oldY;
    return{x: oldX, y: oldY};
}