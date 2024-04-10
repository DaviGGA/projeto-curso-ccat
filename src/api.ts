import crypto from "crypto";
import express from "express";
import pgp from "pg-promise";
import { validate } from "./validateCpf";
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
	const connection = pgp()("postgres://postgres:postgres@localhost:5432/postgres");
	try {
		const id = crypto.randomUUID();
		const [acc] = await connection.query("select * from cccat16.account where email = $1", [req.body.email]);	
		if (acc) throw new Error("Account alrealdy exists");	
		if (!req.body.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("The body.name content is invalid.");
		if (!req.body.email.match(/^(.+)@(.+)$/)) throw new Error("The body.email content is invalid.");
		if (!validate(req.body.cpf)) throw new Error("Cpf is invalid.");
		if(req.body.isDriver && req.body.carPlate && !req.body.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Car plate is invalid");
		await connection.query(
			`insert into cccat16.account
				(account_id, name, email, cpf, car_plate, is_passenger, is_driver)
			values
				($1, $2, $3, $4, $5, $6, $7)`, 
			[id, req.body.name, req.body.email, req.body.cpf, req.body.carPlate, !!req.body.isPassenger, !!req.body.isDriver]
		);							
		const obj = {
			accountId: id
		};	
		res.status(201).send(obj);
	} catch(error) {
		console.log(error)
		res.status(400).send(error);
	} finally {
		await connection.$pool.end();
	}
});

app.get("/accounts/:accountId", async function (req, res) {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/postgres");
    const [account] = await connection.query("select * from cccat16.account where account_id = $1", [req.params.accountId])
    res.status(200).send(account);
    await connection.$pool.end();
})

app.listen(3000);