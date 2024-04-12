import { AccountDAO } from "../resource";

export class GetAccount {

	constructor (readonly accountDAO: AccountDAO) {}

	async execute(accountId: string) {
		const account = await this.accountDAO.getAccountById(accountId);
		return account;
	}
}