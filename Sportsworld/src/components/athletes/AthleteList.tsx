import { useContext, useEffect, useState } from "react";
import AthleteItem from "./AthleteItem";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";
import { type IAthlete } from "../../interfaces/IAthlete";


const AthleteList = () => {
const { athletes } = useContext(AthleteContext) as IAthleteContext;
// State for filtering athletes
const [filterText, setFilterText] = useState("");
// State for error-messages
const [errorMessage, setErrorMessage] = useState<string | null>(null);


// Creating state for list/array of athletes, initialized as an empty array


const [filteredAthletes, setFilteredAthletes] =
useState<IAthlete[]>(athletes);


// Filtering a list of athletes based on user input, updating the displayed list dynamically using state and effect hooks


const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
setFilterText(event.target.value);
};


// Filtering the athletes list based on the user’s input and updates the displayed results and showing an error message if no matching athlete is found.
useEffect(() => {
const filtered = athletes.filter((athlete) =>
athlete.name.toLowerCase().includes(filterText.toLowerCase())
);


setFilteredAthletes(filtered);


if (filterText.trim() !== "" && filtered.length === 0) {
setErrorMessage("No athlete found with that name");
} else {
setErrorMessage(null);
}
}, [filterText, athletes]);


// Mapping the athletes and passing them individually into AthleteItem to return an array of JSX
const getAthleteJSX = () => {
const athleteJSX = filteredAthletes.map((athlete, index) => {
return <AthleteItem key={"Athlete" + index} athlete={athlete} />;
});
return athleteJSX;
};


return (
<section>
<header className="flex justify-center">
<div className=" py-4">
<p>Filter by name: </p>
{errorMessage && (
<p className="text-red-600 font-semibold text-center mb-4">
{errorMessage}
</p>
)}
<input
value={filterText}
className="border border-white-500"
type="text"
onChange={handleFilterChange}
/>
</div>
</header>
<section className="px-24 grid grid-cols-3 gap-4 text-center place-items-center4">
{getAthleteJSX()}
</section>
</section>
);
};


export default AthleteList;



