const express = require("express");
const router = express.Router();
const pool = require("../database/db");

const exhibitQueries = {
    2: "SELECT * FROM photo_collection where id = ?",
    3: "SELECT * FROM ethnography_of_europe where id = ?",
    4: "SELECT * FROM ethnography_of_siberia where id = ?",
    5: "SELECT * FROM ethnography_of_america where id = ?",
    6: "SELECT * FROM plastic_reconstructions where id = ?"
}


router.get("/exhibit/getData/:type/:id", (req, res) => {
    pool.query(exhibitQueries[req.params.type], [req.params.id], function (error, results, fields) {
        if (error) throw new Error
        console.log(results);
        res.status(200).json(results[0])
    });
})


// router.get("/exhibit/getData/:text", (req, res) => {
//     let sql = 
//     pool.query(, [req.params.text], function (error, results, fields) {
//         if (error) throw new Error
//         console.log(results);
//         res.status(200).json(results[0])
//     });
// })


// router.get("/exhibit/getExhibitEurope/:id", (req, res) => {
//     console.log(req.params);
//     pool.query("SELECT * FROM ethnography_of_europe where id = ?", [req.params.id], function (error, results) {
//         if (error) throw new Error
//         console.log(results);
//         res.status(200).json({ data: results })
//     });
// })

// router.get("/exhibit/getExhibitAmerica/:id", (req, res) => {
//     console.log(req.params);
//     pool.query("SELECT * FROM ethnography_of_america where id = ?", [req.params.id], function (error, results) {
//         if (error) throw new Error
//         console.log(results);
//         res.status(200).json({ data: results })
//     });
// })

// router.get("/exhibit/getExhibitSiberia/:id", (req, res) => {
//     console.log(req.params);
//     pool.query("SELECT * FROM ethnography_of_siberia where id = ?", [req.params.id], function (error, results) {
//         if (error) throw new Error
//         console.log(results);
//         res.status(200).json({ data: results })
//     });
// })

// router.get("/exhibit/getExhibitPhoto/:id", (req, res) => {
//     console.log(req.params);
//     pool.query("SELECT * FROM photo_collection where id = ?", [req.params.id], function (error, results) {
//         if (error) throw new Error
//         console.log(results);
//         res.status(200).json({ data: results })
//     });
// })

// router.get("/exhibit/getExhibitFigure/:id", (req, res) => {
//     console.log(req.params);
//     pool.query("SELECT * FROM plastic_reconstructions where id = ?", [req.params.id], function (error, results) {
//         if (error) throw new Error
//         console.log(results);
//         res.status(200).json({ data: results })
//     });
// })



module.exports = router;