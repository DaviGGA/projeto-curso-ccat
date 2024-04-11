import express from "express";
import { signup, getAccount } from "./signup";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  try {
    const output = await signup(req.body);
    res.status(201).send(output);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
})

app.get("/accounts/:accountId", async function (req, res) {
  try {
    const output = await getAccount(req.params.accountId);
    res.status(200).send(output);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
})

app.listen(3000);
