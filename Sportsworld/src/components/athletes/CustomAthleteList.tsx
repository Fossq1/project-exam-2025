import { useContext, useRef, useState, type ChangeEvent } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";


const CustomAthleteList = () => {
const { athletes, saveImage, insertAthlete } = useContext(
AthleteContext
) as IAthleteContext;


// Lager state for error-handling
const [errorMessage, setErrorMessage] = useState<string | null>(null);


// Håndterer bildeopplastning


const [image, setImage] = useState<File | null>(null);


const setImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
const { files } = e.target;


if (files != null) {
const file = files[0];
setImage(file);
}
};


const nameInput = useRef<HTMLInputElement | null>(null);
const genderInput = useRef<HTMLInputElement | null>(null);
const priceInput = useRef<HTMLInputElement | null>(null);


const getAllAthleteJSX = () => {
const allAthleteJSX = athletes.map((athlete, index) => {
return <AthleteItem key={"Athlete" + index} athlete={athlete} />;
});
return allAthleteJSX;
};


const handleSaveAthlete = async () => {
setErrorMessage(null);


if (!nameInput.current || nameInput.current.value.trim() === "") {
setErrorMessage("Name is required");
return;
}


if (!genderInput.current || genderInput.current.value.trim() === "") {
setErrorMessage("Gender is required");
return;
}


if (!priceInput.current || priceInput.current.value.trim() === "") {
setErrorMessage("Price is required");
return;
}


if (!image) {
setErrorMessage("Error, you have to select an image");
return;
}


try {
const imageResponse = await saveImage(image);


if (!imageResponse.success) {
setErrorMessage("Failed to upload image");
return;
}


const newAthlete: IAthlete = {
name: nameInput.current.value,
gender: genderInput.current.value,
price: Number(priceInput.current.value),
purchaseStatus: false,
image: imageResponse.path,
};


const athleteResponse = await insertAthlete(newAthlete);


if (!athleteResponse.success) {
setErrorMessage("Failed to save athlete");
return;
}
} catch {
setErrorMessage("Unexpected error occurred");
}
};
return (
<section>
<h1>Add your athlete</h1>
<div>
<label>Name</label>
<input className="border" ref={nameInput} type="text" />
<label>Gender</label>
<input className="border" ref={genderInput} type="text" />
<label>Price</label>
<input className="border" ref={priceInput} type="text" />
<label>
Image
<input onChange={setImageHandler} type="file" />
</label>
</div>
<div>
{errorMessage && (
<p className="text-red-600 font-semibold mb-2">{errorMessage}</p>
)}
<button onClick={handleSaveAthlete} className="border px-4">
Save
</button>
</div>
<div className="grid px-24 grid grid-cols-4 gap-4 text-center place-items-center4">
{getAllAthleteJSX()}
</div>
</section>
);
};


export default CustomAthleteList;



