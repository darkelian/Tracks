import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from '../../context/ApiContext';
import Swal from 'sweetalert2'
import { useEffect } from "react";


export default function SignUp() {

    const [idType, setIdType] = useState("");
    const [idUser, setIdUser] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [blockedUsers, setBlockedUsers] = useState([]);

    const api = useContext(ApiContext);
    const navigate = useNavigate();


    const handleSignUp = (username, idUser) => {

        console.log(username)
        console.log(idUser)
        const token = sessionStorage.getItem('token').replace(/"/g, '');

        api.post(`/auth/unlock`, {
            username: username, idUser: idUser

            , headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: `Usuario desbloqueado`
                });
                navigate("/manager-inicio", {
                    replace: ("/bloquear", true)
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: `Error al desbloquear usuario`
                });
            })






    }

    useEffect(() => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        api.get(`/auth/get-auth-users`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res)
                const blockedUsers = res.data.filter(user => user.isBlocked === 1);
                console.log(blockedUsers)
                setBlockedUsers(blockedUsers);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: `Error al traer usuarios bloqueados`
                });
            })
    }, [])


    return (



        <article className="h-screen w-screen">



            <section>
                <section>
                    <div className="flex justify-between mx-10" >
                        <div className="flex justify-center mt-2 w-2/6 font-title font-semibold text-xl">
                            Tipo de documento
                        </div>
                        <div className="flex justify-center mt-2 w-2/6 font-title font-semibold text-xl">
                            ID
                        </div>
                        <div className="flex justify-center mt-2 w-2/6 font-title font-semibold text-xl">
                            Nombre de usuario
                        </div>
                        <div className="flex justify-center mt-2 w-2/6 font-title font-semibold text-xl">
                            Rol
                        </div>
                        <div className="w-2/6 mt-2">

                        </div>
                    </div>
                </section>
                <div className="h-1 w-full bg-gray-400 mt-1"></div>
            </section>
            {
                blockedUsers.length > 0 ? (
                    blockedUsers.map((user, index) => (
                        <section>
                            <section>
                                <div key={index} className="flex justify-between mx-10 mt-1" >
                                    <div className="flex justify-center mt-2 w-2/6 font-title text-xl">
                                        {user.userId.idDocType}
                                    </div>
                                    <div className="flex justify-center mt-2 w-2/6 font-title text-xl">
                                        {user.userId.idUser}
                                    </div>
                                    <div className="flex justify-center mt-2 w-2/6 font-title text-xl">
                                        {user.username}
                                    </div>
                                    <div className="flex justify-center mt-2 w-2/6 font-title text-xl">
                                        {user.role}
                                    </div>
                                    <div className="w-2/6">
                                        <button className="2xl px-20 py-2 bg-blue-dark hover:bg-blue-darkest rounded-xl text-white font-title font-semibold text-xl" onClick={() => handleSignUp(user.username, user.userId.idUser)}>Desbloquear</button>
                                    </div>
                                </div>
                            </section>
                            <div className="h-1 w-full bg-gray-400 mt-1"></div>
                        </section>
                    ))
                ) : (
                    <div>
                        
                    </div>
                )
            }

        </article>





    )
}