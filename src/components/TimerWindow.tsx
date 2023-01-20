import { Component, useEffect, useState } from "react";
import IconCapture from "../assets/icons/capture";
import { animated, useSpring } from '@react-spring/web'

interface WindowProps {
    popupText: string;
    hidden: boolean;
    time : number;
    setHidden: (hidden: boolean) => void;
    setTime: (time: number) => void;
}

export default function TimerWindow(props: WindowProps){

    const secondsWhite = 2;
    let [takePhoto, setTakePhoto] = useState(false);

    const [opacitySpring, opacityApi] =  useSpring(() => ({
        from: { opacity: 0 },
        to: { opacity: 1 }
    }))

    const [slideInSpring, slideApi] = useSpring(() => ({
        from: { transform: "translateY(200%)" },
        to: { transform: "translateY(0)" }
    }))


    const onClose = () => { 
        opacityApi.start({ from: { opacity: 1 }, to: { opacity: 0 } })
        slideApi.start({ from: {transform: "translateY(0%)"}, to: { transform: "translateY(200%)" }, onResolve: () => { props.setHidden(true) } })
    }
    
    useEffect(() => {
        if(!props.hidden){
            opacityApi.start({ from: { opacity: 0 }, to: { opacity: 1 } })
            slideApi.start({ from: {transform: "translateY(200%)"}, to: { transform: "translateY(0)" } })
        }
    }, [props.hidden])

    useEffect(() => {
        if (props.time <= (secondsWhite * -1) && takePhoto){
            setTakePhoto(false);
            props.setTime(0);
        }
        if (props.time <= 0 && takePhoto){
            setTimeout(() => { props.setTime(props.time - 1) }, 1000)
        }
    }, [props.time])

    return (
        <>
        { !props.hidden && 
            <animated.div style={opacitySpring} className="bg-black/50 w-full h-full fixed top-0 left-0 z-50">
                <animated.div style={slideInSpring} className={`w-2/3 h-2/3 flex flex-col absolute text-center p-5 m-auto left-0 right-0 text-3xl font-bold rounded-xl shadow-selphie top-0 bottom-0 bg-white`}>
                    { props.popupText }
                    <div className="w-full h-auto flex items-center justify-center gap-5 mt-auto">
                        <button onClick={ () => { props.setTime(3); props.setHidden(true); setTakePhoto(true); } } className="h-28 transition-all hover:scale-110 w-28 shadow-selphie border-2 border-dashed text-4xl bg-gray-300 border-gray-700/50 rounded-full font-bold mt-auto">
                        <p>3</p> 
                            <p className="text-lg">Sekunden</p>
                        </button>
                        <button onClick={ () => { props.setTime(5); props.setHidden(true); setTakePhoto(true); } } className="h-28 w-28 transition-all hover:scale-110 shadow-selphie border-2 border-dashed text-4xl bg-gray-300 border-gray-700/50 rounded-full font-bold mt-auto">
                            <p>5</p> 
                            <p className="text-lg">Sekunden</p>
                        </button>
                        <button onClick={ () => { props.setTime(10); props.setHidden(true); setTakePhoto(true); }} className="h-28 w-28 transition-all hover:scale-110 shadow-selphie border-2 border-dashed text-4xl bg-gray-300 border-gray-700/50 rounded-full font-bold mt-auto">
                        <p>10</p> 
                            <p className="text-lg">Sekunden</p>
                        </button>
                    </div>
                    <div className="w-full h-auto flex items-center justify-end gap-5 mt-auto">
                        <button onClick={ onClose } className="px-4 shadow-selphie py-2 border-2 text-2xl bg-gray-300 border-gray-300 rounded-lg font-bold mt-auto">Abbrechen</button>
                    </div>
                </animated.div>
            </animated.div>
        }
        { takePhoto && props.time <= 0 && 
        <div className="w-full h-full bg-white z-50 fixed  flex justify-center items-center">
            <p className="text-shadow-selphie text-9xl font-bold z-50">
                CHEESE
            </p>
        </div>
        }
        </>
    )
}