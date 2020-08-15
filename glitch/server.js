const express = require("express");
const app = express();
const axios = require("axios");
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.get("/", (request, response) => {
  response.send({
    status: "working"
  });
});

app.post("/help", async (req, res) => {
  try {
    const message = req.body;
    console.log(message)
    const msg = {
      'chat_id': process.env.CHAT_ID,
      'text': message.message
    };

    const telegram_url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
    await axios.post(telegram_url, msg);
    res.json({
      status: "Message sent succesfully"
    })
  } catch(e) {
    console.log(e.message)
  }
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});