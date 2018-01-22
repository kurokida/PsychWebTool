If you do not see [the basic tutorial page](tutorials/howtouse.md), please learn it at first.

Please copy and paste the template html file in the same folder or in the new folder which must be made in the same location of the demo folder.

Add the next lines immediately after the comment “Please write your original code from here”.

```
zoom = 0.7; // More than 1 expand an image, less than 1 downsize an image. 
imageFileName = '../images/1.jpg';
testImage = await loadImage(imageFileName);
showImage(ctx, testImage, centerX, centerY, zoom); 
```

You should call the *loadImage* function with **_await_** keyword per an image file for a precise presentation time. Be careful that the *loadImage* function takes time, so you should call it before the experimental timeline.

Please refer to demo/imageRTKeyDemo.html.
        