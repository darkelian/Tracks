import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import logo from '../../assets/Logo.png';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header>
            <nav className="flex items-center justify-between flex-wrap fixed top-0 p-6 z-10 w-full bg-red-light">
                <img src={logo} alt="Logo de Four Parks" className="w-14 h-14 ml-8"/>

                <div className={`w-full flex-grow lg:items-center lg:w-auto lg:block pt-6 lg:pt-0`} id="nav-content">
                    <ul className="list-reset lg:flex justify-end flex-1 items-center text-xl">
                        <li className="mr-16 relative">
                            <Link activeClass="active" smooth spy to="quienes-somos">
                                <h2 className="inline-block font-title font-medium text-white hover:scale-105 py-2 px-4 cursor-pointer"> ¿Quiénes somos? </h2>
                            </Link>
                        </li>
                        <li className="mr-16 relative">
                            <Link activeClass="active" smooth spy to="paso-a-paso">
                                <h2 className="inline-block font-title font-medium text-white hover:scale-105 py-2 px-4 cursor-pointer"> Paso a paso </h2>
                            </Link>
                        </li>
                        <li className="mr-16 relative">
                            <Link activeClass="active" smooth spy to="opiniones">
                                <h2 className="inline-block font-title font-medium text-white hover:scale-105 py-2 px-4 cursor-pointer"> Opiniones </h2>
                            </Link>
                        </li>
                        <li className="mr-16 relative">
                            <Link activeClass="active" smooth spy to="preguntas-frecuentes">
                                <h2 className="inline-block font-title font-medium text-white hover:scale-105 py-2 px-4 cursor-pointer"> FAQ </h2>
                            </Link>
                        </li>
                        <li className="mr-16 relative">
                            <button to="/registro" className="inline-block font-title font-medium text-white hover:scale-105 py-2 px-4" 
                            onClick={() => navigate("/registro")}> Registrarse </button>
                        </li>
                        <li className="mr-16 relative">
                            <button to="/inicio-sesion" className="inline-block font-title font-medium text-white hover:scale-105 py-2 px-4" 
                            onClick={() => navigate("/inicio-sesion")}> Iniciar sesión </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
