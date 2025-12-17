import axios from "axios";
import { type IAthlete } from "../interfaces/IAthlete";
import type {
IDefaultResponse,
IAthletesResponse,
} from "../interfaces/IResponseInterface";

// Creating 2 different variables, for two different purposes: one is crud-operations against the db and the other is for imageupload.

const endpoint = "http://localhost:5177/athlete";


const endpointImageUpload = "http://localhost:5177/imageupload";



// Using axios.get and endpoint to fetch data from the api - checking if errors occur and logging them to the console


const getAllAthletes = async (): Promise<IAthletesResponse> => {
try {
const response = await axios.get(endpoint);
if (response.status === 200) {
console.log("Athletes retrieved");
return { success: true, data: response.data };
} else {
console.log("Athletes failed to retrieve from API");
return { success: false, data: null };
}
} catch {
return {
success: false,
data: null,
};
}
};

// Using axios.post and endpointImageUpload to send image to the api - checking if errors occur and logging them to the console.

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
if (response.status === 201) {
console.log("Image uploaded");
return { success: true };
} else {
console.log("Image failed to upload");
return { success: false };
}
} catch (error) {
console.error("Error reaching API ImageUpload", error);
return { success: false };
}
};

// Using axios.delete and endpoint + id to delete athlete from the api - checking if errors occur and logging them to the console


const deleteAthlete = async (id: number): Promise<IDefaultResponse> => {
try {
const response = await axios.delete(`${endpoint}/${id}`);
if (response.status === 204) {
console.log(`Athlete with id ${id} has been deleted`);
return {
success: true,
};
} else {
console.log("Problem occured when trying to delete athlete");
return { success: false };
}
} catch {
return {
success: false,
};
}
};


// Using axios.post and endpoint to insert athlete into api - checking if errors occur and logging them to the console

const insertAthlete = async (athlete: IAthlete): Promise<IDefaultResponse> => {
try {
const response = await axios.post(endpoint, athlete);
if (response.status === 201) {
console.log("Athlete was successfully inserted");
return { success: true };
} else {
console.log("Athlete was unable to be created");
return { success: false };
}
} catch {
return { success: false };
}
};




// Using axios.put and endpoint to update record of athlete in the database - checking if errors occur and logging them to the console


const updateAthlete = async (
updatedAthlete: IAthlete
): Promise<IDefaultResponse> => {
try {
const response = await axios.put(endpoint, updatedAthlete);
if (response.status === 204) {
console.log("Athlete updated!");
return { success: true };
} else {
console.log("Athlete failed to upload");
return { success: false };
}
} catch (error) {
console.error("Something went wrong with updating athlete", error);
return { success: false };
}
};

// Exporting methods to be accessible

export default {
getAllAthletes,
updateAthlete,
deleteAthlete,
insertAthlete,
uploadImage,
};



