type ErrorPopupProps = {
   message: string;
   closePopup: () => void;
   title?: string;
}


//Shared ErrorPopup component that can be used across the different pages


const ErrorPopup = ({message, closePopup, title = "Error"}: ErrorPopupProps) => {
   return (
      
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"> {/* outer div - centers errorpopup and gives it darker background for overlay-effect */}
           {/* popup error box */}
           <div className="w-full max-w-md rounded-2xl border-white/10 bg-zinc-950 p-5 shadow-2xl">
               {/* header div - contain title and x-button*/}
               <div className="flex items-start justify-between gap-4">
                   <div className="min-w-0">
                       <h3 className="text-base font-extrabold uppercase tracking-wide text-white">
                           {title}
                       </h3>
                       <div className="mt-2 h-1 rounded-full bg-red-600"/>
                   </div>
                   <button
                       type="button"
                       onClick={closePopup}
                       className="rounded-lg px-3 py-1 text-white/70 hover:bg-white/10 hover:text-white transition"
                       aria-label= "Close"
                   >
                       X
                   </button>
               </div>
               <p className="mt-4 text-sm leading-relaxed text-white/80">{message}</p>


               {/* footer div - contains OK button */}
               <div className="mt-4 flex justify-start">
                   <button
                       type="button"
                       onClick={closePopup}
                       className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition"
                   >
                       OK
                   </button>
               </div>
           </div>
       </div>
   )
}
export default ErrorPopup;


