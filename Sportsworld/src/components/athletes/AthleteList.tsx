import AthleteItem from "./AthleteItem";
import { AthleteContext, useAthleteContext } from "../../contexts/AthleteContext";

const AthleteList = () => {
  const { athletes } = useAthleteContext();

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
