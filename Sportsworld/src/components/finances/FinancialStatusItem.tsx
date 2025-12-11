import { useContext } from "react";
import type { IFinance } from "../../interfaces/IFinance";

const FinancialStatusItem = ({finance}:{finance: IFinance}) => {
    return(

        <tr>
        <td>{finance.id}</td>
        <td>{finance.moneyLeft}</td>
        <td>{finance.moneySpent}</td>
        <td>{finance.numberOfPurchases}</td>
        </tr>
    )
}
export default FinancialStatusItem;