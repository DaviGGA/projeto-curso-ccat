import crypto from "crypto";
import { validate } from "./validateCpf";
import { AccountDAO } from "../resource";
import { MailerGateway } from "../resources/MailerGateway";

export class Signup {
	
	constructor (
		readonly accountDAO: AccountDAO, 
		readonly mailerGateway: MailerGateway
	) {}


	async execute(input: any): Promise<any> {
		const accountId = crypto.randomUUID();
		const acc = await this.accountDAO.getAccountByEmail(input.email);	
		if (acc) throw new Error("Account alrealdy exists");	
		if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("The body.name content is invalid.");
		if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("The body.email content is invalid.");
		if (!validate(input.cpf)) throw new Error("Cpf is invalid.");
		if(input.isDriver && input.carPlate && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Car plate is invalid");
		await this.accountDAO.saveAccount({accountId, ...input});
		await this.mailerGateway.send(input.email, `Welcome, ${input.name}`, "Welcome to our platform");						
		return {accountId};
	}
}