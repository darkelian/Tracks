import { useState, useEffect, useContext } from 'react';
import Header from '../../components/client/Header.jsx'
import ReservationInfo from '../../components/client/ReservationInfo.jsx';
import { ApiContext } from '../../context/ApiContext.jsx';

const ReservationPage = () => {
  const [resState, setResState] = useState('PEN');
  const [reservations, setReservations] = useState([]);

  const api = useContext(ApiContext);
  const user = JSON.parse(sessionStorage.getItem('userLogged'));
  const idNumber = user.idNumber;
  const idType = user.idType;
  
  useEffect(() => {
    const token = sessionStorage.getItem('token').replace(/"/g, '');
    api.get(`/reservation/client/${idType}/${idNumber}`, {params: {status: resState}, headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const reservationArray = []; 
        res.data.map(reservation => {reservationArray.push(reservation)})

        setReservations(reservationArray);
      })
      .catch(err => {
        console.log(err);
      })
  },[resState]);

  return (
    <>
      <Header />

    <section className='w-full h-24 px-12'>
      <section className="flex justify-between py-40">
        <div className='flex flex-col w-1/6'>
          <label className='text-sm font-title font-semibold mb-2'>Estado de la reserva</label>
          <select id="parking-type" value={resState} className="p-4 rounded-md bg-white shadow-md font-paragraph" onChange={(e) => setResState(e.target.value)}>
            <option value="PEN"> Pendiente </option>
            <option value="CON"> Confirmada </option>
            <option value="CAN"> Cancelada </option>
            <option value="CUR"> En curso </option>
            <option value="COM"> Completada </option>
            <option value="NPR"> No presentado </option>
          </select>
        </div>
      </section>
      </section>

      <div className='flex flex-wrap px-12 pt-32 pb-10 bg-gray-light'>
        {
          reservations.map(reservation => (
            <ReservationInfo key={reservation.idReservation} reservation={reservation}/>
          ))
        }
      </div>
    </>
  )
}

export default ReservationPage;
