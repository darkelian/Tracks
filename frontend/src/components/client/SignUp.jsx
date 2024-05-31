import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from '../../context/ApiContext';
import Swal from 'sweetalert2'
import logo from '../../assets/Logo.png'

export default function SignUp() {
    const [idType, setIdType] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [payMethod, setPayMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [masterCardNumbers, setMasterCardNumbers] = useState([5555555555554444, 2223003122003222, 5200828282828210, 5105105105105100])
    const [visaNumbers, setVisaNumbers] = useState([4242424242424242, 4000056655665556])

    const api = useContext(ApiContext);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        let arr = expirationDate.split('-');
        let year = arr[0].substr(arr[0].length - 2)
        let month = arr[1]

        if (!idType || !idNumber || !name || !lastName || !phone || !username || !email ||!cardNumber ||!cvv ||!payMethod ||!expirationDate) {
            Swal.fire({
                icon: 'info',
                title: `Por favor llene todos los campos`
            });
        } else {
            api.post(`/auth/register`, {
                idUser: idNumber,
                idDocTypeFk: idType,
                username: username,
                role: 'CLIENT',
                firstName: name,
                lastName: lastName,
                email: email,
                phone: phone,
                serialCard: cardNumber,
                ExpiryMonthCard: month,
                ExpiryYearCard: year,
                cvc: cvv
            })
            .then(res => {
                console.log(res);

                Swal.fire({
                        icon: 'success',
                        title: `Registro exitoso`,
                        text: 'Se le ha enviado un correo con su contraseña temporal'
                    });

                    navigate("/inicio-sesion");
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: `Hubo un error al registrar el usuario`,
                    });

                    console.log(err);
                })
        }
    }



    return (
        <article className="bg-gradient-to-b from-red-light from-75% to-red-dark pt-6 pb-6 relative rounded-2xl shadow-xl">
            <section className="flex flex-col items-center px-12">
                <img src={logo} alt="Logo de Four Parks" className="w-24 h-24" />

                <section className="flex flex-col justify-evenly items-center w-full h-72 mt-4">
                    <div className="flex justify-between w-full">
                        <select id="idType" className="w-2/5 p-3 rounded-md bg-white font-paragraph" value={idType} onChange={(e) => setIdType(e.target.value)}>
                            <option value="" disabled hidden> Tipo de documento </option>
                            <option value="CC">CC</option>
                            <option value="TI">TI</option>
                            <option value="CI">CE</option>
                        </select>

                        <input id="idNumber" className="w-2/5 p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark" placeholder="Numero de identificación"
                            value={idNumber} onChange={(e) => setIdNumber(e.target.value)}></input>
                    </div>

                    <div className="flex justify-between w-full">
                        <input id="name" className="w-2/5 p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark" placeholder="Nombre"
                            value={name} onChange={(e) => setName(e.target.value)}></input>

                        <input id="lastName" className="w-2/5 p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark" placeholder="Apellido"
                            value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    </div>

                    <div className="flex justify-between w-full">
                        <input id="phone" className="w-2/5 p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark" placeholder="Teléfono"
                            value={phone} onChange={(e) => setPhone(e.target.value)}></input>

                        <input id="username" className="w-2/5 p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark" placeholder="Nombre de usuario"
                            value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    </div>

                    <div className="w-full">
                        <input id="email" className="w-full p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark" placeholder="Correo electrónico"
                            value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                </section>

                <section className="w-full">
                    <div id="payMethods" className="flex justify-between w-full px-8 py-4 rounded-md bg-white font-paragraph">
                        <fieldset className="flex justify-between w-full" onChange={(e) => setPayMethod(e.target.value)}>
                            <div className="flex items-center">
                                <input type="radio" id="mastercard" name="methods" value="mastercard" className="mr-4" />
                                <label for="mastercard"> Mastercard </label>
                            </div>

                            <div className="flex items-center">
                                <input type="radio" id="visa" name="methods" value="visa" className="mr-4" />
                                <label for="visa"> Visa </label>
                            </div>
                        </fieldset>
                    </div>

                    <div className="w-full mt-5">
                        {payMethod?(payMethod == "mastercard" ? (
                            <select id="idType" className="w-full p-3 rounded-md bg-white font-paragraph" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}>
                                 <option value=""> </option>

                                {masterCardNumbers.map(card => (
                                    <option value={card}>{card}</option>
                                ))}
                            </select>
                        ) : (<select id="idType" className="w-full p-3 rounded-md bg-white font-paragraph" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}>
                            <option value=""> </option>
                            {visaNumbers.map(card => (
                                <option value={card}>{card}</option>
                            ))}
                        </select>)):(
                            <select id="idType" className="w-full p-3 rounded-md bg-white font-paragraph" >
                        </select>
                        )}


                    </div>

                    <div className="flex justify-between w-full mt-5">
                        <input type="month" id="expirationDate" value={expirationDate} className="p-4 rounded-md bg-white shadow-md font-paragraph"
                            onChange={(e) => setExpirationDate(e.target.value)}></input>

                        <input id="cvv" className="w-2/5 p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark" placeholder="cvv"
                            value={cvv} onChange={(e) => setCvv(e.target.value)}></input>
                    </div>
                </section>

                <button className="mt-8 px-20 py-3 bg-blue-dark hover:bg-blue-darkest rounded-xl text-white font-title font-semibold text-xl" onClick={handleSignUp}>
                    Crear cuenta </button>
            </section>

            <hr className="h-0.5 mt-8 rounded-full bg-white"></hr>

            <div className="flex justify-center mt-2 font-paragraph text-sm text-white"> ¿Ya tiene una cuenta?
                <a href="/inicio-sesion" className="ml-1 font-semibold text-white hover:text-blue-darkest"> Inicia sesión </a>
            </div>
        </article>
    )
}