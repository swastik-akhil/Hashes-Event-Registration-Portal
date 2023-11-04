const mongoose = require("mongoose");
require('dotenv').config();
const {MONGODB_URL} = process.env;
exports.dbConnect = async ()=>{
	await mongoose.connect(MONGODB_URL, {
		useNewUrlParser : true,                     //this ensures that mongodb uses new url parser which is new and improved url parser
		useUnifiedTopology : true                   //this ensures that mongodb uses new unified topology engine
	})
		.then(()=>console.log(`DB CONNECTION : "SUCCESS"`))
		.catch((err)=>{
			console.log(`DB CONNECTION : "FAILED"`);
			console.log(err);
			// process.on('beforeExit', ()=>{console.log(`process is exiting`)})
			// process.exit(1);

		})
}


// // dbConnect.js
// const mongoose = require("mongoose");
// require('dotenv').config();

// const { MONGODB_URL } = process.env;

// const dbConnect = async () => {
//   try {
//     await mongoose.connect(MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`DB CONNECTION: SUCCESS`);
//   } catch (err) {
//     console.error(`DB CONNECTION: FAILED`);
//     console.error(err);
//   }
// };

// module.exports = { mongoose, dbConnect };
