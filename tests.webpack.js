var context = require.context('./webpack', true, /.spec\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
