import { Component, useEffect, useState } from "react";
import IconCapture from "../assets/icons/capture";
import { animated, useSpring } from '@react-spring/web'

interface CountdownProps {
    time: number;
    setTime: (time: number) => void;
}

export default function Countdown(props: CountdownProps){

    const [opacitySpring, opacityApi] =  useSpring(() => ({
        from: { opacity: 1 },
        to: { opacity: 0.5 },
        config: { duration: 1000 }
    }))

    useEffect(() => {
        if (props.time > 0){
            opacityApi.start({ from: { opacity: 1 }, to: { opacity: 0.5 }, config: { duration: 1000 } })
            props.time > 0 && setTimeout(() => { props.setTime(props.time - 1) }, 1000)
        }
    }, [props.time])

    return (
        <>
        { props.time > 0 && 
            <div className="w-full h-full fixed z-50 flex justify-center items-center">
            <animated.div  style={opacitySpring} className="bg-white w-full h-full fixed top-0 left-0 flex justify-center items-center">
            </animated.div>
                <p className="text-[15rem] font-bold z-50 font-outline-6">
                    { props.time }
                </p>
            </div>
        }
        </>
    )
}