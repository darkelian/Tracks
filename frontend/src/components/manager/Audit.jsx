import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from '../../context/ApiContext';
import Swal from 'sweetalert2'
import { useEffect } from "react";


export default function SignUp() {

    const [sexy, setSexy] = useState("");
    const api = useContext(ApiContext);
    const navigate = useNavigate();


    useEffect(() => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        api.get(`/userActions/allActions`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res.data)
                const sexy = res.data;
                console.log(sexy)
                setSexy(sexy);
                //console.log(sexy)

            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: `Error al traer usuarios`
                });
            })
    }, [])


    return (



        <article className="h-screen w-screen">

            <section>
                <section>
                    <div className="flex justify-between mx-10" >
                        <div className="flex justify-center mt-2 w-2/6 font-title font-semibold text-xl">
                            Nombre
                        </div>
                        <div className="flex justify-center mt-2 w-2/6 font-title font-semibold text-xl">
                            Apellido
                        </div>
                        <div className="flex justify-center mt-2 w-2/6 font-title font-semibold text-xl">
                            Fecha de acción
                        </div>
                        <div className="flex justify-center mt-2 w-2/6 font-title font-semibold text-xl">
                            Acción
                        </div>
                        <div className="flex justify-center mt-2 w-2/6 font-title font-semibold text-xl">
                            Dirección IP
                        </div>
                       
                    </div>
                </section>
                <div className="h-1 w-full bg-gray-400 mt-1"></div>
            </section>

            {
                sexy.length > 0 ? (
                    sexy.map((user, index) => (
                        <section>
                            <section>
                                <div key={index} className="flex justify-between mx-10" >
                                    <div className="flex justify-center mt-2 w-2/6 font-title text-xl">
                                        {user.userActionId.firstName}
                                    </div>
                                    <div className="flex justify-center mt-2 w-2/6 font-title text-xl">
                                        {user.userActionId.lastName}
                                    </div>
                                    <div className="flex justify-center mt-2 w-2/6 font-title text-xl">
                                        {user.dateAction}
                                    </div>
                                    <div className="flex justify-center mt-2 w-2/6 font-title text-xl">
                                        {user.descAction}
                                    </div>
                                    <div className="flex justify-center mt-2 w-2/6 font-title text-xl">
                                        {user.ipUser}
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