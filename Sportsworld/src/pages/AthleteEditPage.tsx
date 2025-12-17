import CustomAthleteList from "../components/athletes/CustomAthleteList";

// Creating the page where the customathletelist will be displayed
const AthleteEditPage = () => {
  return (
    <>
      <header className="flex justify-center py-4 ">
        <h1 className="text-4xl text-center py-4 ">Create your own athlete</h1>
      </header>
      <div>
        <CustomAthleteList />
      </div>
    </>
  );
};

export default AthleteEditPage;
