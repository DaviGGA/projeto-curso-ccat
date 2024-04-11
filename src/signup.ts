import crypto from "crypto";
import pgp from "pg-promise";
import { validate } from "./validateCpf";

export async function signup (input: any): Promise<any> {
	const connection = pgp()("postgres://postgres:postgres@localhost:5432/postgres");
		const id = crypto.randomUUID();
		const [acc] = await connection.query("select * from cccat16.account where email = $1", [input.email]);	
		if (acc) throw new Error("Account alrealdy exists");	
		if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("The body.name content is invalid.");
		if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("The body.email content is invalid.");
		if (!validate(input.cpf)) throw new Error("Cpf is invalid.");
		if(input.isDriver && input.carPlate && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Car plate is invalid");
		await connection.query(
			`insert into cccat16.account
				(account_id, name, email, cpf, car_plate, is_passenger, is_driver)
			values
				($1, $2, $3, $4, $5, $6, $7)`, 
			[id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]
		);							
		const obj = {
			accountId: id
		};	
		await connection.$pool.end();
		return obj;
};

export async function  getAccount(accountId: string) {
	const connection = pgp()("postgres://postgres:postgres@localhost:5432/postgres");
	const [account] = await connection.query("select * from cccat16.account where account_id = $1", [accountId])
	await connection.$pool.end();
	return account;
}

