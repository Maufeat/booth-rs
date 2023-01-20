
import { Properties } from "csstype";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import IconSettingsOutline from "../assets/icons/settings";

const swipeOpenMenuStyles: Properties = {
    right: "0",
    position: "fixed",
    width: "40%",
    height: "100%",
};

export default function OptionBar(){

  const [isOpen, setOpen] = useState(false);

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () => {
        setOpen(true)
    },
    onSwipedRight: () => {
        setOpen(false)
    },
    delta: 100,
    swipeDuration: 500
  });

    return (
        <>
            <div {...handlers} style={swipeOpenMenuStyles} />


      <div id="settings_btn" className={`absolute z-50 transition-all ${isOpen ? "right-0" : "-right-80"} top-0 h-full w-80 bg-white`}>
        <div onClick={() => {setOpen(!isOpen)}} className={`z-10 shadow-selphie-settings absolute top-2 text-5xl -left-16 w-16 p-2 ${isOpen ? "bg-white" : "bg-white/70"} rounded-l-lg`}>
            <IconSettingsOutline />
        </div>
        <div className="relative z-10 h-full w-full flex flex-col gap-5 p-5">
            <button onClick={() => {setOpen(!isOpen)}} className="w-full shadow-selphie h-12 border-2 bg-gray-300 border-gray-300 rounded-lg font-bold mt-auto">Schließen</button>
        </div>

      </div>
        </>
    )
}