$( ".event-form" ).submit(function( event ) {
    event.preventDefault();
    console.log("heard submission of form");
    var inputs = {
        title: $("#event-title"),
        date: $("#event-date"),
        start_time: $("#event-start-time"),
        end_time: $("#event-end-time"),
        location: $("#event-location"),
        type: $("#event-type"),
        cause: $("#event-cause"),
        description: $("#event-description")
    };
    var data = {};

    for (var key in inputs) {
        if (inputs.hasOwnProperty(key)) {
            data[key] = (inputs[key]).val();
        }
    }

    $.ajax({
        type: 'post',
        url: '/events/add',
        data: data,
        success: function (data) {
            console.log('Success');
            console.log(data);

            for (var key in inputs) {
                if (inputs.hasOwnProperty(key)) {
                    inputs[key].val("");
                }
            }
        },
        error: function () {
            console.log('We are sorry but our servers are having an issue right now');
        }
    })

});