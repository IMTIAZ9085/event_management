const Event = require("../models/Event");
const User = require("../models/User");
const dummyData = require("../dummyData");
exports.registerEvent = async (req, res, next) => {
      const {
            event_name,
            email,
            description,
            Start_date,
            end_date,
            event_type
      } = req.body;

      try {
            const event = new Event({
                  event_name: event_name,
                  email: email,
                  description: description,
                  Start_date: Start_date,
                  end_date: end_date,
                  event_type: event_type
            });
            const dataSave = await event.save();
            if (dataSave) {
                  res.status(201).json({
                        message: "successfully registered"
                  });
            } else {
                  res.status(500).json({
                        error: "Register Failed"
                  })
            }

      } catch (err) {
            next(err);
      }
};

exports.eventData = (req, res, next) => {
      // const {
      //       email
      // } = req.body;
      // console.log(email);
      const data = Event.find({}, (err, user) => {
            if (err) console.log(err);
            else {
                  // console.log(req.body);
                  // res.status(201).json(user.filter((e) => {
                  //       return e.email == 'skimtiazali630@gmail.com';
                  //       // return e.email == email;

                  // }));
                  res.send(user);
            }
      })

      // console.log(`Got Event Data`);
};


exports.eachData = async (req, res) => {
      try {
            // const event = await Event.find((x)=>x._id === req.params._id);
            const event = await Event.findById({
                  _id: req.params._id
            });
            // console.log(event);
            // console.log("we got it");
            if (event) {
                  res.send(event);
            } else {
                  res.status(404).send({
                        message: 'Event is not available'
                  });
            }
      } catch (e) {
            console.log(e);
      }
}

exports.UpdateEvent = async (req, res) => {
      const UpdateItem = {
            event_name: req.body.event_name,
            email: req.body.email,
            description: req.body.description,
            Start_date: req.body.Start_date,
            end_date: req.body.end_date,
            event_type: req.body.event_type
      }
      Event.findByIdAndUpdate({
                  _id: req.params.id
            }, {
                  $set: UpdateItem
            },
            (req, res, err) => {
                  // res.status(201).send("item updated");
                  // res.send(updateItem);
                  if (!err) {
                        console.log("item updated successfully");
                        //     res.send("Item Updated Successfully");
                  } else {
                        console.log(err)
                        // res.send(err); 
                  };
            }
      );
};

exports.Myinvitation = async (req, res) => {
      try {
            const currentUser = await User.findById(req.params.userId);
            const invited_event = await Promise.all(
                  currentUser.invited.map((eventId) => {
                        return Event.find({
                              _id: eventId
                        })
                  })
            )
            const ivdata = [];
            res.status(201).json(ivdata.concat(...invited_event));
            // res.send(invited_event);
            // return invited_event;
      } catch (err) {
            res.status(500).json(err);
      }
}


//DELETE EVENT IN THE APPLIATION
exports.deleteEvent = async (req, res) => {
      try {
            const post = await Event.findById(req.params.id);
            if (post) {
                  await post.deleteOne();
                  res.status(200).json("THE EVENT HAS DELETED SUCCESSFULLY");

            } else {
                  res.status(200).json("THE EVENT DOES NOT EXIST");
            }

      } catch (err) {
            res.status(500).json(err);
      }
}