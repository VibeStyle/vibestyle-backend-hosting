// const mongoose = require("mongoose");

// const app = require("./App");
// const { DB_HOST, PORT = 3001 } = process.env;
// mongoose.set("strictQuery", true);

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log("Database connect successfully");
//     app.listen(3001);
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });

require('dotenv').config();
const app = require('./App');

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
