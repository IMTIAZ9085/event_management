const mongoose = require('mongoose');

const connectDB = async() =>{

      const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
       };

 mongoose.connect(process.env.MONGO_URL,connectionParams)
 .then(() => {
      console.log('mongoose connection successful...');
})
.catch(err => {
      console.log(err);
});
}

// MONGO_URL=mongodb://localhost:27017/advanceSignup





// mongodb+srv://IMTIAZ:imtiaz123@cluster0.8dmya.mongodb.net/project_list?retryWrites=true&w=majority
//connect to mongodb database

//  mongoose.connect(process.env.MONGO_URL, connectionParams)
      // .then(() => {
      //       console.log('mongoose connection successful')
      // })
      // .catch(err => {
      //       console.log(err)
      // });


module.exports = connectDB;