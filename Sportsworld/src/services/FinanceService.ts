import axios from "axios";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinancesResponse } from "../interfaces/IResponseInterface";


const financeEndpoint = "http://localhost:5177/api/finance";



const getAllFinances = async () : Promise<IFinancesResponse> => {
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
        }
    }
}

export default { getAllFinances }