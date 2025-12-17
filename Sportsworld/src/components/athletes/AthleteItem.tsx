import { useContext, useRef, useState } from "react";
import { type IAthlete } from "../../interfaces/IAthlete";
import { AthleteContext } from "../../contexts/AthleteContext";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";


const endpoint = "http://localhost:5177/";


interface Props {
athlete: IAthlete;
onBuy?: (athlete: IAthlete) => void;
canBuy?: boolean;
}


// Creating AthleteItem functional component that takes in athlete object


const AthleteItem = ({ athlete, onBuy }: Props) => {
// Accessing methods from context
const { deleteAthlete, updateAthlete } = useContext(
AthleteContext
) as IAthleteContext;


// Checking if onBuy is not undefined and purchasestatus is not false
const showBuyButton = onBuy !== undefined && athlete.purchaseStatus === false;
let buyButton = null;


// If onbuy is defined and purchasestatus is true, then show button
if (showBuyButton) {
buyButton = (
<button
type="button"
onClick={() => onBuy!(athlete)}
className="mt-4 rounded-lg border border-green-500 px-8 py-2 text-white hover:bg-green-600 transition"
>
Buy
</button>
);
}


// Setting state for whether user is editing or not
const [isEditing, setIsEditing] = useState(false);


// Setting states for inputfields
const nameInput = useRef<HTMLInputElement | null>(null);
const genderInput = useRef<HTMLInputElement | null>(null);
const priceInput = useRef<HTMLInputElement | null>(null);


// Checking if isEditing is true and returning JSX depending on whether it is or not
const editCheck = () => {
if (isEditing) {
return (
<article>
<input
defaultValue={athlete.name}
className="text-xl border px-4"
ref={nameInput}
type="text"
/>
<input
defaultValue={athlete.gender}
className="text-sm pb-4 px-4 border"
ref={genderInput}
type="text"
/>
<h4 className="text-sm">
{athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
</h4>
<input
defaultValue={athlete.price}
className="text-xl border px-4"
ref={priceInput}
type="text"
/>
<div>
<button onClick={saveButton}>Save</button>
<button onClick={cancelButton}>Cancel</button>
</div>
</article>
);
} else {
return (
<div>
<h3 className="text-xl">{athlete.name}</h3>
<h4 className="text-sm pb-4">{athlete.gender}</h4>
<h4 className="text-sm">
{athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
</h4>
<h4 className="text-xl">{athlete.price}$</h4>
{buyButton}
<div className="py-2 flex gap-2 justify-center">
<button className="border px-2" onClick={() => setIsEditing(true)}>
Edit
</button>
<button
className="border px-2"
onClick={() => athlete.id && deleteAthlete(athlete.id)}
>
Delete
</button>
</div>
</div>
);
}
};


// Action if user clicks on the save button - uses states to set a newAthlete.
const saveButton = () => {
const updatedAthlete: IAthlete = {
id: athlete.id,
name: nameInput.current?.value || athlete.name,
gender: genderInput.current?.value || athlete.gender,
purchaseStatus: athlete.purchaseStatus,
price: parseFloat(priceInput.current?.value || athlete.price.toString()),
image: athlete.image,
};
// Accessing method from context
updateAthlete(updatedAthlete);
// Setting isEditing state back to false
setIsEditing(false);
};


// If user clicks cancel after wanting to edit
const cancelButton = () => {
setIsEditing(false);
};
// Returns JSX
return (
<article className="duration-100 scale-85 hover:scale-88 border border-red-600 border-[5px] rounded-lg pb-8 shadow-2xl">
<img
className="block mx-auto h-auto w-xs pb-8 "
src={`${endpoint}${athlete.image}`}
alt={athlete.name}
/>
{editCheck()}
</article>
);
};


export default AthleteItem;



