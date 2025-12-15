import { type IFinance } from "./IFinance";

export interface IFinanceContext {
    finances: IFinance[],
    addToMoneyLeft: (financeId: number, amount: number) => Promise<void>;
    applyPurchase: (financeId: number, price: number) => Promise<void>;
}