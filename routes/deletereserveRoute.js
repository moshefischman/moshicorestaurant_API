var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;

router.post("/", function(req, res, next) {
  Day.find({ date: req.body.date }, (err, days) => {
    if (!err) {
      if (days.length > 0) {
        let day = days[0];
        day.tables.forEach(table => {
          if (table._id == req.body.tableid) {
            // The correct table was found
            table.reservation = null;
            table.isAvailable = true;
            day.save(err => {
              if (err) {
                console.log(err);
              } else {
                console.log("Reserve cancelled");
                res.status(200).send("Reservation cancelled");
              }
            });
          }
        });
      } else {
        console.log("Day not found");
      }
    }
  });
});

module.exports = router;
