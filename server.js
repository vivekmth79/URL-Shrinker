const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/urls', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const searchText = req.query.q;
    let shortUrls;
    let errorMessage = '';

    if (searchText) {
        shortUrls = await ShortUrl.find({
            $or: [
                { full: { $regex: searchText, $options: 'i' } },
                { short: { $regex: searchText, $options: 'i' } },
                { note: { $regex: searchText, $options: 'i' } },
            ],
        }).exec();
    } else {
        shortUrls = await ShortUrl.find().exec();
    }

    res.render('index', { shortUrls, errorMessage });
});

app.post('/shortUrls', async (req, res) => {
    const { fullUrl, note } = req.body;
    const existingShortUrl = await ShortUrl.findOne({ full: fullUrl });

    if (existingShortUrl) {
        let errorMessage = 'URL already exists.';
        const shortUrls = await ShortUrl.find().exec();
        res.render('index', { shortUrls, errorMessage });
    } else {
        if (note) {
            const existingNote = await ShortUrl.findOne({ note: note });

            if (existingNote) {
                let errorMessage = 'Note already exists.';
                const shortUrls = await ShortUrl.find().exec();
                res.render('index', { shortUrls, errorMessage });
            } else {
                await ShortUrl.create({ full: fullUrl, note });
                res.redirect('/');
            }
        } else {
            await ShortUrl.create({ full: fullUrl });
            res.redirect('/');
        }
    }
});

app.listen(process.env.PORT || 5000);
