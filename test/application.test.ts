
import { AccountDAOMemory } from "../src/resource";
import { Signup } from "../src/application/Signup";
import { GetAccount } from "../src/application/GetAccount";
import { MailerGatewayMemory } from "../src/resources/MailerGateway";

let signup: Signup;
let getAccount: GetAccount

beforeEach(async () => {
	const accountDAO = new AccountDAOMemory();
	const mailerGateway = new MailerGatewayMemory();
	signup = new Signup(accountDAO, mailerGateway);
	getAccount = new GetAccount(accountDAO);
})



test("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const responseSignup = await signup.execute(input);
	expect(responseSignup.accountId).toBeDefined();
	const responseGetAccount = await getAccount.execute(responseSignup.accountId);
	expect(responseGetAccount.name).toBe(input.name);
	expect(responseGetAccount.email).toBe(input.email);
	expect(responseGetAccount.cpf).toBe(input.cpf);
});

test("Deve criar uma conta para o motorista", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
    carPlate: 'BRA2019',
		isDriver: true
	};
	const responseSignup = await signup.execute(input);
	expect(responseSignup.accountId).toBeDefined();
	const responseGetAccount = await getAccount.execute(responseSignup.accountId);
	expect(responseGetAccount.name).toBe(input.name);
	expect(responseGetAccount.email).toBe(input.email);
	expect(responseGetAccount.cpf).toBe(input.cpf);
	expect(responseGetAccount.carPlate).toBe(input.carPlate);
});

test("Não deve criar uma conta se o nome do passageiro for inválido", async function () {
	const input = {
		name: "John2Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
    carPlate: 'BRA2019',
		isDriver: true
	};
	
	await expect(() => signup.execute(input)).rejects.toThrow(new Error("The body.name content is invalid."));
});

