import { useContext } from "react";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";


// Accessing context-method to find length of list/array


const AthleteQuantity = () => {
const { getAthleteQuantity } = useContext(AthleteContext) as IAthleteContext;


return (
<section>
<h2 className="text-sm py-4">
Total amount of athletes: {getAthleteQuantity()}
</h2>
</section>
);
};


export default AthleteQuantity;



