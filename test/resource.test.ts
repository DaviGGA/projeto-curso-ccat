import { saveAccount } from "../src/resource"

test("Deve salvar um registro na tabela account", async function ()  {
    const account = {
        name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
    }

    await saveAccount(account);
})