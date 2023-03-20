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


const updateQueries = {
    2: "photo_collection",
    3: "ethnography_of_europe",
    4: "ethnography_of_siberia",
    5: "ethnography_of_america",
    6: "plastic_reconstructions"
}

router.post("/update", (req, res) => {
    let columns = Object.keys(req.body)
    // let values = Object.values(req.body)
    let values = Object.values(req.body);
    // console.log(values);
    // values.forEach((item) => {
    //     if (typeof item !== "number") {
    //         item.replace(/["']/g,'')
    //     }
    // })


    let queryArr = columns.map((column, index) => {
        if (values[index] == "") {
            return
        }
        if (column == "id") {
            return `${column} = ${values[index]}`
        } else {
            return `${column} = '${values[index]}'`
        }
        // if (column == "id") {
        //     return `${column} = ${values[index]}`
        // } else if (values[index] == "") {
        //     return
        // } else {
        //     return `${column} = "${values[index]}"`
        // }
    })
    console.log(values);

    console.log(queryArr);


    let query = (queryArr.filter(item => item != "" && item !== undefined).join(","));
    console.log(query);
    // res.send("done")
    // // console.log(`update ${updateQueries[req.body.type_id]} ${query} where id=${req.body.id}`);
    pool.query(`update ${updateQueries[req.body.type_id]} set ${query} where id=${req.body.id}`, function (error, results, fields) {
        if (error) console.log(error);
        console.log(results);
        res.status(200).json("Done")
    });


})

let addQueries = {
    6: "insert into plastic_reconstructions (name,ethnicity, geography, creation_time, expedition,  material, size, type_id, image) values(?, ?, ?, ? ,? , ?,?,?, ?)",
    5: "insert into ethnography_of_america (name,ethnicity,place_of_creation, geography, creation_time, author, gatherer, material, size, type_id, image, annotation) values(?, ?, ?, ? ,? , ?,?,?,?,?,?,?)",
    2: "insert into photo_collection (name,ethnicity,place_of_creation, geography, creation_time,  gatherer, material, size, type_id, image) values(?, ?, ?, ? ,? , ?,?,?,?,?)",
    3: "insert into ethnography_of_europe (name,ethnicity,place_of_creation, geography, creation_time, author, gatherer, material, size, type_id, image) values(?, ?, ?, ? ,? , ?,?,?,?,?,?)",
    4: "insert into ethnography_of_siberia (name,ethnicity,place_of_creation, geography, creation_time,author,   gatherer, material, size, type_id, image) values(?, ?, ?, ? ,? , ?,?,?,?,?,?)"
}

router.post("/addExhibit", (req, res) => {
    let values = Object.values(req.body);
    let columns = Object.keys(req.body)
    // let spaces = values.filter()
    console.log(columns)
    console.log(values)

    if (req.body.type_id == 6) {
        pool.query(`${addQueries[req.body.type_id]}`,
            [req.body.name, req.body.ethnicity, req.body.geography, req.body.creation_time, req.body.expedition, req.body.material, req.body.size, req.body.type_id, req.body.image],
            function (error, results, fields) {
                if (error) console.log(error);
                res.status(200).json("Done")
            });
    } else if (req.body.type_id == 5) {
        pool.query(`${addQueries[req.body.type_id]}`,
            [req.body.name, req.body.ethnicity, req.body.place_of_creation, req.body.geography, req.body.creation_time, req.body.author, req.body.gatherer, req.body.material, req.body.size, req.body.type_id, req.body.image, req.body.annotation],
            function (error, results, fields) {
                if (error) console.log(error);
                res.status(200).json("Done")
            });
    } else if (req.body.type_id == 2) {
        pool.query(`${addQueries[req.body.type_id]}`,
            [req.body.name, req.body.ethnicity, req.body.place_of_creation, req.body.geography, req.body.creation_time, req.body.gatherer, req.body.material, req.body.size, req.body.type_id, req.body.image],
            function (error, results, fields) {
                if (error) console.log(error);
                res.status(200).json("Done")
            });
    } else if (req.body.type_id == 3) {
        pool.query(`${addQueries[req.body.type_id]}`,
            [req.body.name, req.body.ethnicity, req.body.place_of_creation, req.body.geography, req.body.creation_time, req.body.author, req.body.gatherer, req.body.material, req.body.size, req.body.type_id, req.body.image],
            function (error, results, fields) {
                if (error) console.log(error);
                res.status(200).json("Done")
            });
    } else if (req.body.type_id == 4) {
        pool.query(`${addQueries[req.body.type_id]}`,
            [req.body.name, req.body.ethnicity, req.body.place_of_creation, req.body.geography, req.body.creation_time, req.body.author, req.body.gatherer, req.body.material, req.body.size, req.body.type_id, req.body.image],
            function (error, results, fields) {
                if (error) console.log(error);
                console.log(results);
                res.status(200).json("Done")
            });
    }
    // pool.query(`${addQueries[req.body.type_id]}`, values, function (error, results, fields) {
    //     if (error) console.log(error);
    //     console.log(results);
    //     res.status(200).json("Done")
    // });
})

router.get("/find/:text", (req, res) => {
    let query = `
        select name, type_id, id, image from ethnography_of_europe where name like "%${req.params.text}%"
        union (select name, type_id, id, image from ethnography_of_america where name like "%${req.params.text}%")
        union (select name, type_id, id, image from ethnography_of_siberia where name like "%${req.params.text}%")
        union (select name, type_id, id, image from photo_collection where name like "%${req.params.text}%")
        union (select name, type_id, id, image from plastic_reconstructions where name like "%${req.params.text}%");
    `
    pool.query(query, function (error, results, fields) {
        if (error) throw new Error
        res.json(results)
    });
})

const deleteQueries = {
    2: "Delete FROM photo_collection where id = ?",
    3: "Delete FROM ethnography_of_europe where id = ?",
    4: "Delete FROM ethnography_of_siberia where id = ?",
    5: "Delete  FROM ethnography_of_america where id = ?",
    6: "Delete  FROM plastic_reconstructions where id = ?"
}

router.post("/delete", (req, res) => {

    if (req.body.type_id == 6) {
        pool.query(`${deleteQueries[req.body.type_id]}`,
            [req.body.id],
            function (error, results, fields) {
                if (error) console.log(error);

                res.status(200).json("Done")
            });
    } else if (req.body.type_id == 5) {
        pool.query(`${deleteQueries[req.body.type_id]}`,
            [req.body.id],
            function (error, results, fields) {
                if (error) console.log(error);
                res.status(200).json("Done")
            });
    } else if (req.body.type_id == 2) {
        pool.query(`${deleteQueries[req.body.type_id]}`,
            [req.body.id],
            function (error, results, fields) {
                if (error) console.log(error);
                res.status(200).json("Done")
            });
    } else if (req.body.type_id == 3) {
        pool.query(`${deleteQueries[req.body.type_id]}`,
            [req.body.id],
            function (error, results, fields) {
                if (error) console.log(error);
                res.status(200).json("Done")
            });
    } else if (req.body.type_id == 4) {
        pool.query(`${deleteQueries[req.body.type_id]}`,
            [req.body.id],
            function (error, results, fields) {
                if (error) console.log(error);
                res.status(200).json("Done")
            });
    }
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