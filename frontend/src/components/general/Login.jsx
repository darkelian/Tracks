import { useRef, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import { ApiContext } from '../../context/ApiContext';
import Swal from 'sweetalert2'
import { decodeJWT } from "../../javascript/decodeJWT"
import logo from '../../assets/Logo.png'
import '../../css/login.css'

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [captchaState, setCaptchaState] = useState(false);
    
    const api = useContext(ApiContext);
    const navigate = useNavigate();
    const captcha = useRef(null);
    let intentos = 0;

    const handleLogin = (e) => {
        e.preventDefault();

        if (!user || !password) {
            Swal.fire({
                icon: 'info',
                title: `Por favor llene todos los campos`
            });
        } else {
            if (captchaState) {
                api.post(`/auth/login`, { username: user, password: password })
                    .then(res => {
                        const tokenDecoded = decodeJWT(res.data.token);

                        const userLogged = {
                            "idNumber": tokenDecoded.userId.idUser,
                            "idType": tokenDecoded.userId.idDocType,
                            "role": tokenDecoded.role
                        }

                        sessionStorage.setItem("userLogged", JSON.stringify(userLogged));
                        sessionStorage.setItem("token", JSON.stringify(res.data.token));
                        intentos = 0
                        Swal.fire({
                            icon: 'success',
                            title: `Bienvenid@ ${user}`
                        });

                        if(tokenDecoded.role == "CLIENT") {
                            navigate("/cliente-inicio", {
                                replace: ("/inicio-sesion", true)
                            });
                        } else if(tokenDecoded.role == "ADMIN") {
                            navigate("/admin-inicio", {
                                replace: ("/inicio-sesion", true)
                            });
                        } else if(tokenDecoded.role == "MANAGER") {
                            navigate("/manager-inicio", {
                                replace: ("/inicio-sesion", true)
                            });
                        }
                    })
                    .catch(err => {
                        intentos=intentos+1;

                        if (intentos>2) {
                            Swal.fire({
                                icon: 'error',
                                title: `Usuario bloqueado por límite de intentos`,
                            });
                        }else{
                        Swal.fire({
                            icon: 'error',
                            title: `Hubo un error al iniciar sesión`,
                        });}

                        console.log(err);
                    })
            } else {
                Swal.fire({
                    icon: 'info',
                    title: `Por favor complete el reCAPTCHA para continuar`
                });
            }
        }
    }

    const validateCaptcha = () => {
        if (captcha.current.getValue()) {
            setCaptchaState(true)
        }
    }

    return (
        <article id="loginCard" className="pt-6 md:pt-10 2xl:pt-6 rounded-2xl shadow-xl bg-gradient-to-b from-red-light from-75% to-red-dark">
            <section className="flex flex-col items-center px-6 md:px-10 xl:px-8">
                <img src={logo} alt="Logo de Four Parks" className="w-24 h-24" />

                <section className="flex flex-col justify-between items-center w-full h-56 mt-6 md:mt-10 2xl:mt-8">
                    <input type="text" id="user" value={user} className="w-full p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark"
                        placeholder="Usuario" onChange={(e) => setUser(e.target.value)} required></input>

                    <input type="password" id="password" value={password} className="w-full p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark"
                        placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required></input>

                    <ReCAPTCHA ref={captcha} sitekey="6LfEr8QpAAAAAHkHnuDZebwy-ZRwIYKLoVA5MmyR" onChange={validateCaptcha} />
                </section>

                <button className="mt-8 2xl:mt-6  md:px-20 px-16 py-3 bg-blue-dark hover:bg-blue-darkest rounded-xl text-white font-title font-semibold text-xl"
                    onClick={handleLogin}>Iniciar sesión</button>
            </section>

            <hr className="h-0.5 mt-8 2xl:mt-6  rounded-full bg-white"></hr>

            <div className="flex justify-center mt-4 font-paragraph text-sm text-white"> ¿Olvidó su contraseña?
                <a href="/recuperacion-contraseña" className="ml-1 font-semibold text-white hover:text-blue-darkest"> Recuperar </a>
            </div>

            <div className="flex justify-center mt-2 font-paragraph text-sm text-white"> ¿Aún no tiene una cuenta?
                <a href="/registro" className="ml-1 font-semibold text-white hover:text-blue-darkest"> Regístrate </a>
            </div>
        </article>
    )
}