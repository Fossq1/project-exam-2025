import { useContext } from "react";
import type { IFinance } from "../../interfaces/IFinance";

const FinancialStatusItem = ({finance}:{finance: IFinance}) => {
    return(

        <tr className="border-b border-white/5 text-s font-bold text-white">
        <td className="py-3 pr-6">{finance.id}</td>
        <td className="py-3 pr-6">{finance.moneySpent}</td>
        <td className="py-3 pr-6">{finance.moneyLeft}</td>
        <td className="py-3 pr-6">{finance.numberOfPurchases}</td>
        </tr>
    )
}
export default FinancialStatusItem;