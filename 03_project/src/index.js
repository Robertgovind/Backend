import "dotenv/config";
import connectionToDB from "./db/index.js";
import { app } from "./app.js";

connectionToDB()
  .then(() => {
    app.on("error", () => {
      console.log("Some error occured on app");
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error occured while connecting to db", err);
  });
