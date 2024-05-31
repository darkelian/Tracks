import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../../context/ApiContext.jsx';
//import showCountdown from '../../javascript/temporizador';

function ReservationInfo({reservation}) {
    const api = useContext(ApiContext);

    /*const [timeRemaining, setTimeRemaining] = useState("");

    useEffect(() => {
        const startTempTime = "2:00";
        const endTempTime = "20:00";
    
        
        showCountdown(startTime, endTime, setTimeRemaining);
    
        
        return () => clearInterval();
      }, []);*/

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        if (!isNaN(date)) {
            return date.toISOString().substr(0, 10);
        }

        return "Fecha inválida";
    }

    const createButton = () => {
        if(reservation.status == "PEN") {
            return (<button className="px-16 py-2 rounded-lg bg-red-dark hover:bg-red-darkest shadow-md font-title font-semibold text-white"
            onClick={cancelReservation}> Cancelar reserva </button>);
        } else if(reservation.status == "CON") {
            return (<button className="px-16 py-2 rounded-lg bg-blue-dark hover:bg-blue-darkest shadow-md font-title font-semibold text-white"
            onClick={checkIn}> Hacer check in </button>);
        } else if(reservation.status == "CUR") {
            return (<button className="px-16 py-2 rounded-lg bg-blue-dark hover:bg-blue-darkest shadow-md font-title font-semibold text-white"
            onClick={checkOut}> Hacer check out </button>);
        }
    }

    const cancelReservation = () => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        api.put(`/reservation/${reservation.idReservation}/cancel`, {headers: { Authorization: `Bearer ${token}` } })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          })
    }

    const checkIn = () => {
        
    }
    
    const checkOut = () => {

    }

    return(
        <article className="flex flex-col items-center w-96 mt-12 mr-20 px-6 py-5 rounded-md shadow-md bg-blue-light">
            <section className="flex justify-between w-full h-16 mb-5">
                <div>
                    <div className="w-auto font-semibold text-lg"> {reservation.parkingSpace.parkingSpaceId.parking.namePark} </div>
                    <div className="mb-2 text-title font-semibold"> {reservation.parkingSpace.parkingSpaceId.parking.parkingId.city.name} </div> 
                </div>                  
            </section> 

            <section className="w-full mb-5">
                <section className="mb-5">
                    <h2 className="text-title text-md"> <span className="font-semibold"> ID de la reserva: </span> {reservation.idReservation} </h2>
                    <h2 className="text-title text-md"> <span className="font-semibold"> Día inicio de la reserva: </span> {formatDate(reservation.startDateRes)} </h2>
                    <h2 className="text-title text-md"> <span className="font-semibold"> Día fin de la reserva: </span> {formatDate(reservation.endDateRes)} </h2>
                    <h2 className="text-title text-md"> <span className="font-semibold"> Hora ingreso: </span> {reservation.startTimeRes} </h2>
                    <h2 className="text-title text-md"> <span className="font-semibold"> Hora salida: </span> {reservation.endTimeRes} </h2>
                </section>

                <section className="mb-5">
                    <h2 className="text-title text-md"> <span className="font-semibold"> Tipo de Vehículo: </span> Carro </h2>
                    <h2 className="mb-5 text-title text-md"> <span className="font-semibold"> Matrícula: </span> {reservation.licensePlate}</h2>
                </section>
                    
                <section className="mb-5">
                    <h2 className="text-title text-md"> <span className="font-semibold"> Check-in: </span> __________ </h2>
                    <h2 className="text-title text-md"> <span className="font-semibold"> Check-out: </span> __________ </h2>
                </section>
            </section>   
            
            {createButton()}
        </article>    
    )
}

export default ReservationInfo