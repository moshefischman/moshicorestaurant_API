var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;


router.post("/", function(req, res, next) {
	console.log("API request for all reserved tables in specifc datetime:", req.body);
	let arrTbl = [];
  Day.find({ date: req.body.date }, (err, days) => {
    if (!err) {
      if (days.length > 0) {
				try {
					arrTbl = days[0].tables;
					let tblReserved = arrTbl.filter(tbl => {return tbl.isAvailable === false;});
									
					res.status(200).send(tblReserved);
				} catch (error) {
					console.log(error)
				}
        

      } else {
        console.log("Day not found");
				res.status(200).send(arrTbl);
      }
    } else {
      res.status(200).send(arrTbl);
    }
  });
});

module.exports = router;
