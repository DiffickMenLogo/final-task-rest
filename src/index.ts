import mongoose from "mongoose";
import { PORT } from "./constants";

import * as serverService from "./services/server.service";

const { UserName, Password, clasterInfo } = process.env;

(async () => {
  try {
    await mongoose.connect(
      `mongodb://mongo:${Password}@containers-us-west-118.railway.app:7779`
    );
    serverService.server.listen(process.env.PORT || PORT, function () {
      console.log("Сервер ожидает подключения...");
    });
  } catch (error) {
    console.log(error);
  }
})();

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  process.exit();
});
