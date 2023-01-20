import { API_URL } from "../Constants";

export default function Stream(){
    return (
        <div>
            <img src={API_URL + "/stream"} className="w-full h-full fixed object-center z-0" />
        </div>
    )
}