const express = require("express");
const router = express.Router();
const pool = require("../database/db");

router.get("/auth/:name/:password", (req, res) => {
    pool.query("select name, id from workers where name = ? and password = ?",
        [req.params.name, req.params.password],
        function (error, results, fields) {
            if (results.length == 0 ) {
                res.status(404).json({ code: "Error user not found" })
            } else {
                res.status(200).json(results[0])
            }


            // if (error) {
            //    
            // }else{
            //     res.status(200).json(results[0])
            // }

        });
})

module.exports = router;