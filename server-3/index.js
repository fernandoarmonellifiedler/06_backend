const express = require('express'); // Loads the express module
const app = express(); // Creates our express server
const port = 3000;
// Loads the handlebars module
const handlebars = require('express-handlebars');
// Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
// Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public')); // Serves static files (we need it to import a css file)


//I would like to use a real api but let's use this for the sake of the simplicity of the article
fakeApi = () => {
    return [
        {
            name: 'Katarina',
            lane: 'midlaner'
        },
        {
            name: 'Jayce',
            lane: 'toplaner'
        },
        {
            name: 'Heimerdinger',
            lane: 'toplaner'
        },
        {
            name: 'Zed',
            lane: 'midlaner'
        },
        {
            name: 'Azir',
            lane: 'midlaner'
        }
    ]

};

// Sets a basic route
app.get('/', (req, res) => {
    // Injects "main.handlebars" inside of the "index.handlebars" body
    //res.render('main', {layout: 'index'});
    //res.render('main', { layout: 'index', proPlayer: fakeApi() })
    res.render('main', {layout: 'index', suggestedChamps: fakeApi(), listExists: true});
});

// Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));