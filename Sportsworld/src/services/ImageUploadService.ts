import axios from "axios";
import { type ImageUploadResponse } from "../interfaces/IResponseInterface";
const endpoint = "http://localhost:5177/imageupload";

// uploadImage function used to add images to their correct folder (athletes or venues) Returns the filepath (GUID is used)

const uploadImage = async (image: File, category: "athletes" | "venues") => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("category", category);

  try {
    const response = await axios.post<ImageUploadResponse>(
      endpoint,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return {
      success: true,
      path: response.data.path
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false
    };
  }
};

export default uploadImage;
