buttons.push({name: 'Load images', fun: (inputBitmap) => {
        var fileNames = ['lena256.png', 'airplane256.png', 'cicada256.png', 'mandrill256.png', 'monkey256.png', 'parrots256.png', 'tire256.png', 'janusz256.png'];
        changeCanvasesCount(fileNames.length);
        var canvases = document.querySelectorAll('.canvases canvas');//lista wszystkich canvasów

        for (var i = 0; i < fileNames.length; i++) {
            var img = new Image();
            img.context = canvases[i].getContext("2d");
            img.onload = function () {
                this.context.drawImage(this, 0, 0);
            };
            img.crossOrigin = 'Anonymous';
            img.src = 'img/' + fileNames[i];
        }
    }});
buttons.push({name: 'Load specialized images', fun: (inputBitmap) => {
        var fileNames = ['black_rectangles256.png', 'cross_board256.png', 'five_rectangles256.png', 'for_histogram256.png', 'grid256.png', 'lena_distortions256.png', 'tire256.png', 'janusz256.png'];
        changeCanvasesCount(fileNames.length);
        var canvases = document.querySelectorAll('.canvases canvas');//lista wszystkich canvasów

        for (var i = 0; i < fileNames.length; i++) {
            var img = new Image();
            img.context = canvases[i].getContext("2d");
            img.onload = function () {
                this.context.drawImage(this, 0, 0);
            };
            img.crossOrigin = 'Anonymous';
            img.src = 'img/' + fileNames[i];
        }
    }});
