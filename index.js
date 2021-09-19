const express = require('express');
const app = express();
app.use(express.static(__dirname)); // To access stylesheet.css
app.set('view engine', 'ejs');

const router = require('./routes/routes');

app.use('/', router);

app.listen(process.env.port||3000, () => {
    console.log('listening to 3000');
});
