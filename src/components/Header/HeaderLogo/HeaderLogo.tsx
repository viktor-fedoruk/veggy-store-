import { FC } from "react";
import "./HeaderLogo.css";
import LogoImg from "../../../../public/img/VeggyLogo.png";

const HeaderLogo: FC = () => {
    return (
        <div className="headerLogo">
            <a href="/veggy-store-/">
                <img src={LogoImg} alt="Veggy Logo" />
            </a>
        </div>
    )
}

export default HeaderLogo;