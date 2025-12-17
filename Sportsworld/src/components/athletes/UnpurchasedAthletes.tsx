import { useAthleteContext } from "../../contexts/AthleteContext";
import AthleteItem from "./AthleteItem";
import { useFinanceContext } from "../../contexts/FinanceContext";
import type { IAthlete } from "../../interfaces/IAthlete";

// This component shows only athletes that are still available (not purchased).
// When the user buys an athlete, we update finance first (budget/purchases),
// and then we mark the athlete as purchased (backend + state).

const UnpurchasedAthletes = () => {
  const { athletes, purchaseAthlete } = useAthleteContext();
  const { applyPurchase } = useFinanceContext();

  const buyAthlete = async (athlete: IAthlete) => {
    if (!athlete.id) return;

    await applyPurchase(1, athlete.price);
    await purchaseAthlete(athlete.id);
  };

  //Show only unpurchased athletes
  const availableAthletes = athletes
    .filter((athlete) => !athlete.purchaseStatus)
    .map((athlete) => (
      <AthleteItem
        key={athlete.id ?? athlete.name}
        athlete={athlete}
        onBuy={buyAthlete}
      />
    ));

  return (
    <div className="rounded-2xl bg-zinc-900 border border-white/10 p-4 md:p-6">
      <h2 className="text-lg font-bold uppercase tracking-tight text-white">
        Unpurchased Athletes
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4 w-full">
        {availableAthletes}
      </div>
    </div>
  );
};

export default UnpurchasedAthletes;
