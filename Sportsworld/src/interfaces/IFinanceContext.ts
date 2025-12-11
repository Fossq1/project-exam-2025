import { type IFinance } from "./IFinance";

export interface IFinanceContext {
    finances: IFinance[],
    addToMoneyLeft: (financeId: number, amount: number) => void;
    applyPurchase: (financeId: number, price: number) => void;
}