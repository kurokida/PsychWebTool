This is the tutorial to use PsychWebTool. This tutorial creates an demo program which present a message, receive a key response and present a circle in your browser. Internet connection is not needed except for download, i.e. the program can run not only online but also offline.

# Download
Please download all files from [GitHub.](https://github.com/kurokida/PsychWebTool){:target="_blank"}

![download](./images/download.png)

# A template html file
This is a template html file for almost all PsychWebTool (PWT) programs. The template.html is located in the **demo** folder you downloaded. You can get started by adding your original code to the file, and need not to know the content of the file in detail.

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
    document.addEventListener("mouseup", mouseUpFunc);
    document.addEventListener("mousedown", mouseDownFunc);
    document.addEventListener("mousemove", mouseMoveFunc);
    
    runExp();
}

// Please note that when you change the size of the window the program is initialized.
resizeTimer = false;
resizeFlag = true;
onresize = function (){
    if (resizeFlag) {
        if (resizeTimer !== false) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(function() {
            location.reload();
        }, 200);
    }
}

async function runExp() { // "async" is needed.
    myCanvas = document.getElementById('mainCanvas');
    if (!myCanvas || !myCanvas.getContext) {
        alert("Your web browser does not meet the requirements for this program.");
        return false;
    }

    // Canvas fits the entire window
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;

    centerX = myCanvas.width / 2;
    centerY = myCanvas.height / 2;

    ctx = myCanvas.getContext('2d');

    bgColor = "rgb(128, 128, 128)"; // Back ground color
    stimColor = "rgb(255, 255, 255)"; // Stimulus color

    clearWindow(ctx, bgColor); // fill the window with bgColor
    ctx.font = "22px 'Arial'"; // font size and name

    ////////////////////////////////////////////////
    // Please write your original code from here


    ////////////////////////////////////////////////

    clearWindow(ctx, bgColor);
    drawText(ctx, 'The experiment finished.', centerX, centerY, stimColor);
    resizeFlag = false;

}

</script>
</head>
<body>
    <canvas id="mainCanvas"></canvas> 
    <canvas id="circleID"></canvas> 
</body>
</html>
```

# Step 1: Set the HTML lang atribute

You will find the template html file in the demo folder you downloaded. Please copy the file and paste it in the same folder or in the new folder which must be made in the same location of the **demo** folder. Name the file as you like.

Open the file using a text editor your preferred. I preferred [Visual Studio Code](https://code.visualstudio.com/).

Please change the HTML lang in accordance with your experiment. You will see language codes in [w3schools.com](https://www.w3schools.com/tags/ref_language_codes.asp).

```
<html lang="ja">
```

# Step 2: Present a message

Add the next line immediately after the comment **"Please write your original code from here"**.

```
// Please write your original code from here
drawText(ctx, 'Please press the space key.', centerX, centerY, stimColor);
```

Please open the file using a modern web browser, and you will see the message. Google Chrome or Firefox is recommended. 

# Step 3: Receive a response

Add the next line immediately after the *drawText* function.

```
await pressKey([" "]);
```

**_await_** is a very important keyword in PsychWebTool, please do not forget it. The space between double quotation is also important. pressKey([" "]) means waiting for the space key. If you are waiting for the "s" key, you should write as follows.

```
await pressKey(["s"]);
```

# Step 4: Present a circle

Add the next two lines immediately after the *pressKey* function.

```
clearWindow(ctx, bgColor); 
fillOval(ctx, centerX, centerY, 20, stimColor);
```

The *clearWindow* function deletes the instruction, and the *fillOval* function presents a circle of which radius is 20 at coordinates (centerX, centerY) with the color of stimColor.

Please save and open the file. Please press the space key after the instruction, then you will see a circle.