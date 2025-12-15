import axios from "axios";

const endpoint = "http://localhost:5177/imageupload";

interface IDefaultResponse {
  success: boolean;
}

const uploadImage = async (image: File, category: "athletes" | "venues") => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("category", category);

  try {
    const response = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.status === 201 ? { success: true } : { success: false };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false };
  }
};
export default uploadImage;