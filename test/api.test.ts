import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}


test("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		carPlate: 'BRA2019',
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(201);
});

test("Deve retornar erro caso o nome seja inválido", async function () {
	const input = {
		name: "John4Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		carPlate: 'BRA2019',
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(400);
});

test("Deve retornar erro caso o email seja inválido", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}gmail.com`,
		cpf: "87748248800",
		carPlate: 'BRA2019',
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(400);
});

test("Deve retornar erro se a placa do carro esteja inválida", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		carPlate: 'BRA2E19',
		isPassenger: true
	};
	const output = await axios.post("http://localhost:3000/signup", input);
	expect(output.status).toBe(400);
});

