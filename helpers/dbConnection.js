import { dbConnection } from ".";

import mongoose from "mongoose";

export default dbConnection = () => {
  const self = dbConnection;
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => {
      console.error(
        "Failed to connect to mongo on startup - retrying in 5 sec"
      );
      setTimeout(self, 5000);
    });
};
