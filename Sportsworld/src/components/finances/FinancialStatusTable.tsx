import FinancialStatusItem from "./FinancialStatusItem";
import { useFinanceContext } from "../../contexts/FinanceContext";

//Financial status component from the finance-page. 

const FinancialStatusTable = () => {

    const { finances } = useFinanceContext();

    return (
        <div className="rounded-2xl bg-zinc-900 border border-white/10 p-4 md:p-6">
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                    Financial Status
                </h3>
                <div className="mt-3 h-px w-full bg-red-500/60"/>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border-collapse">

                    <thead>
                        <tr className="border-b border-white/10 text-left text-s uppercase tracking-wide text-white/60">
                            <th className="py-3 pr-6">Id</th>
                            <th className="py-3 pr-6">Budget Spent</th>
                            <th className="py-3 pr-6">Remaining Budget</th>
                            <th className="py-3 pr-6">Total Athlete Purchases</th>
                        </tr>
                    </thead>

                    <tbody>
                    {finances.map(f => (
                        <FinancialStatusItem key={f.id} finance={f}/>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default FinancialStatusTable;