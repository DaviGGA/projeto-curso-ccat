import { AccountDAODatabase } from "../src/resource"
import crypto from "crypto";

test("Deve salvar um registro na tabela account e consultar por id", async function ()  {
    const account = {
        accountId: crypto.randomUUID(),
        name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
    }
    
    const accountDAO = new AccountDAODatabase();
    await accountDAO.saveAccount(account);
    const savedAccount = await accountDAO.getAccountById(account.accountId);
    expect(savedAccount.account_id).toBe(account.accountId);
    expect(savedAccount.name).toBe(account.name);
	expect(savedAccount.email).toBe(account.email);
	expect(savedAccount.cpf).toBe(account.cpf);
})

test("Deve salvar um registro na tabela account e consultar por email", async function ()  {
    const account = {
        accountId: crypto.randomUUID(),
        name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "87748248800",
		isPassenger: true
    }

    const accountDAO = new AccountDAODatabase();
    await accountDAO.saveAccount(account);
    const savedAccount = await accountDAO.getAccountByEmail(account.email);
    expect(savedAccount.account_id).toBe(account.accountId);
    expect(savedAccount.name).toBe(account.name);
	expect(savedAccount.email).toBe(account.email);
	expect(savedAccount.cpf).toBe(account.cpf);
})