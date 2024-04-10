import { signup } from "../src/signup";

test.skip("Deve criar uma conta para o passageiro", async function () {
	const input = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		carPlate: 'BRA2019',
		isPassenger: true
	};
	const output = await signup(input);
	expect(output.status).toBe(201);
});



