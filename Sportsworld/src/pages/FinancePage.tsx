import FinancialStatusList from "../components/finances/FinancialStatusList";

const FinancePage = () => {

    return (
        <>
            <header>
                <h1>Finance Dashboard</h1>
            </header>
            <main>
                <section className="financial-status-section">
                    <FinancialStatusList/>
                </section>
                <section className="user-input-loan-to-company-section">
                    
                </section>
            </main>
        </>
    )
}

export default FinancePage;