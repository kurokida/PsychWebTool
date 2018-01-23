If you do not see [the basic tutorial page](howtouse.md), please learn it at first.

Please copy and paste the template html file in the demo folder or in the new folder which must be made in the same location of the demo folder.

Add the next lines immediately after the comment “Please write your original code from here”.

```
zoom = 0.7; // More than 1 expand an image, less than 1 downsize an image. 
imageFileName = '../images/1.jpg';
testImage = await loadImage(imageFileName);
showImage(ctx, testImage, centerX, centerY, zoom); 
```

You should call the *loadImage* function with **_await_** keyword per an image file for a precise presentation time. Be careful that the *loadImage* function takes time, so you should call it before the experimental timeline.

If you wait for a key response after presentation of a image, add the next line immediately after the *showImage* function. In this case, the image remains until the response.

```
await pressKey([" "]);
clearWindow(ctx, bgColor); // delete the image
```

If you present a image for a certain amount of time, add the next lines immediately after the *showImage* function.

```
await milliseconds(1000);
clearWindow(ctx, bgColor); // delete the image
await pressKey([" "]);
```

Please refer to the demo/imageRTKeyDemo.html.
        