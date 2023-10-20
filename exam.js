const express = require("express") // memanggil library express js
const bodyParser = require("body-parser") // memanggil library body-parser
const cors = require("cors") // memanggil library cors

const app = express() //implementasi express

// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())

// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({
    extended: true
}))

// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())

//codingan disini

app.get("/berat/:satuan/:data", (req, res) => {
    const satuan = req.params.satuan;
    const data = req.params.data;
    const results = {};
    let result;
    const berat = {
        kg: 1,
        hg: 10,
        dag: 100,
        g: 1000,
        dg: 10000,
        cg: 100000,
        mg: 1000000
    };

    if (satuan == "mg") {
        result = data / 1000000;
    } else if (satuan == "cg") {
        result = data / 100000;
    } else if (satuan == "dg") {
        result = data / 10000;
    } else if (satuan == "g") {
        result = data / 1000;
    } else if (satuan == "dag") {
        result = data / 100;
    } else if (satuan == "hg") {
        result = data / 10;
    } else {
        result = data
    }

    for (const jadi in berat) {
        results[jadi] = result * berat[jadi];
    }
    let response = {
        hasil: results
    };

    res.json(response);
})



app.post("/kecepatan", (req, res) => {
    let soal = req.body.type
    let type1 = number(req.body.type1)
    let type2 = number(req.body.type2)
    let hasil = 0
    let response

    if (soal === "v") {
        hasil = type1 / type2
        response = {
            Soal: "Kecepatan ",
            Jarak: type1 + ' meter',
            Waktu: type2 + ' detik',
            Hasil: hasil + ' m/detik',
        }
    } else if (soal === "s") {
        hasil = type1 * type2
        response = {
            Soal: "Jarak ",
            Kecepatan: type1 + ' m/detik',
            Waktu: type2 + ' detik',
            Hasil: hasil + ' meter',
        }
    } else if (soal === "t") {
        hasil = type1 / type2
        response = {
            Soal: "Waktu ",
            Jarak: type1 + ' Meter',
            Kecepatan: type2 + ' m/detik',
            Hasil: hasil.toFixed(2) + ' detik',
        }
    } else {
        response = "Input tipe : v,s,t "
    }

    res.json(response)
})


//codingan disini

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});