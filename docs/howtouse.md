This page shows how to use PsychWebTool.

# A template of a html file
```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/jspsych.js"></script>
    <script type="text/javascript" src="../js/pwt.js"></script>
<title>Page title whatever you want</title>
<style type="text/css">
/* Please add your css here or in an external file */
body {
    margin: 0;
    padding: 0;
}
#mainCanvas {
    position:absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
}
</style>

<script type="text/javascript">

onload = function() {
    document.addEventListener("keyup", keyUpFunc);
    document.addEventListener("keydown", keyDownFunc);
    document.addEventListener("mousedown", mouseDownFunc);
    document.addEventListener("mousemove", mouseMoveFunc);
    
    runExp();
}

// Please note that when you change the size of the window the program is initialized.
resizeTimer = false;
onresize = function (){
    if (resizeTimer !== false) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function() {
        location.reload();
    }, 200);
}

async function runExp() { // "async" is needed.
    myCanvas = document.getElementById('mainCanvas');
    if (!myCanvas || !myCanvas.getContext) {
        alert("Your web browser does not meet the requirements for this program.");
        return false;
    }

    participant = prompt('Please enter your name.');

    // Canvas fits the entire window
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;

    centerX = myCanvas.width / 2;
    centerY = myCanvas.height / 2;

    zoom = 0.7; // More than 1 expand an image, less than 1 downsize an image. 
    
    ctx = myCanvas.getContext('2d');

    bgColor = "rgb(128, 128, 128)"; // Back ground color
    stimColor = "rgb(255, 255, 255)"; // Stimulus color

    images = [
        '../images/1.jpg',
        '../images/2.jpg',
        '../images/3.jpg',
    ];

    randImages = randomization(images, 3); // the second argument means the number of repetitions

    for (i = 0; i < randImages.length; i++) {
        testImage = await loadImage(randImages[i]);

        clearWindow(ctx, bgColor);
        ctx.font = "22px 'Arial'";
        drawText(ctx, 'Please press a space key.', centerX, centerY, stimColor);
        await pressKey([" "]); // A space between double quotation is needed.

        clearWindow(ctx, bgColor);
        
        // fixation cross
        drawLine(ctx, centerX, centerY - 10, centerX, centerY + 10, 4, "rgb(0, 0, 0)"); // vertical line
        drawLine(ctx, centerX - 10, centerY, centerX + 10, centerY, 4, "rgb(0, 0, 0)"); // horizontal line
        await milliseconds(1000);

        drawText(ctx, 'Please press a space key.', centerX, 100, stimColor);
        startTime = showImage(ctx, testImage, centerX, centerY, zoom); // "showImage" function returns a time when the image appears in a display.
        
        await pressKey([" "]); // waiting for a key response (space key)
        rt = keyDownEvent.timeStamp - startTime; // reaction time
        
        trial_data = {};
		trial_data['participant'] = participant;
		trial_data['trial'] = i + 1;
        trial_data['imgFile'] = randImages[i];
        trial_data['RT'] = rt;

        writeData(trial_data);
    }

    clearWindow(ctx, bgColor);

    saveCSV(participant);

    drawText(ctx, 'The experiment has finished.', centerX, centerY, stimColor);

}

</script>
</head>
<body>
    <canvas id="mainCanvas"></canvas> 
    <canvas id="circleID"></canvas> 
</body>
</html>

```
