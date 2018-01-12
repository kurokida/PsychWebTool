let keyDownEvent = null;
let keyUpEvent = null;
let mouseDownEvent = null;
let mouseUpEvent = null;
let mouseMoveEvent = null;
let keyPressed = false; // 現在、いずれかのキーが押されているかどうか
let mouseClicked = false;
let keyLock = false; // is it needed?
let mouseLock = false;

function keyDownFunc(e){
    if (!keyPressed) {
        keyDownEvent = e;
        keyPressed = true; // prevent keyDownCheck during already called. 
    }
}

function keyUpFunc(e){
    keyPressed = false;
    keyUpEvent = e;
}

function pressKey (array) {
    return new Promise(function(resolve){
        keyDownEvent = null; // それまでのキー入力を無効に
        var id = setInterval(function(){
            //if (!keyLock && !keyPressed && (keyDownEvent != null) && (array.indexOf(keyDownEvent.key) >= 0)) {
            if (!keyLock && !keyPressed && keyDownEvent && (array.indexOf(keyDownEvent.key) >= 0)) {
                clearInterval(id);
                //console.log("keyDownOK")
                //console.log(typeof(keyDownEvent));
                //console.log(keyDownEvent);
                //resolve('keyDownCheck success!'); // resolveの引数が重要。もしくはresolve()
                resolve(keyDownEvent.timeStamp); // resolveの引数が重要。もしくはresolve()
            } else {
                //keyFlag = true;
                if (!keyPressed) {
                    keyDownEvent = null;
                }
            }
        }, 1);
    })
}

function mouseDownFunc(e){
    if (!mouseClicked) {
        mouseDownEvent = e;
        mouseClicked = true;
        //console.log(mouseDownEvent.button)
    }
}

function mouseUpFunc(e){
    mouseClicked = false;
    mouseUpEvent = e;
}

function mouseMoveFunc(e){
    mouseMoveEvent = e;
}

function clickMouse () {
    return new Promise(function(resolve){
        mouseDownEvent = null; // それまでのキー入力を無効に
        var id = setInterval(function(){
            if (!mouseLock && !mouseClicked && mouseDownEvent) {
                clearInterval(id);
                resolve(mouseDownEvent.timeStamp);
                //console.log(mouseDownEvent.clientX);
                //resolve('mouseDownCheck success!'); // resolveの引数が重要。もしくはresolve()
            } else {
                if (!mouseClicked) {
                    mouseDownEvent = null; // それまでのキー入力を無効に
                }
            }
        }, 1);
    })
}


// randTypeが2のときは、すべての条件を１回ずつ呈示したあとに、次の繰り返しになる。また同じ条件が連続しない。
function randomization(array, repetitions, randType) {
    if (arguments.length == 2 || arguments.length == 3) {
        const myRandType = (typeof randType === 'undefined') ? 1 : randType;
        if (myRandType == 1) {
            return jsPsych.randomization.repeat(array, repetitions);
        } else {
            let myArray = [];
            for (let i = 0; i < repetitions; i++) {
                let tmp = [];
                if (i == 0) {
                    tmp = jsPsych.randomization.repeat(array, 1);
                    Array.prototype.push.apply(myArray, tmp);
                } else {
                    do {
                        tmp = jsPsych.randomization.repeat(array, 1);
                    } while (myArray[myArray.length-1] == tmp[0]);
                    Array.prototype.push.apply(myArray, tmp);
                }
            }
            return myArray;
        }
    }
}

function writeData (trial_data) {
    jsPsych.data.write2(trial_data);
}

function saveCSV(fileName) {
    jsPsych.data.localSave(fileName + '.csv', 'CSV');
    //jsPsych.data.get().localSave('csv', fileName + '.csv');
}

function getMsecs (){
    return performance.now();
    //return (new Date()).getTime();
}

function clearWindow(ctx, color) {
    if (arguments.length == 2) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    } else {
        throw new Error("Please check the number of the arguments.");
    }
}

