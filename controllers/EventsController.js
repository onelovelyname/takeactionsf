var FB = require('fb');
var Promise = require('bluebird');
var Event = require('../models/Event.js');
var moment = require('moment');

var EventsController = {

  formatDate: function(date) {
      return (moment(date, 'MM/DD/YYYY')).format('YYYY-MM-DD');
  },

  createEvent: function(event) {

      var formatted_date = this.formatDate(event.date);

      return new Promise(function(resolve, reject){

      new Event({ 'title': event.title })
          .fetch().then(function(found) {
        if (!found) {
          new Event({
            title: event.title,
            date: formatted_date,
            start_time: event.start_time,
            end_time: event.end_time,
            location: event.location,
            type: event.type,
            cause: event.cause,
            description: event.description
          }).save().then(function(event) {
            console.log("event saved!");
            resolve(event);
          })
        }
      });
      //     console.log("event not found");
      //     new Event({
      //       title: event.title,
      //       date: event.date,
      //       start_time: event.start_time,
      //       end_time: event.end_time,
      //       location: event.location,
      //       type: event.type,
      //       cause: event.cause,
      //       description: event.description
      //     }).save({}, {method: 'insert'})
      //         .then(function(event) {
      //           console.log("Event saved!", event);
      //           resolve(event);
      //         })
      //         .catch(function(error) {
      //           reject({ 'Error saving new event to database 1': error });
      //         });
        //}
      //})
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