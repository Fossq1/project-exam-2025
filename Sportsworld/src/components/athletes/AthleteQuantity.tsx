import { useContext } from "react";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";

const AthleteQuantity = () => {
  const { getAthleteQuantity } = useContext(AthleteContext) as IAthleteContext;

  return (
    <section>
      <h2 className="text-sm py-4">
        Amount of athletes: {getAthleteQuantity()}
      </h2>
    </section>
  );
};

export default AthleteQuantity;
