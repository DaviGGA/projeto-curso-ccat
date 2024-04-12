import express from "express";
import { AccountDAODatabase } from "../resource";
import { Signup } from "../application/Signup";
import { GetAccount } from "../application/GetAccount";
import { MailerGatewayMemory } from "../resources/MailerGateway";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  try {
    const accountDAO = new AccountDAODatabase();
    const mailerGateway = new MailerGatewayMemory();
    const signup = new Signup(accountDAO, mailerGateway);
    const output = await signup.execute(req.body);
    res.status(201).send(output);
  } catch (error: any) {
    res.status(400).send({error: error.message});
    console.log(error);
  }
})

app.get("/accounts/:accountId", async function (req, res) {
  try {
    const accountDAO = new AccountDAODatabase();
    const getAccount = new GetAccount(accountDAO);
    const output = await getAccount.execute(req.params.accountId);
    res.status(200).send(output);
  } catch (error: any) {
    res.status(400).send({error: error.message});
    console.log(error);
  }
})

app.listen(3000);
