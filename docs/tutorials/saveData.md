The PsychWebTool includes jsPsych v.5.0.3 and uses a lots of functions of it. I greately appreciate [Josh de Leeuw](https://twitter.com/joshdeleeuw) works. The PsychWebTool provides three ways to save experimental data permanently. 

## Save the data as an object per trial

This is a common procedures among the three saving ways.

```
trial_data = {};
trial_data['participant'] = participant;
trial_data['trial'] = i + 1;
trial_data['imgFile'] = randImages[i];
trial_data['RT'] = rt;
```

First, define a blank [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) of which name is whatever you want (here is **trial_data**). Then, set properties' value that you want to save **per trial**. The property names are used as column names of the CSV file. After setting properties' value, call the *writeData* function as follows.

```
writeData(trial_data);
```

The *writeData* function is adapted from the *[jsPsych.data.write](https://github.com/jspsych/jsPsych/blob/v5.0.3/docs/markdown_docs/core_library/jspsych-data.md#jspsychdatawrite)* function. Note that the *writeData* function must be called **per trial**. 

# Saving data as a CSV file in the participant's computer

This is the easiest way to save the data permanently, but it is not a suitable way if there are a lot of participants because you have to gather CSV files from participants' computer.

In the end of the experiment, call the *saveCSV* function as follows. Please refer to the demos/imageRTKeyDemo.html. 

```
saveCSV(participant);
```

The parameter of the saveCSV function (here is **participant**) is used as the name of the CSV file. The *saveCSV* function is the same as the *[jsPsych.data.localSave](https://github.com/jspsych/jsPsych/blob/v5.0.3/docs/markdown_docs/core_library/jspsych-data.md)* function. Note that the *saveCSV* function must be called **in the end of the experiment**.

# Saving data as a CSV file in a web server

If you conduct web-based experiments, it is a good way to save the data in the web server. This way does not require a database server, but a CSV file is made per participant. So, it might be hard to analyze all the data from a lot of files.

Please refer to the demos/save2serverDemo.html and the section: **Storing data permanently as a file** at [the jsPsych document](https://github.com/jspsych/jsPsych/blob/v5.0.3/docs/markdown_docs/features/data.md). 

# Storing data to a database server

This is a perfect way for web-based experiments, but a MySQL databsase server is needed. Please refer to the demos/databaseDemo.html and the section: **Storing data permanently in a MySQL database** at [the jsPsych document](https://github.com/jspsych/jsPsych/blob/v5.0.3/docs/markdown_docs/features/data.md). 

You will find the php/savedata.php you downloaded. 

Josh de Leeuw wrote at the above jsPsych document that 
> To use the above PHP script, you'll need to provide the credentials for your MySQL database. The PHP script is expecting the credentials to be stored in a separate PHP file called 'database_connect.php', located in the same directory as the PHP script. This file should look like:

```
<?php

$dbc = mysql_connect('localhost', 'username', 'password');
mysql_select_db('databasename', $dbc);

?>
```

> Replace the username and password strings with your database credentials, and replace the databasename string with the name of the database you are connecting to. 

So please edit the php/database_connect.php in accordance with the above instraction. Although both savedata.php and database_connect.php can be located anywhere, you have to set the path to savedata.php in the save_data function in the databaseDemo.html.