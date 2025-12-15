import { useContext, useState } from "react"
import { AthleteContext, useAthleteContext } from "../../contexts/AthleteContext"
import { type IAthleteContext } from "../../interfaces/IAthleteContext";
import AthleteItem from "./AthleteItem";
import { useFinanceContext } from "../../contexts/FinanceContext";
import type { IAthlete } from "../../interfaces/IAthlete";

const AthleteMarket = () => {

    //function that updates backend + state and marks athlete and bought 
    const {athletes, purchaseAthlete} = useAthleteContext();
    //function that updates backend + state of finance table 
    const { applyPurchase } = useFinanceContext();

    //false = shows available athletes (not purchased), true = shows purchased athletes
    const [showPurchased, setShowPurchased] = useState(false);

    const athletesToShow = showPurchased
        ? athletes.filter(athlete => athlete.purchaseStates) // same as true 
        : athletes.filter(athlete => !athlete.purchaseStates) //same as false

    const buyAthlete = async (athlete: IAthlete) => {
        if (!athlete.id) return;

        await applyPurchase(1, athlete.price);
        await purchaseAthlete (athlete.id);
    };

    return(
        <div className="rounded-2xl bg-zinc-900 border border-white/10 p-4 md:p-6">
            <h2 className="text-lg font-bold uppercase tracking-tight text-white">
                Athlete Market
            </h2>
            <div className="flex gap-2">

                {/*  
                    classname runs javascript inside classname with ${} 
                */}
                <button
                    type="button"
                    onClick={() => setShowPurchased(false)}
                    className="rounded-xl px-4 py-2 text-sm font-semibold transition"
                >
                    Available
                </button>

                <button
                    type="button"
                    onClick={() => setShowPurchased(true)}
                    className="rounded-xø"
                >

                </button>
            </div>
        </div>
    )
}