import AthleteList from "../components/athletes/AthleteList";
import AthleteQuantity from "../components/athletes/AthleteQuantity";

const AthletePage = () => {
  return (
    <>
      <header className="bg-red-600">
        <h1 className="text-4xl text-center py-8">Athletes</h1>
      </header>
      <div className="px-28">
        <AthleteQuantity />
        <AthleteList />
      </div>
    </>
  );
};

export default AthletePage;
