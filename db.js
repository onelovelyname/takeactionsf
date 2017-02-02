var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : 'Snowyprotest1!',
        database : 'takeactionsf',
        charset  : 'utf8'
    }
});

var db = require('bookshelf')(knex);
db.plugin('registry');

db.knex.schema.hasTable('events').then(function(exists) {
    if(!exists) {
        db.knex.schema.createTable('events', function(event) {
            event.increments('id').primary();
            event.string('title');
            event.date('date');
            event.string('start_time');
            event.string('end_time');
            event.string('location');
            event.string('type');
            event.string('cause');
            event.string('description');
        }).then(function(table) {
            console.log("Created events table");

            db.knex.schema.hasTable('photos').then(function (exists) {
                if (!exists) {
                    db.knex.schema.createTable('photos', function (photo) {
                        photo.increments('id').primary();
                        photo.string('url', 100);
                        photo.string('caption', 10);
                    }).then(function (table) {
                        console.log("Created photos table", table);
                    });
                }
            });
        })
    }}
);

module.exports = db;