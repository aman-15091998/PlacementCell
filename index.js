import { app } from "./server.js";
import { connectToDB } from "./configs/mongo.config.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, async (err) => {
  if (err) console.log(err);
  else {
    await connectToDB();
    console.log("Server is active");
  }
});

// Use this for login
//Empployee Login email:amantbitw@gmail.com
// password: 11111111
