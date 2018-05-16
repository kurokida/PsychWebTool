There are some demonstration programs in the **main** folder you downloaded. These are usuful for understanding how to use PsychWebTool. 

# Demonstration programs list

## imageRTKeyDemo.html
When you open the file, you will see a small text box. Please enter your name or initial etc.

This program presents a fixation cross for 1000 ms, then a image until the key response. Three image files in the images folder was presented twice in a random order. The number of trials is 6 (3 x 2).

Data is stored as a CSV file named as the text you entered in the text box. A Reaction time for an image is recorded.

This demonstration is the most usuful for an actual experiment.

## imageRTMouseDemo.html

This demonstration is almost the same as the imageRTKeyDemo.html except that the response device is mouse.

When you open the file, you will see a small text box. Please enter your name or initial etc.

This program presents a fixation cross for 1000 ms, then a image until the mouse response. Three image files in the images folder was presented twice in a random order. The number of trials is 6 (3 x 2).

Data is stored as a CSV file named as the text you entered in the text box. A Reaction time for an image is recorded.

## soundImageDemo.html

Experimental conditions of this demonstration is more complex than that of imageRTKeyDemo.html. There are three images and three sounds. The number of trials is 9 (3 x 3).

When you open the file, you will see a small text box. Please enter your name or initial etc.

This program presents a fixation cross for 1000 ms, then a image with a sound for 5 seconds. After the observation, press a left or right arrow key as a response.

Data is stored as a CSV file named as the text you entered in the text box. A Reaction time for an image is recorded.

## keyDownEventDemo.html

In PsychWebTool keyDownEvent is a reserved word which holds the keyboard status. For example keyDownEvent holds the last key pressed and the time which can be used to calculate the response time.

The demonstartion waits for a key response. When you press any key you will see which key is pressed and the status of the *keyPressed* variable which is *true* during pressing the key and *false* release the key.

## mouseDownEventDemo.html

In PsychWebTool mouseDownEvent is a reserved word which holds the mouse status. For example mouseDownEvent holds the last button clicked and the time which can be used to calculate the response time.

The demonstartion waits for a mouse click. When you click any points of the window you will see the coordinates and the status of the *mouseClicked* variable which is *true* during pressing the button and *false* release the button.

## moveCircleDemo.html

The demonstration uses two canvases, one is for a whole window and the other is for a blue circle. The reason to use the two canvases is that the circle is presented smoothly. Although you can make a similar program using only a canvas, you have to delete the circle and redraw the circle in a next frame, which is not favorable for the smooth presentation. The same is true for motion stimuli. See motionDemo.html.

## motionDemo.html

The demonstration uses two canvases just like the moveCircleDemo.html. Moreover, this demonstrates how to use the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) method which enables to update an animation before the next repaint based on the display refresh rate. This is useful to not only animation but also rapid serial visual presentation (RSVP) tasks. See rsvpDemo.html.

## rsvpDemo.html

In rapid serial visual presentation (RSVP) tasks some images are presented in the same location in a very short period of time. This demonstrates how to use the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) method just like the motionDemo.html.

## formDemo.html

If you want to make participants fill in a form, this demonstration is helpful. After click the button, the experiment begins.