import axios from "axios";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinancesResponse } from "../interfaces/IResponseInterface";


const financeEndpoint = "http://localhost:5177/api/finance";

const FinanceService = {

    getAllFinances: async () : Promise<IFinancesResponse> => {
        
        try{
            const response = await axios.get(financeEndpoint);
            return {
                success: true,
                data: response.data as IFinance[]
            };
        }catch{
            return {
                success: false,
                data: null
            };
        }
    },

    updateFinance: async (
        financeId: number,
        finance: IFinance
    ): Promise<{ success: Boolean }> => {
        try {
            await axios.put(`${financeEndpoint}/${financeId}`, finance);
            return {
                success: true
            };
        }catch (error){
            console.error("updateFinance failed", error);
            return {
                success: false
            };
        }
    }
};

export default FinanceService;