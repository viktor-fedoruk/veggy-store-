import LogoImg from '../../../../public/img/VeggyLogo.png'
import './HeaderLogo.css'
export default function HeaderLogo () {
    return (
        <div className= 'headerLogo'>
            <a href="http://localhost:5173/">
                <img src={LogoImg} alt='Veggy Logo'/>
            </a>
        </div>
    )
}
