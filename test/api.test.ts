import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
	};
	const responseSignup = await axios.post("http://localhost:3000/signup", input);
	expect(responseSignup.status).toBe(201);
	const outputSignup = responseSignup.data;
	expect(outputSignup.accountId).toBeDefined();
	const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
	const outputGetAccount = responseGetAccount.data;
	expect(outputGetAccount.name).toBe(input.name);
	expect(outputGetAccount.email).toBe(input.email);
	expect(outputGetAccount.cpf).toBe(input.cpf);
});

test("Deve criar uma conta para o motorista", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
    carPlate: 'BRA2019',
		isDriver: true
	};
	const responseSignup = await axios.post("http://localhost:3000/signup", input);
	expect(responseSignup.status).toBe(201);
	const outputSignup = responseSignup.data;
	expect(outputSignup.accountId).toBeDefined();
	const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
	const outputGetAccount = responseGetAccount.data;
	expect(outputGetAccount.name).toBe(input.name);
	expect(outputGetAccount.email).toBe(input.email);
	expect(outputGetAccount.cpf).toBe(input.cpf);
	expect(outputGetAccount.car_plate).toBe(input.carPlate);
});

test("Não deve criar uma conta se o nome for inválido", async function () {
	const input = {
		name: "John2Doe",
		email: `john.doe${Math.random()}gmail.com`,
		cpf: "87748248800",
    carPlate: 'BRA2019',
		isDriver: true
	};
	const responseSignup = await axios.post("http://localhost:3000/signup", input);
	expect(responseSignup.status).toBe(400);

});

test("Não deve criar uma conta se o email for inválido", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}gmail.com`,
		cpf: "87748248800",
    carPlate: 'BRA2019',
		isDriver: true
	};
	const responseSignup = await axios.post("http://localhost:3000/signup", input);
	expect(responseSignup.status).toBe(400);

});

test("Não deve criar uma conta se o cpf for inválido", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}gmail.com`,
		cpf: "87748248801",
    carPlate: 'BRA2019',
		isDriver: true
	};	
	const responseSignup = await axios.post("http://localhost:3000/signup", input);
	expect(responseSignup.status).toBe(400);
});

test("Não deve criar uma conta se a placa do carro for inválida", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
    carPlate: '1232019',
		isDriver: true
	};	
	const responseSignup = await axios.post("http://localhost:3000/signup", input);
	expect(responseSignup.status).toBe(400);
});

test("Não deve criar uma conta se o email já existe", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
    carPlate: 'BRA2019',
		isDriver: true
	};
	const responseSignup = await axios.post("http://localhost:3000/signup", input);	
	const newInput = {
		name: "John Doe",
		email: input.email,
		cpf: "87748248800",
    carPlate: '1232019',
		isDriver: true
	};
	const responseAttemptSignup = await axios.post("http://localhost:3000/signup", newInput);	
	expect(responseAttemptSignup.status).toBe(400);
});


