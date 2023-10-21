import { FC } from "react";
import { RotatingLines } from  'react-loader-spinner';
import "./Spinner.css";

const Spinner: FC = () => {
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

export default Spinner;