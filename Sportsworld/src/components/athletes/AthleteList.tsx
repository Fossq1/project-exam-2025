import { useContext } from "react";
import AthleteItem from "./AthleteItem";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import { AthleteContext } from "../../contexts/AthleteContext";

const AthleteList = () => {
  const { athletes } = useContext(AthleteContext) as IAthleteContext;

  /*
  const [filteredAthletes, setFilteredAthletes] = useState<IAthlete>();

  const filterAthletes = () => {
    setFilteredAthletes(athletes)
  }
  */

  const getAthleteJSX = () => {
    const athleteJSX = athletes.map((athlete, index) => {
      return <AthleteItem key={"Athlete" + index} athlete={athlete} />;
    });
    return athleteJSX;
  };

  return (
    <section>
      <header className="flex justify-center">
        <div className="flex py-4">
          <p>Filter by name: </p>
          <input className="border border-white-500" type="text" />
        </div>
      </header>
      <section className="px-24 grid grid-cols-3 gap-4 text-center place-items-center4">
        {getAthleteJSX()}
      </section>
    </section>
  );
};

export default AthleteList;
