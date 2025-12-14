import CustomAthleteList from "../components/athletes/CustomAthleteList";

const AthleteEditPage = () => {
  return (
    <>
      <header className="flex justify-center py-8 bg-red-600 ">
        <h1 className="text-4xl text-center py-8 ">Create your own athlete</h1>
      </header>
      <div>
        <CustomAthleteList />
      </div>
    </>
  );
};

export default AthleteEditPage;
