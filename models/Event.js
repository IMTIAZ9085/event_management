const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
      event_name: {
            type: String,
            require: [true, "Please provide the Event name"]
      },
      email: {
            type: String,
            require: [true, "Please provide the creator email"]
      },
      description: {
            type: String,
            require: [true, "Please provide the description"]
      }, 
      Start_date: {
            type: Date
      },
      end_date: {
            type: Date
      },
      event_type: {
            type: String,
      }

});

const Event = mongoose.model("Event", UserSchema);

module.exports = Event;