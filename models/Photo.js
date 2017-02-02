var db = require("../db.js");

var Photo = db.Model.extend({
    tableName: "photos"
})

module.exports = db.model('Photo', Photo);
