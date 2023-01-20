import { Component } from "react";
import IconCapture from "../assets/icons/capture";

interface ButtonProps {
    onClick?: () => void;
    icon: Function;
}

export default function RoundedButton(props: ButtonProps){
    return (
        <button onClick={ props.onClick } className="shadow-selphie bg-white/70 text-black transition hover:scale-105 rounded-xl h-24 w-24 text-7xl flex items-center justify-center">
          { props.icon() }
        </button>
    )
}