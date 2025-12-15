import { useState, createContext, type ReactNode, useEffect, useContext } from "react";
import { type IFinance } from "../interfaces/IFinance";
import FinanceService from "../services/FinanceService";
import type { IFinanceContext } from "../interfaces/IFinanceContext";

export const FinanceContext = createContext<IFinanceContext | null>(null);

/*
    ********** setFinancesFromService **********
    - uses React-hook to use method useContext
    - throws 
*/

export const useFinanceContext = () => {
   
    const context = useContext(FinanceContext);
    if(!context) {
        throw new Error("Must be inside the provider");
    }
    return context;
}

interface Props { 
    children : ReactNode 
}

    /*
        - sets up state with empty list as default
        - useEffect runs setFinancesFromService once when components are loaded (by using "[]").
        - gets all the rows from the table
        - saves results in finances
        - components that uses finances will get updated data. 
    */

export const FinanceProvider = ({ children }: Props) => {

/*
    - sets up state with empty list as default
    - useEffect runs setFinancesFromService once when components are loaded (by using "[]").
    - gets all the rows from the table
    - saves results in finances
    - components that uses finances will get updated data. 
*/
    const [finances, setFinances] = useState<IFinance[]> ([]);

    useEffect(() => {
        void setFinancesFromService();
    }, []);


/*
    ********** setFinancesFromService **********
    -uses getAllFinances() from FinanceService
    -if response is success and is not null:
        -sets finances with response.data
    
*/

    const setFinancesFromService =  async () => {
        const response = await FinanceService.getAllFinances();
        if (response.success && response.data) {
            setFinances(response.data);
        }
    };

/* 
    ********** addToMoneyLeft **********
    - Increases the remaining budget for a given finance row, this instance only 1.
    - Creates updated copy with increased moneyLeft
    - Updates to backend using PUT-request
    - Updates local state if backend succeeds. 
    
*/

    const addToMoneyLeft = async (financeId: number, amount: number) => {

        const current = finances.find(f => f.id === financeId);
        if (!current) return;

        const updatedFinance={
            ...current,
            moneyLeft: current.moneyLeft + amount
        };

        //backend
        const result = await FinanceService.updateFinance(financeId, updatedFinance);

        //frontend
        if (result.success){
            setFinances(prev => 
                prev.map(f => (f.id === financeId ? updatedFinance : f ))
            );
        }
    };

/* 
    ********** applyPurchase **********
    -Goes through the rows from finance table
    -Finds id that matches financeId
    -creates a new version of the selected row:
        -decrements value from moneyLeft
        -increments value from moneySpent
        -increments by 1 on numberOfPurchases
*/

    const applyPurchase = async (financeId : number, price: number) => {
        const current = finances.find(f => f.id === financeId);
        if(!current) return;
    
        const updatedFinance = {
            ...current,
            moneyLeft: current.moneyLeft - price,
            moneySpent: current.moneySpent + price,
            numberOfPurchases: current.numberOfPurchases + 1
        };

        const response = await FinanceService.updateFinance(financeId, updatedFinance);

        if (response.success){

            setFinances(prev => 
                prev.map( f => (f.id === financeId ? updatedFinance : f))
            ); 
        }   
    }

    const value: IFinanceContext = {
        finances,
        addToMoneyLeft,
        applyPurchase
    };

    return(
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    )
}

