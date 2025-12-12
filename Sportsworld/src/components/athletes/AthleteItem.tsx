import { type IAthlete } from "../../interfaces/IAthlete";

const AthleteItem = ({ athlete }: { athlete: IAthlete }) => {
  return (
    <article>
      <h3>{athlete.name}</h3>
    </article>
  );
};

export default AthleteItem;
