import { useContext } from "react";
import AthleteItem from "./AthleteItem";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";

const AthleteList = () => {
  const { athletes } = useContext(AthleteContext) as IAthleteContext;

  const getAthleteJSX = () => {
    const athleteJSX = athletes.map((athlete, index) => {
      return <AthleteItem key={"Athlete" + index} athlete={athlete} />;
    });
    return athleteJSX;
  };

  return (
    <section>
      <header>
        <h2>List of all athletes: </h2>
      </header>
      <section>{getAthleteJSX()}</section>
    </section>
  );
};

export default AthleteList;
