import AthleteList from "../components/athletes/AthleteList";
import AthleteQuantity from "../components/athletes/AthleteQuantity";

const AthletePage = () => {
  return (
    <>
      <header>
        <h1>Athletes</h1>
      </header>
      <AthleteList />
      <AthleteQuantity />
    </>
  );
};

export default AthletePage;
