import axios from "axios";
import { type IAthlete } from "../interfaces/IAthlete";
import type {
  IAthleteResponse,
  IDefaultResponse,
  IAthletesResponse,
} from "../interfaces/IResponseInterface";

const endpoint = "http://localhost:5177/athlete";

const getAllAthletes = async (): Promise<IAthletesResponse> => {
  try {
    const response = await axios.get(endpoint);
    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

const postAthlete = async (athlete: IAthlete): Promise<IDefaultResponse> => {
  try {
    const response = await axios.post(endpoint, athlete);
    console.log(response);
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
    };
  }
};

const deleteAthlete = async (id: number): Promise<IDefaultResponse> => {
  try {
    const response = await axios.delete(`${endpoint}/${id}`);
    console.log(`Athlete with id ${id} has been deleted`);
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
    };
  }
};

const getAthleteById = async (id: number): Promise<IAthleteResponse> => {
  try {
    const response = await axios.get(`${endpoint}/${id}`);
    console.log(response);
    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

const insertAthlete = async (athlete: IAthlete): Promise<IDefaultResponse> => {
  try {
    const response = await axios.post(endpoint, athlete);
    console.log(response);
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
    };
  }
};

export default {
  getAllAthletes,
  postAthlete,
  deleteAthlete,
  getAthleteById,
  insertAthlete,
};
