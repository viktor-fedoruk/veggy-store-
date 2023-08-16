import './HeaderLogo.css';
import LogoImg from '../../../../public/img/VeggyLogo.png';

export default function HeaderLogo() {
    return (
        <div className="headerLogo">
            <a href="#">
                <img src={LogoImg} alt="Veggy Logo" />
            </a>
        </div>
    )
}
