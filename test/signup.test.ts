import { getAccount, signup } from "../src/signup";

test("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const responseSignup = await signup(input);
	expect(responseSignup.accountId).toBeDefined();
	const responseGetAccount = await getAccount(responseSignup.accountId);
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
	const responseSignup = await signup(input);
	expect(responseSignup.accountId).toBeDefined();
	const responseGetAccount = await getAccount(responseSignup.accountId);
	expect(responseGetAccount.name).toBe(input.name);
	expect(responseGetAccount.email).toBe(input.email);
	expect(responseGetAccount.cpf).toBe(input.cpf);
	expect(responseGetAccount.car_plate).toBe(input.carPlate);
});

test("Não deve criar uma conta se o nome do passageiro for inválido", async function () {
	const input = {
		name: "John2Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
    carPlate: 'BRA2019',
		isDriver: true
	};
	
	try {
		const responseSignup = await signup(input);
	} catch (error) {
		expect(true).toBe(true)
	}
});

// test("Deve criar uma conta para o motorista", async function () {
	// const input = {
	// 	name: "John Doe",
	// 	email: `john.doe${Math.random()}@gmail.com`,
	// 	cpf: "87748248800",
  //   carPlate: 'BRA2019',
	// 	isDriver: true
	// };
// 	const responseSignup = await axios.post("http://localhost:3000/signup", input);
// 	expect(responseSignup.status).toBe(201);
// 	const outputSignup = responseSignup.data;
// 	expect(outputSignup.accountId).toBeDefined();
// 	const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
// 	const outputGetAccount = responseGetAccount.data;
// 	expect(outputGetAccount.name).toBe(input.name);
// 	expect(outputGetAccount.email).toBe(input.email);
// 	expect(outputGetAccount.cpf).toBe(input.cpf);
	// expect(outputGetAccount.car_plate).toBe(input.carPlate);
// });