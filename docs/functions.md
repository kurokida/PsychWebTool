pressKey
clickMouse
randomization
writeData
saveCSV
getMsecs
clearWindow

##pressKey
This function pauses execution of a program, and waits for a key press. The function needs the ***await*** expression. 

The arugument of the pressKey fuction is an array of key names. For example, 
```
await pressKey(["s"]);
```
waits for the "s" key is pressed.
```
await pressKey(["ArrowLeft", "ArrowRight"]); 
```
waits for the "ArrowLeft" or "ArrowRight" key is pressed.
```
await pressKey([" "]);
```
waits for the "space" key is pressed. Note that there is a space between double quotations in an argument of the pressKey function; do not write like `pressKey(["space"])`.

To find the key names, the *keyDownEventDemo* which is in the main folder of the PWT package would work as a useful tool.