const express = require("express");
const router = express.Router();
const pool = require("../database/db");

const exhibitQueries = {
    2: "SELECT * FROM photo_collection",
    3: "SELECT * FROM ethnography_of_europe",
    4: "SELECT * FROM ethnography_of_siberia",
    5: "SELECT * FROM ethnography_of_america",
    6: "SELECT * FROM plastic_reconstructions"
}

router.get("/getCollections", (req, res) => {
    pool.query("SELECT * FROM exhibit_type", function (error, results, fields) {
        if (error) throw new Error
        res.json([...results])
    });
})

router.get("/getExhibits/:id", (req, res) => {
    pool.query(exhibitQueries[req.params.id], function (error, results, fields) {
        if (error) throw new Error
        res.json([...results])
    });
})


router.get("/getEthAmerica", (req, res) => {
    pool.query("SELECT * FROM ethnography_of_america", function (error, results) {
        if (error) throw new Error
        console.log(typeof results);
        res.status(200).json({ data: results })
    });
})

router.get("/getEthEurope", (req, res) => {
    pool.query("SELECT * FROM ethnography_of_europe", function (error, results) {
        if (error) throw new Error
        console.log(typeof results);
        res.status(200).json({ data: results })
    });
})

router.get("/getEthSiberia", (req, res) => {
    pool.query("SELECT * FROM ethnography_of_siberia", function (error, results) {
        if (error) throw new Error
        console.log(typeof results);
        res.status(200).json({ data: results })
    });
})

router.get("/getPhotoCollection", (req, res) => {
    pool.query("SELECT * FROM photo_collection", function (error, results) {
        if (error) throw new Error
        console.log(typeof results);
        res.status(200).json({ data: results })
    });
})

router.get("/getPlastic", (req, res) => {
    pool.query("SELECT * FROM plastic_reconstructions", function (error, results) {
        if (error) throw new Error
        console.log(typeof results);
        res.status(200).json({ data: results })
    });
})

module.exports = router;