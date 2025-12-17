import FinancialStatusTable from "../components/finances/FinancialStatusTable";
import BankLoan from "../components/finances/BankLoan";
import UnpurchasedAthletes from "../components/athletes/UnpurchasedAthletes";


const FinancePage = () => {


   return (
       <>
           <header title="Dashboard">
           </header>
           <main className="px-4 py-6 md:px-8">
               <h1 className="mb-8 text-center text-2xl font-bold uppercase tracking-tight text-white">Finance Dashboard</h1>
               <div className="grid grid-cols-1 md:grid-cols-1 gap-4 lg:grid-cols-2">
                   <section className="rounded-2xl bg zinc-900">
                       <FinancialStatusTable/>
                   </section>
                   <section className="mx-aut w-full max-w-2xl rounded-2xl md:p-6">
                       <BankLoan/>
                   </section>
                   <section className="rounded-2xl bg zinc-900">
                       <UnpurchasedAthletes/>
                   </section>
                   <section>
                   </section>
               </div>
               <div>
                  
               </div>
           </main>
       </>
   )
}


export default FinancePage;

