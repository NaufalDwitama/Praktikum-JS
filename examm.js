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


app.post("/vst/:type/:diket1/:diket2", (req, res) => {
    let soal = req.params.type
    let var1 = Number(req.params.diket1)
    let var2 = Number(req.params.diket2)
    let hasil = 0
    let response

    if (soal === "v") {
        hasil = var1 / var2
        response = {
            Soal: "Mencari kecepatan(Velocity) per detik",
            Jarak: var1 + ' meter',
            Waktu: var2 + ' detik',
            Hasil: hasil + ' m/detik',
        }
    } else if (soal === "s") {
        hasil = var1 * var2
        response = {
            Soal: "Mencari Jarak(Space)",
            Kecepatan: var1 + ' m/detik',
            Waktu: var2 + ' detik',
            Hasil: hasil + ' meter',
        }
    } else if (soal === "t") {
        hasil = var1 / var2
        response = {
            Soal: "Mencari Waktu(Time)",
            Jarak: var1 + ' Meter',
            Kecepatan: var2 + ' m/detik',
            Hasil: hasil.toFixed(2) + ' detik',
        }
    } else {
        response = "Tipe tidak ada!\n<br>Coba salah satu dari berikut Tipe:[v,s,t]"
    }

    res.json(response)
})


// Rute untuk menghitung f (f = m * a)
app.get('/calcu-f', (req, res) => {
    const m = parseFloat(req.query.m);
    const a = parseFloat(req.query.a);
    const f = m * a;
    res.json({
        variable: 'f',
        formula: 'm * a',
        value: m,
        a
    });
});

// Rute untuk menghitung m (m = f / a)
app.get('/calcu-m', (req, res) => {
    const f = parseFloat(req.query.f);
    const a = parseFloat(req.query.a);
    const m = f / a;
    res.json({
        variable: 'm',
        formula: 'f / a',
        value: f,
        a
    });
});

// Rute untuk menghitung a (a = f / m)
app.get('/calcu-a', (req, res) => {
    const f = parseFloat(req.query.f);
    const m = parseFloat(req.query.m);
    const a = f / m;
    res.json({
        variable: 'a',
        formula: 'f / m',
        value: f,
        m
    });
});


// Rute untuk menghitung f (f = m * a)
app.post('/calculate-f', (req, res) => {
    const {
        m,
        a
    } = req.body;
    const f = m * a;
    res.json({
        result: f,
        variable1: 'f',
        variable2: 'm * a',
        value1: f,
        value2: `${m} * ${a}`
    });
});

// Rute untuk menghitung m (m = f / a)
app.post('/calculate-m', (req, res) => {
    const {
        f,
        a
    } = req.body;
    const m = f / a;
    res.json({
        result: m,
        variable1: 'm',
        variable2: 'f / a',
        value1: m,
        value2: `${f} / ${a}`
    });
});

// Rute untuk menghitung a (a = f / m)
app.post('/calculate-a', (req, res) => {
    const {
        f,
        m
    } = req.body;
    const a = f / m;
    res.json({
        result: a,
        variable1: 'a',
        variable2: 'f / m',
        value1: a,
        value2: `${f} / ${m}`
    });
});

app.post("/hitung", (req, res) => {
    const satuan = req.body.type;
    const data = req.body.data;
    let result;
    const results = {};
    const sp = {
        km: 1,
        hm: 10,
        dam: 100,
        m: 1000,
        dm: 10000,
        cm: 100000,
        mm: 1000000
    };

    if (satuan == "mm") {
        result = data / 1000000;
    } else if (satuan == "cm") {
        result = data / 100000;
    } else if (satuan == "dm") {
        result = data / 10000;
    } else if (satuan == "m") {
        result = data / 1000;
    } else if (satuan == "dam") {
        result = data / 100;
    } else if (satuan == "hm") {
        result = data / 10;
    } else {
        result = data
    }

    for (const p in sp) {
        results[p] = result * sp[p];
    }
    let response = {
        status: res.statusCode,
        hasil: results
    };

    res.json(response);
});

//codingan disini

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});