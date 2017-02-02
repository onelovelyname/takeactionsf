var FB = require('fb');
var Promise = require('bluebird');
var Event = require('../models/Event.js');

var EventsController = {

  createEvent: function(req, res) {

    var event = req.body;

    return new Promise(function(resolve, reject){
      new Event({ 'title': event.title })
          .fetch().then(function(found) {
        if (!found) {
          new Event({
            title: event.title,
            date: event.date,
            start_time: event.start_time,
            end_time: event.end_time,
            location: event.location,
            type: event.type,
            cause: event.cause,
            description: event.description
          }).save({}, {method: 'insert'})
              .then(function(event) {
                console.log("Event saved!", event);
                resolve(event);
              })
              .catch(function(error) {
                reject({ 'Error saving new event to database': error });
              });
        }
      });
    });
  },
  
  
  getFacebookEvents: function(req, res) {
    console.log("received req from client");
    var event_id = req.params.event_id;
    FB.api(
      '/1259042357477448',
      'GET',
      {},
      function(response) {
        console.log(JSON.stringify(response));
      }
    );
  }

};

module.exports = EventsController;