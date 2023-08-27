import { RotatingLines } from  'react-loader-spinner';
import "./Spinner.css";

export default function Spinner() {
    console.log("test");

    return (
        <div className="rotatingSpinner">
            <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="86"
                visible
            />
        </div>
    )
}