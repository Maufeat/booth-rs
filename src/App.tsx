import { useState } from "react";
import logoWhite from "./assets/logo_white.png";
import logoBlack from "./assets/logo_black.png";
import settingIcon from "./assets/icons/setting.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { API_URL } from "./Constants";
import Stream from "./views/Stream";
import IconCapture from "./assets/icons/capture";
import RoundedButton from "./components/RoundedButton";
import OptionBar from "./components/OptionBar";
import TimerWindow from "./components/TimerWindow";
import Countdown from "./components/Countdown";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [hidden, setHidden] = useState(true)
  const [time, setTime] = useState(0)

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="w-full h-full fixed">
      <Stream />

      <div id="logo" className="absolute left-5 top-5">
        <img src={logoWhite} className="h-12 opacity-70"/>
      </div>

      <OptionBar />

      <div id="bottom_menu" className="absolute bottom-5 right-5 w-auto h-20 flex items-end justify-center">
        <div className="flex items-center justify-center gap-10">
          <RoundedButton icon={IconCapture} onClick={() => { setHidden(false) }} />
        </div>
      </div>

      <TimerWindow popupText="Wähle den Timer" hidden={hidden} setHidden={setHidden} time={time} setTime={setTime} />
      <Countdown time={time} setTime={setTime} />
    </div>
  );
}

export default App;