function drawText(ctx, text, x, y, color, maxWidth) {
    if (arguments.length == 5 || arguments.length == 6) {
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"
        if (typeof maxWidth === 'undefined') {
            ctx.fillText(text, x, y);
        } else {
            ctx.fillText(text, x, y, maxWidth);
        }
    } else {
        throw new Error("Please check the number of the arguments.");
    }
}

function fillOval(ctx, x, y, radius, color) {
    if (arguments.length == 5) {
        ctx.fillStyle = color;
        //console.log(color);
        //ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.fill();
    } else {
        //console.log("Please check the number of the arguments.")
        throw new Error("Please check the number of the arguments.");
    }
}

function frameOval(ctx, x, y, radius, lineWidth, color) {
    if (arguments.length == 6) {
        ctx.strokeStyle = color;
        //console.log(color);
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.stroke();
    } else {
        throw new Error("Please check the number of the arguments.");
    }
}


// (x, y)は中心座標
function fillRect(ctx, x, y, frameWidth, frameHeight, color) {
    if (arguments.length == 6) {
        ctx.fillStyle = color;
        ctx.fillRect(x - frameWidth / 2, y - frameHeight / 2, frameWidth, frameHeight);
    } else {
        throw new Error("Please check the number of the arguments.");
    }   
}

function frameRect(ctx, x, y, frameWidth, frameHeight, lineWidth, color) {
    if (arguments.length == 7) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x - frameWidth / 2, y - frameHeight / 2, frameWidth, frameHeight);
    } else {
        throw new Error("Please check the number of the arguments.");
    }
}

function drawLine(ctx, x1, y1, x2, y2, lineWidth, color) {
    if (arguments.length == 7) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    } else {
        throw new Error("Please check the number of the arguments.");
    }
}

function fillTriangle(ctx, x1, y1, x2, y2, x3, y3, color){
    if (arguments.length == 8) {
        ctx.fillStyle = color;
        //ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();
    } else {
        throw new Error("Please check the number of the arguments.");
    }
}

function drawImage(ctx, fileName, centerX, centerY, zoom) {
    if (arguments.length == 4 || arguments.length == 5) {
        const myZoom = (typeof zoom === 'undefined') ? 1 : zoom;
        const img = new Image();
        //img.crossOrigin = "Anonymous";
        img.src = fileName;
        //img.style.display = 'none';
        img.onload = function () {
            const tmpW = img.width * myZoom;
            const tmpH = img.height * myZoom;
            //ctx.drawImage(img, centerX - img.width / 2, centerY - img.height / 2); 
            ctx.drawImage(img, 0, 0, img.width, img.height, centerX -tmpW / 2, centerY - tmpH / 2, tmpW, tmpH); 

            //console.log(img.width);
            //ctx.drawImage(img, x, y);
            //ctx.drawImage(img, canvasWidth / 2 - img.width / 2, canvasHeight / 2 - img.height / 2); // 中央に呈示（x, yが指定されなかったら？　画面中心座標を指定してもいいかも）
        }
    } else {
        throw new Error("Please check the number of the arguments.");
    }
}

function milliseconds(myTime) {
    return new Promise(function(resolve) {
        setTimeout(function(){
            //console.log('waitMsecs');
            resolve('waitMsecs success!')}, myTime)});
}

// function preloadImages(images) {
//     return new Promise(function(resolve) {
//         jsPsych.pluginAPI.preloadImages(images, function() {
//             resolve('preloadImages success!');
//             console.log('preload!');
//         });        
//     });
// }

function loadImage(fileName) {
    return new Promise(function(resolve) {
        const img = new Image();
        img.src = fileName;
        img.onload = function () {
            resolve(img);
        };
    });
}

function showImage(ctx, imageData, centerX, centerY, zoom) {
    if (arguments.length == 4 || arguments.length == 5) {
        const myZoom = (typeof zoom === 'undefined') ? 1 : zoom;
        const tmpW = imageData.width * myZoom;
        const tmpH = imageData.height * myZoom;
        ctx.drawImage(imageData, 0, 0, imageData.width, imageData.height, centerX -tmpW / 2, centerY - tmpH / 2, tmpW, tmpH); 
        return getMsecs();
    } else {
        throw new Error("Please check the number of the arguments.");
    }
}