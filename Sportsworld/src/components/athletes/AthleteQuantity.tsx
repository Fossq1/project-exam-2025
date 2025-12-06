import { useContext } from "react";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";

const AthleteQuantity = () => {
  const { getAthleteQuantity } = useContext(AthleteContext) as IAthleteContext;

  return (
    <section>
      <p>Amount of athletes: {getAthleteQuantity()}</p>
    </section>
  );
};

export default AthleteQuantity;
