const express = require("express") // memanggil library express js
const bodyParser = require("body-parser") // memanggil library body-parser
const cors = require("cors") // memanggil library cors

//implementasi express
const app = express()

//implementasi body-parser
// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())


// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({
    extended: true
}))

// endpoint "/test" dengan method GET
app.get("/test", (req, res) => {
    // req merupakan variabel yang berisi data request
    // res merupakan variabel yang berisi data response dari end-point


    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        message: "Ini end-point pertama ku", // menampilkan data 
        method: req.method, // menampilkan method 
        code: res.statusCode // menampilkan response code 
    }


    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})

// end-point "/bujur_sangkar" dengan method POST
app.post("/bujur_sangkar", (req, res) => {
    // menampung data yang dikirimkan dan mengkonversi menjadi tipe numerik
    let panjang = Number(req.body.panjang) // mengambil nilai panjang dari body
    let lebar = Number(req.body.lebar) // mengamil nilai lebar dari body


    let luas = panjang * lebar
    let keliling = 2 * (panjang + lebar)


    // membuat objek yang berisi data yang akan dijadikan response
    let response = {
        panjang: panjang,
        lebar: lebar,
        luas: luas,
        keliling: keliling
    }


    // memberikan response dengan format JSON yang berisi objek di atas
    res.json(response)
})




app.post("/hexadecimal", (req, res) =>{
    
})

    res.json(response)



// menjalankan server pada port 8000
app.listen(8000, () => {
    console.log("Server run on port 8000");
})