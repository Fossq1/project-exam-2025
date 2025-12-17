import { useState } from "react";
import { useFinanceContext } from "../../contexts/FinanceContext";
import ErrorPopup from "../shared/ErrorPopUp";

const BankLoan = () => {
  
   const { addToMoneyLeft } = useFinanceContext();
   const [amount, setAmount] = useState<string>("");
   const [errorMessage, setErrorMessage] = useState<string | null>(null);


   const increaseMoneyLeftJSX = (e: React.FormEvent) => {
       e.preventDefault(); //stops the page from refreshing refreshing


       const value = Number(amount);
       if (!Number.isFinite(value) || value <= 0) {
           setErrorMessage("Amount must be greater than 0.");
           return;
       }


       addToMoneyLeft(1, value);
       setAmount(""); //resets the input value after onclick or enter-key
   };


   let errorPopup = null;


   if (errorMessage) {
       errorPopup = (
           <ErrorPopup
               message={errorMessage}
               closePopup={() => setErrorMessage(null)}
           />
       );
   }


   return(
       <div className="rounded-2xl bg-zinc-900 border border-white/10 md:p-6">
           <h3 className="mb-4 text-center text-lg font-bold uppercase tracking-tight text-white">
               get loan from bank
           </h3>
           <div className="mx-auto w-full max-w-lg">


               <form onSubmit={increaseMoneyLeftJSX} className="mx-auto flex w-full max-w-lg flex-col gap-4 md:flex-row md:items-end">
                   <label className="text-sm text-white/70">
                       Amount
                   </label>
                   <input
                       type="number"
                       value={amount}
                       onChange={(e) =>
                           setAmount(e.target.value)}
                       className="border p-2"
                   />
                   <button type="submit" className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-500 transition md:whitespace-nowrap">
                       GET LOAN
                   </button>
               </form>
           </div>
           {errorPopup}
       </div>
   )
}


export default BankLoan;

