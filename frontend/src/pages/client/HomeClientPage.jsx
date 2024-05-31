import { useState, useEffect } from "react";
import Header from '../../components/client/Header.jsx'
import Map from '../../components/client/Map.jsx'
import ParkingFilters from '../../components/client/ParkingFilters.jsx'
import ParkingInfo from '../../components/client/ParkingInfo.jsx'
import ReservationCard from '../../components/client/ReservationCard.jsx'

const Home = ({initialCoords}) => {
  const [placeName, setPlaceName] = useState("");
  const [distance, setDistance] = useState(0.0127);
  const [city, setCity] = useState("");
  const [parkingType, setParkingType] = useState("");
  const [availability, setAvailability] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [onReservationForm, setOnReservationForm] = useState(false);
  const [actualCity, setActualCity] = useState({
    northLim: [4.7694, -74.2034],
    southLim: [4.4861, -74.0232],
    centerCoords: [4.6596, -74.0915]
  });
  const [actualParking, setActualParking] = useState();

  useEffect(() => {
    if(initialCoords.length > 0) {
      setActualCity({
        northLim: [4.7694, -74.2034],
        southLim: [4.4861, -74.0232],
        centerCoords: initialCoords
      });
    }
  }, [initialCoords]);

  useEffect(() => {
    setActualParking();
    setOnReservationForm(false);
  }, [city])
  
  
  return (
    <>
        <Header />
        <div className='flex h-screen px-12 py-40 bg-gray-light'> 
          <section className='w-2/5'>
            <ParkingFilters placeName={placeName} setPlaceName={setPlaceName} distance={distance} setDistance={setDistance} city={city} setCity={setCity} parkingType={parkingType} 
            setParkingType={setParkingType} availability={availability} setAvailability={setAvailability} vehicleType={vehicleType} setVehicleType={setVehicleType} date={date} 
            setDate={setDate} startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />

            {
              (actualParking !== undefined ? (onReservationForm == true ? <ReservationCard setOnReservationForm={setOnReservationForm} actualCity={actualCity} 
              actualParking={actualParking}/> : <ParkingInfo parkingType={parkingType} vehicleType={vehicleType} setOnReservationForm={setOnReservationForm} 
              actualParking={actualParking} />) : false)
            }
          </section>

          <div className="w-1/2 ml-44 rounded-2xl z-0"> 
            <Map placeName={placeName} distance={distance} city={city} parkingType={parkingType} availability={availability} vehicleType={vehicleType} date={date} 
            startTime={startTime} endTime={endTime} actualCity={actualCity} setActualCity={setActualCity} setActualParking={setActualParking} 
            setOnReservationForm={setOnReservationForm} />
          </div>
        </div>
    </>
  )
}

export default Home;
