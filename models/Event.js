var db = require("../db.js");
require("./Photo");

var Event = db.Model.extend({
    tableName: 'events',
    idAttribute: 'id',
    photos: function() {
        return this.hasMany(Photo);
    }
});

module.exports = db.model('Event', Event);
