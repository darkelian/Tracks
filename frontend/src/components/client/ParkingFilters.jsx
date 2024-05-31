import { useEffect, useState, useContext } from "react";
import { ApiContext } from '../../context/ApiContext';

const ParkingFilters = ({placeName, setPlaceName, distance, setDistance, city, setCity, parkingType, setParkingType, availability, setAvailability, vehicleType, setVehicleType, 
date, setDate, startTime, setStartTime, endTime, setEndTime}) => {
  const [cities, setCities] = useState([]);

  const api = useContext(ApiContext);

  useEffect(() => {
    const token = sessionStorage.getItem('token').replace(/"/g, '');

    api.get(`/city/list`,  {headers: {Authorization: `Bearer ${token}`}})
    .then(res=>{
      const cityArray = res.data.map(city => (city))
      setCities(cityArray);
    })
    .catch(err=>{
      console.log(err);
    }) 
  },[]); 

  const handleTimeChange = (setter) => (event) => {
    const time = new Date(event.target.valueAsNumber);
    if (time) {
      time.setMinutes(0);
      time.setSeconds(0);
      setter(time.toISOString().substr(11, 8));
    }
  };

  return (
    <section className="flex flex-col justify-between w-full h-96">
      <style>
        {`
          input[type="time"]::-webkit-datetime-edit-minute,
          input[type="time"]::-webkit-datetime-edit-second,
          input[type="time"]::-webkit-datetime-edit-millisecond,
          input[type="time"]::-webkit-inner-spin-button,
          input[type="time"]::-webkit-clear-button {
            display: none;
          }
        `}
      </style>

      <section className="flex justify-between mb-4">
        <div className="flex flex-col w-1/2 mr-12">
          <label className='text-sm font-title font-semibold mb-2'>Parqueaderos cercanos a</label>
          <input type="text" id="parking-placeName" className="p-4 rounded-md bg-white shadow-md font-paragraph" placeholder="San Juan de Dios, Bogotá" 
          value={placeName} onChange={(e) => setPlaceName(e.target.value)}/>
        </div>

        <div className="flex flex-col w-1/2">
          <label className='text-sm font-title font-semibold mb-2'>Distancia máx (m)</label>
          <input type="range" id="parking-distance" min={0.0127} max={0.0423} step={0.0001} className="py-2 rounded-md bg-white" value={distance} 
          onChange={(e) => setDistance(parseFloat(e.target.value))}/>
          <div className="flex justify-between">
            <h2 className="text-xs font-paragraph"> 300 </h2>
            <h2 className="text-xs font-paragraph"> 1000 </h2>
          </div>
        </div>
      </section>

      <section className="flex justify-between mb-4">
        <div className="flex flex-col w-1/2 mr-12">
          <label className='text-sm font-title font-semibold mb-2'>Ciudad</label>
          <select id="parking-city" value={city} className="p-4 rounded-md bg-white shadow-md font-paragraph" onChange={(e) => setCity(e.target.value)}>
            <option value=""></option>
            {cities.map((city, index) => (
              <option key={index} value={city}> {city} </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col w-1/2">
          <label className='text-sm font-title font-semibold mb-2'>Tipo de parqueadero </label>
          <select id="parking-type" value={parkingType} className="p-4 rounded-md bg-white shadow-md font-paragraph" onChange={(e) => setParkingType(e.target.value)}>
            <option value="COV"> Cubierto </option>
            <option value="SEC"> Semi-cubierto </option>
            <option value="UNC"> Descubierto </option>
          </select>
        </div>
      </section>
      
      <section className="flex justify-between mb-4">
        <div className="flex flex-col w-1/2 mr-12">
          <label className='text-sm font-title font-semibold mb-2'>Disponibilidad</label>
          <select id="parking-availability" value={availability} className="p-4 rounded-md bg-white shadow-md font-paragraph" 
          onChange={(e) => setAvailability(e.target.value)}>
            <option value="Dias de semana"> Días de semana </option>
            <option value="Fines de semana"> Fines de semana </option>
            <option value="Todos los dias"> Todos los días </option>
          </select>
        </div>
        
        <div  className="flex flex-col w-1/2">
          <label className='text-sm font-title font-semibold mb-2'>Tipo de vehículo</label>
          <select id="parking-vehicleType" value={vehicleType} className="p-4 rounded-md bg-white shadow-md font-paragraph" onChange={(e) => setVehicleType(e.target.value)}>
            <option value="CAR"> Automóvil </option>
            <option value="MOT"> Motocicleta </option>
            <option value="BIC"> Bicicleta </option>
          </select>
        </div>
      </section>
      
      <section className="flex justify-between w-3/4 mb-4">
        <div className="flex flex-col mr-12">
          <label className='text-sm font-title font-semibold mb-2'>Fecha</label>
          <input type="date" id="date" value={date} className="p-4 rounded-md bg-white shadow-md  font-paragraph" onChange={(e) => setDate(e.target.value)}></input>
        </div>
        
        
        <section className="flex justify-between items-center">
          <div className="flex flex-col mr-12">
            <label className='text-sm font-title font-semibold mb-2'>Hora inicio</label>
            <input type="time" id="parking-startTime" value={startTime} className="p-4 rounded-md bg-white shadow-md font-paragraph" 
            onChange={handleTimeChange(setStartTime)}/>
          </div>

          <span className="w-5 h-0.5 mr-12 rounded-full bg-black"></span>
          
          <div className="flex flex-col">
            <label className='text-sm font-title font-semibold mb-2 mr-12'>Hora fin</label>
            <input type="time" id="parking-endTime" value={endTime} className="p-4 rounded-md bg-white shadow-md font-paragraph" 
            onChange={handleTimeChange(setEndTime)}/>
          </div>
        </section>
      </section>
    </section>
  );
}

export default ParkingFilters;