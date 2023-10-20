const express = require('express');
const app = express();

app.use(express.json());

app.get("/profil/:name/:age", (req, res) => {
    // :name dan :age 🡪 diberikan titik dua didepan menunjukkan "name" dan "age"
    // bersifat dinamis yang dapat diganti nilai nya saat melakukan request
    // menampung data yang dikirimkan
    let name = req.params.name // mengambil nilai pada parameter name
    let age = req.params.age // mengambil nilai pada parameter age
    // membuat objek yang berisi data yang akan dijadikan response
    // response berisi data nama dan umur sesuai dengan nilai parameter
    let response = {
        nama: name,
        umur: age
    }
    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})


app.post('/convert', (req, res) => {
    const hexNumber = req.body.hexadecimal;

    if (!hexNumber) {
        res.status(400).json({
            error: 'Missing hexadecimal number in the request body'
        });
        return;
    }

    const decimalNumber = parseInt(hexNumber, 16);

    if (isNaN(decimalNumber)) {
        res.status(400).json({
            error: 'Invalid hexadecimal input'
        });
        return;
    }

    const binaryNumber = decimalNumber.toString(2);
    const octalNumber = decimalNumber.toString(8);

    res.status(200).json({
        decimal: decimalNumber,
        binary: binaryNumber,
        octal: octalNumber,
    });
});

app.post("/reamur", (req, res) => {
    let reamur = Number(req.body.reamur)
    let celcius = 5 / 4 * reamur
    let fahrenheit = 9 / 4 * reamur + 32
    let kelvin = 5 / 4 * reamur + 273

    let response = {
        reamur: reamur,
        "result: ": {
            celcius: celcius,
            fahrenheit: fahrenheit,
            kelvin: kelvin
        }
    }
    res.json(response)
})


app.post("/bmi", (req, res) => {
    let tinggi = Number(req.body.tinggi);
    let berat = Number(req.body.berat);

    if (tinggi < 1.5 || tinggi > 2.0) {
        return res.status(400).json({
            error: 'Tinggi badan harus berada dalam rentang 1.5 hingga 2.0 meter.',
        });
    }

    if (berat < 30 || berat > 200) {
        return res.status(400).json({
            error: 'Berat badan harus berada dalam rentang 30 hingga 200 kilogram.',
        });
    }

    let bmi = berat / tinggi ** 2;
    let status = get_status(bmi);

    let response = {
        tinggi: tinggi,
        berat: berat,
        bmi: bmi,
        status: status,
    };

    function get_status(bmi) {
        if (bmi < 18.5) {
            return "kekurangan berat badan";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return "normal / ideal";
        } else if (bmi >= 25 && bmi <= 29.9) {
            return "kelebihan berat badan";
        } else {
            return "kegemukan";
        }
    }

    res.json(response);
});


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});