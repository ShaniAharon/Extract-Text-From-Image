
const express = require('express')
const cors = require('cors');

const multer = require('multer')

const tesseract = require("node-tesseract-ocr")


const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname + '/uploads')))
app.use(express.json()); 
app.use(cors());

app.set('view engine', "ejs")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    }
})

const upload = multer({ storage })

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    res.render('index', { data: '' })
})


app.post('/api/test', async (req, res) => {
    const { imgUrl } = req.body; 

    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
    }

    tesseract
        .recognize(imgUrl, config)
        .then((text) => {
            // console.log("Result:", text)
            //{ data: text }
            res.send(text)
        })
        .catch((error) => {
            console.log(error.message)
        })

});

app.listen(3030, () => {
    console.log('app is listening on pot 3030');
})

