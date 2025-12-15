import { type IAthlete } from "../../interfaces/IAthlete";

const endpoint = "http://localhost:5177/";

//TODO:  BUTTONS SKAL HA ONCLICK I KOMMUNIKASJON MED FINANCE

const AthleteItem = ({ athlete }: { athlete: IAthlete }) => {
  const buyButton = () => {
    if (athlete.purchaseStatus) {
      return <p className="pt-8">Athlete is unavailable</p>;
    } else {
      return (
        <section className="pt-8 flex justify-evenly">
          <button className="border bg-black-500 border-green-500 p-1 px-8 rounded-lg">
            Buy
          </button>
        </section>
      );
    }
  };

  return (
    <article className="duration-100 scale-85 hover:scale-88 border border-red-600 border-[5px] rounded-lg pb-8 shadow-2xl">
      <img
        className="block mx-auto h-auto w-xs pb-8 "
        src={`${endpoint}${athlete.image}`}
        alt={athlete.name}
      />
      <h3 className="text-xl">{athlete.name}</h3>
      <h4 className="text-sm pb-4">{athlete.gender}</h4>
      <h4 className="text-sm">
        {athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
      </h4>
      <h4 className="text-xl">{athlete.price}$</h4>
      {buyButton()}
    </article>
  );
};

export default AthleteItem;
