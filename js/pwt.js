let keyDownEvent = null;
let keyUpEvent = null;
let mouseDownEvent = null;
let mouseUpEvent = null;
let mouseMoveEvent = null;
let keyPressed = false; // This is true when any key is pressed
let mouseClicked = false;
let keyLock = false;
let mouseLock = false;
let viewingDistance = 0;
let ppcm = 0;

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
        keyDownEvent = null; // Initialize
        var id = setInterval(function(){
            if (!keyLock && !keyPressed && keyDownEvent && (array.indexOf(keyDownEvent.key) >= 0)) {
                clearInterval(id);
                // resolve(keyDownEvent.timeStamp); // to return the timestamp
                resolve(getMsecs()); // for Safari                
            } else {
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
        mouseDownEvent = null; // Initialize
        var id = setInterval(function(){
            if (!mouseLock && !mouseClicked && mouseDownEvent) {
                clearInterval(id);
                //resolve(mouseDownEvent.timeStamp); // to return the timestamp
                resolve(getMsecs()); // for Safari 
            } else {
                if (!mouseClicked) {
                    mouseDownEvent = null;
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

// maxWidthで自動改行できるが、単語の途中で改行されてしまう。
// function drawText(ctx, text, x, y, color, maxWidth) {
//     if (arguments.length == 5 || arguments.length == 6) {
//         ctx.fillStyle = color;
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle"
//         if (typeof maxWidth === 'undefined') {
//             ctx.fillText(text, x, y);
//         } else {
//             //ctx.fillText(text, x, y, maxWidth);
//             //var cw = canvas.width - 10; // canvasの幅-10はマージン
//             //var cy = 5; // 縦軸の書き出し位置
//             var cyp = 0;  // 改行幅。初期は改行しないので0
//             //var messeges = "あいうえお";
//             var mess = "";
//             var messArry = text.split(""); // 文字を一文字ずつ配列に入れる
//              for ( var i = 0; i < messArry.length; i++){
//                mess += messArry[i];              // 一文字ずつ文字を追記代入
//                var textwid = ctx.measureText(mess).width;  // 文字の長さを測る
//                //if ( cw > textwid ){
//                 if (textwid > maxWidth) {
//                   ctx.fillText(mess, x, y + cyp);
//                   cyp += 18; // 改行幅(文字サイズ+2)。+2はマージン
//                   mess = "";
//                }
//              }
//              ctx.fillText(mess, x, y + cyp);
//         }
//     } else {
//         throw new Error("Please check the number of the arguments.");
//     }
// }

function drawText(ctx, text, x, y, color, space) {
    if (arguments.length == 5 || arguments.length == 6) {
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"

        if (typeof space === 'undefined') {
            space = 20;
        }
        
        let column = [''];
        let line = 0;
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);

            if (char == "\n") {    
                line++;
                column[line] = '';
            }
            column[line] += char;
        }

        for (let j = 0; j < column.length; j++) {
            ctx.fillText(column[j], x, y - space * (column.length-1) / 2 + space * j);
        }
    } else {
        throw new Error("Please check the number of the arguments.");
    }
}

// function drawText(ctx, text, x, y, color, maxWidth) {
//     if (arguments.length == 5 || arguments.length == 6) {
//         ctx.fillStyle = color;
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle"
//         if (typeof maxWidth === 'undefined') {
//             ctx.fillText(text, x, y);
//         } else {
//             ctx.fillText(text, x, y, maxWidth);
//         }
//     } else {
//         throw new Error("Please check the number of the arguments.");
//     }
// }

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
        img.src = fileName;
        img.onload = function () {
            const tmpW = img.width * myZoom;
            const tmpH = img.height * myZoom;
            ctx.drawImage(img, 0, 0, img.width, img.height, centerX -tmpW / 2, centerY - tmpH / 2, tmpW, tmpH); 
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

function deg2pix(degrees) {
    return Math.tan(deg2rad(degrees)) * viewingDistance * ppcm;
}

function pix2deg(pixels) {
    return rad2deg(Math.atan(pixels/ppcm/viewingDistance));
}

function deg2rad(degrees) {
    return degrees * Math.PI / 180;
}

function rad2deg(radians) {
    return radians / Math.PI * 180;
}