import { useRef, useContext, useState } from "react";
import type { IFinance } from "../../interfaces/IFinance";
import type { IFinanceContext } from "../../interfaces/IFinanceContext";
import FinancialStatusItem from "./FinancialStatusItem";
import { useFinanceContext } from "../../contexts/FinanceContext";

//Financial-section component from the finance-page. 

const FinancialStatusList = () => {

    const { finances } = useFinanceContext(); 
    return (
        <div>
            <h3>Financial Status</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Remaining Budget</th>
                        <th>Budget Spent</th>
                        <th>Total Athlete Purchases</th>
                    </tr>
                </thead>
                <tbody>
                {finances.map(f => (
                    <FinancialStatusItem key={f.id} finance={f}/>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default FinancialStatusList;