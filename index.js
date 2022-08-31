import express from 'express';
const app = express(function(){});
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));