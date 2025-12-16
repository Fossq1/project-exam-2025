import axios from "axios";
import { type IAthlete } from "../interfaces/IAthlete";
import type {
  IDefaultResponse,
  IAthletesResponse,
} from "../interfaces/IResponseInterface";

const endpoint = "http://localhost:5177/athlete";

const endpointImageUpload = "http://localhost:5177/imageupload";

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
const uploadImage = async (image: File): Promise<IDefaultResponse> => {
  const type = "athletes";
  const formData = new FormData();
  // Appender filen sammen med imagePath
  formData.append("file", image);
  formData.append("type", type);
  try {
    const response = await axios({
      url: endpointImageUpload,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    formData.delete("file");
    return { success: true };
  } catch (error) {
    console.error("Error uploading image", error);
    return { success: false };
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

const updateAthlete = async (
  updatedAthlete: IAthlete
): Promise<IDefaultResponse> => {
  try {
    const response = await axios.put(endpoint, updatedAthlete);
    console.log(response);
    return { success: true };
  } catch (error) {
    console.error("Something went wrong with updating athlete");
    return { success: false };
  }
};

export default {
  getAllAthletes,
  updateAthlete,
  deleteAthlete,
  insertAthlete,
  uploadImage,
};
