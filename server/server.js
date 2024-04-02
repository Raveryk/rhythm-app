const express = require('express');
const app = express();
const cors = require('cors');
const port = 3005;

const uri = 'mongodb+srv://raveryk:MoiLKckq8sRDrL9x@rhythmappcluster.v1zo1xl.mongodb.net/?retryWrites=true&w=majority&appName=RhythmAppCluster'

const mongoose = require('mongoose');
mongoose
    .connect(uri)
    .catch(e => console.log(e));

const patternSchema = new mongoose.Schema({
    rows: {
        type: Number,
        required: true,
    },
    beats: {
        type: Number,
        required: true,
    },
    subs: {
        type: Number,
        required: true,
    },
    numOfCells: {
        type: Number,
        required: true,
    },
    clickedIds: {
        type: [],
        required: false
    },
    patternTitle: {
        type: String,
        required: true,
    },
})

const Pattern = mongoose.model('pattern', patternSchema);
Pattern.createIndexes();

// tells express what folder to look in for static content;
app.use(express.static('./public'))

// tells the app to allow CORS (Communication between separate hosts)
app.use(cors());

// Needed this line in order to not just get null or undefined returned
app.use(express.json())

const fakeDb = []

app.get('/patterns', async (req, res) => {
    try {
        let collection = await Pattern.find().exec();

        res.send(collection);
    } catch (e) {
        res.send('Error GETting patterns in DB: ' + e)
    }
    
})

app.post('/patterns', async (req, res) => {
    try {
        const pattern = new Pattern(req.body);
        let result = await pattern.save();
        result = result.toObject();
    } catch (e) {
        res.send('Error saving pattern in DB: ' + e)
    }
})


// TODO: Need to figure out how to Edit
app.put('/patterns/:patternId', async (req, res) => {
    try {
        const result = await Pattern.findByIdAndUpdate(req.params.patternId, req.body);
        res.send(result)
    } catch (e) {
        res.send('Error UPDATING pattern in DB: ' + e)
    }
})

app.delete('/patterns/:patternId', async (req, res) => {
    try {
        const result = await Pattern.findByIdAndDelete(req.params.patternId);
        res.send(result)
    } catch (e) {
        res.send('Error DELETING pattern in DB: ' + e)
    }
})


app.listen(port, () => {
    console.log(`Rhythm app listening on PORT: ${port}`)
})