import { useState } from "react";
import { Link } from "react-router-dom";
import logo  from '../../assets/Logo.png';

const Header = () => {
    const [onToggleProfile, setOnToggleProfile] = useState(false);
    const [onToggleAdmin, setOnToggleAdmin] = useState(false);

    return (
        <header> 
            <nav className="flex items-center justify-between flex-wrap fixed top-0 p-6 z-10 w-full bg-red-light">
                <img src={logo} alt="Logo de Four Parks" className="w-14 h-14 ml-8"/>    

                <div className={`w-full flex-grow lg:items-center lg:w-auto lg:block pt-6 lg:pt-0 ${onToggleProfile ? "" : "hidden"}`} id="nav-content">
                    <ul className="list-reset lg:flex justify-end flex-1 items-center text-xl">
                        <li className="mr-16 relative">
                            <Link to="/manager-inicio" className="inline-block font-title font-medium text-white hover:scale-105 py-2 px-4" 
                            onClick={() => {setOnToggleProfile(false);}}>Editar parqueadero</Link>
                        </li>
                        
                        <li className="mr-16 relative">
                            <Link to="/manager-ver-estadisticas" className="inline-block font-title font-medium text-white hover:scale-105 py-2 px-4" 
                            onClick={() => {setOnToggleProfile(false);}}>Ver estadísticas</Link>
                        </li>
                        
                        <li className="mr-16 relative">
                            <Link to="/auditoria" className="inline-block font-title font-medium text-white hover:scale-105 py-2 px-4" 
                            onClick={() => {setOnToggleProfile(false);}}>Auditoria</Link>
                        </li>

                        <li className="mr-6 relative">
                            <button className="flex items-center font-title font-medium text-white hover:scale-105 py-2 px-4 focus:outline-none"
                                onClick={() => {setOnToggleAdmin(!onToggleAdmin); setOnToggleProfile(false)}}>
                                Editar administradores
                                <svg className={`w-5 h-5 ml-2 ${onToggleAdmin ? "-rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {onToggleAdmin && (
                                <ul className="absolute bg-white shadow-md mt-2 py-2 w-72">
                                    <li><Link to="/agregar-administrador" className="text-black hover:text-white hover:bg-red-light py-2 px-4 block">Agregar nuevo</Link></li>
                                    <li><Link to="/desbloquear-administrador" className="text-black hover:text-white hover:bg-red-light py-2 px-4 block">Desbloquear</Link></li>
                                </ul>
                            )}
                        </li>
                        
                        <li className="mr-6 relative">
                            <button className="flex items-center font-title font-medium text-white hover:scale-105 py-2 px-4 focus:outline-none"
                                onClick={() => {setOnToggleProfile(!onToggleProfile); setOnToggleAdmin(false)}}>
                                Perfil
                                <svg className={`w-5 h-5 ml-2 ${onToggleProfile ? "-rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {onToggleProfile && (
                                <ul className="absolute bg-white shadow-md mt-2 py-2 w-52">
                                    
                                    <li><Link to="/cambio-contraseña-manager" className="text-black hover:text-white hover:bg-red-light py-2 px-5 block">Cambiar contraseña</Link></li>
                                    <li><Link to="/iniciar-sesion" className="text-black hover:text-white hover:bg-red-light py-2 px-4 block">Cerrar sesión</Link></li>

                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;