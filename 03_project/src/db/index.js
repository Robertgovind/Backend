import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectionToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/sample-project`
    );
    console.log(
      "connected to db !! Host : ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("mongodb connection failed error", error);
    process.exit(1);
  }
};

export default connectionToDB;
