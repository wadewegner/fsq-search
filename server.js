require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/api", async (req, res) => {
  const question = req.body.question;
  try {
    const response = await axios.post(process.env.CHAT_API, {
      question: question,
      chatbotId: process.env.CHATBOT_ID,
      chatId: process.env.CHAT_ID,
      isChatHistoryEnabled: false,
      streaming: false,
    });
    res.send({ response: response.data.response });
  } catch (error) {
    console.error(error);
    res.send({ response: "Error occurred" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
