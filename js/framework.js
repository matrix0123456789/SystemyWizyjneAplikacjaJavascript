var buttons = []; //Ta tablica będzie zawierała wszystkie przyciski



addEventListener('load', generateButtons);

//ta funkcja generuje przyciski w bocznym menu
function generateButtons() {
    for (var buttonInfo of buttons) {//tablica buttons zawiera informacje o przyciskach
        var button = document.createElement('li'); //tworzymy przycisk
        button.textContent = buttonInfo.name;//nadajemy mu nazwę
        button.buttonInfo = buttonInfo;
        button.onclick = function () {//gdy klikniemy na przycisk
            var canvas = document.querySelector('.canvases canvas');//wybieramy element typu canvas
            var context = canvas.getContext("2d");
            var imageData = context.getImageData(0, 0, 256, 256);//pobieramy dane z pierwszego
            var newBitmaps = this.buttonInfo.fun(imageData, context);//wykonujemy funkcję odpowiadającą przyciskowi
            if (newBitmaps) {
                changeCanvasesCount(newBitmaps.length + 1);
                var canvases = document.querySelectorAll('.canvases canvas');//lista wszystkich canvasów
                for (var i = 0; i < newBitmaps.length; i++) {
                    canvases[i + 1].getContext("2d").putImageData(newBitmaps[i].bitmap, 0, 0);//wyświetlamy obrazek na ekranie, ale pomijając pierwszy (źródłowy)
                    canvases[i + 1].parentNode.querySelector('.name').textContent = newBitmaps[i].name;
                }
            }
        };
        document.querySelector('.buttons').appendChild(button);
    }
}
//obiekt typu ImageData nie zawiera fukcji setpixel ani getPixel, więc dopisujemy ją sobie sami
ImageData.prototype.getPixel = function (x, y) {
    var index = (y | 0) * 1024 + (x | 0) * 4;
    return {r: this.data[index], g: this.data[index + 1], b: this.data[index + 2], a: this.data[index + 3]};
}
ImageData.prototype.setPixel = function (x, y, pixel) {
    var index = y * 1024 + x * 4;
    this.data[index] = pixel.r;
    this.data[index + 1] = pixel.g;
    this.data[index + 2] = pixel.b;
    this.data[index + 3] = pixel.a;
}

function changeCanvasesCount(newCount) {
    var divs = document.querySelectorAll('.canvases > div');
    var count = divs.length;//ile mamy w tym momencie canvasów
    while (count > newCount) {//jest za dużo, usuwamy zbędne
        divs[count - 1].remove();
        count--;
    }
    while (count < newCount) {//jest za mało, dodajemy nowe
        var newDiv = document.createElement('div');

        newDiv.onclick = function () {//po kliknięciu w obrazek
            this.parentNode.insertBefore(this, this.parentNode.firstChild);//laduje on na początku listy
        }

        var name = document.createElement('div');
        name.classList.add('name');
        newDiv.appendChild(name);
        var newCanvas = document.createElement('canvas');
        newCanvas.width = 256;
        newCanvas.height = 256;
        newDiv.appendChild(newCanvas);
        document.querySelector('.canvases').appendChild(newDiv);
        count++;
    }
}
changeCanvasesCount(1);//tworzymy jeden pusty canvas na start
