import axios from "axios";
import type { IFinance } from "../interfaces/IFinance";
import type { IFinancesResponse } from "../interfaces/IResponseInterface";

// Base URL for finance API, user by all requests in this service
const financeEndpoint = "http://localhost:5177/finance";

// Handles all communication with the Finance API
// Keep API logic sepereate from components and context.

const FinanceService = {
  // Sends GET request to backend
  // Retrieves all Finance entities
  // return as standard response object

  getAllFinances: async (): Promise<IFinancesResponse> => {
    try {
      const response = await axios.get(financeEndpoint);
      return {
        success: true,
        data: response.data as IFinance[],
      };
    } catch {
      // if request fails, return fail status
      return {
        success: false,
        data: null,
      };
    }
  },

  /*
   - Sends updated finance data to backend
   - Used when budget changes (ex. purchases, transfers)
   - Uses PUT to update existing finance record.
*/
  updateFinance: async (
    financeId: number,
    finance: IFinance
  ): Promise<{ success: Boolean }> => {
    try {
      // Sends updated finance object to API
      await axios.put(`${financeEndpoint}`, finance);
      return {
        success: true,
      };
    } catch (error) {
      // Logs error for debugging
      console.error("updateFinance failed", error);
      return {
        success: false,
      };
    }
  },
};

export default FinanceService;
