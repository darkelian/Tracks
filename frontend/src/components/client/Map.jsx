import { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { ApiContext } from '../../context/ApiContext';
import axios from "axios";
import coveredWhiteIcon from '../../assets/Parking Icons/Covered-White.png';
import coveredOrangeIcon from '../../assets/Parking Icons/Covered-Orange.png';
import coveredRedIcon from '../../assets/Parking Icons/Covered-Red.png';
import uncoveredWhiteIcon from '../../assets/Parking Icons/Uncovered-White.png';
import uncoveredOrangeIcon from '../../assets/Parking Icons/Uncovered-Orange.png';
import uncoveredRedIcon from '../../assets/Parking Icons/Uncovered-Red.png';
import semicoveredWhiteIcon from '../../assets/Parking Icons/Semicovered-White.png';
import semicoveredOrangeIcon from '../../assets/Parking Icons/Semicovered-Orange.png';
import semicoveredRedIcon from '../../assets/Parking Icons/Semicovered-Red.png';
import "leaflet/dist/leaflet.css";
import "../../css/map.css";

const Map = ({ placeName, distance, city, parkingType, availability, vehicleType, date, startTime, endTime, actualCity, setActualCity, setActualParking, setOnReservationForm }) => {
    const [parkings, setParkings] = useState([]);
    const [placeCoords, setPlaceCoords] = useState();

    const api = useContext(ApiContext);

    useEffect(() => {
        if(city) {
            const token = sessionStorage.getItem('token').replace(/"/g, '');

            const urlCity = (city == "" ? "Bogota": city);

            api.get(`/city/${urlCity}`, {headers: {Authorization: `Bearer ${token}`}})
            .then(res => {
                const cityObject = {
                    id: res.data.idCity,
                    name: res.data.name,
                    northLim: [res.data.btop, res.data.bleft],
                    southLim: [res.data.bbottom, res.data.bright],
                    centerCoords: [res.data.xcenter, res.data.ycenter]
                }
    
                setActualCity(cityObject);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [city]);

    useEffect(() => {
        setParkings([]);

        if(placeName) {
            axios.get(`https://nominatim.openstreetmap.org/search`, {params: {
                q: placeName,
                countrycode: "co",
                limit: 5, 
                format: "json"
            }})
            .then((res) => {
                const placeArray = res.data.map(place => ({
                    coordinatesX: place.lat,
                    coordinatesY: place.lon
                }));
    
                setPlaceCoords(placeArray)
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [placeName]);

    useEffect(() => {
        if (placeCoords) {
            const token = sessionStorage.getItem('token').replace(/"/g, '');
    
            const coordsObject = placeCoords.reduce((acc, coords, index) => {
                acc[index] = { coordinatesX: coords.coordinatesX, coordinatesY: coords.coordinatesY };
                return acc;
            }, {});
    
            api.post(`/parking/spot`, { coordinates: coordsObject }, { params: { distance: distance }, headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const parkingsLists = res.data.parkingsLists;
                // Convertir el objeto en un array de arrays y luego aplanarlo en un solo array
                const parkingsArray = Object.values(parkingsLists).flat();

                // Si parkingsArray tiene elementos, mapearlos
                if (parkingsArray.length > 0) {
                    const formattedParkingArray = parkingsArray.map(parking => ({
                        id: parking.parkingId.idParking,
                        name: parking.namePark,
                        address: parking.address.descAddress,
                        coords: [parking.address.coordinatesX, parking.address.coordinatesY],
                        type: parking.parkingType.idParkingType,
                        ocupability: parking.ocupability,
                    }));
                    
                    setParkings(formattedParkingArray);
                    
                    let newCenterCoords = actualCity;
                    newCenterCoords.centerCoords = [formattedParkingArray[0].coords[0], formattedParkingArray[0].coords[1]];

                    setActualCity(newCenterCoords);
                } else {
                    setParkings([])
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [placeCoords, distance]);
    

    useEffect(() => {
        if(!placeName) {
            const token = sessionStorage.getItem('token').replace(/"/g, '');
            const params = {};
    
            const urlCity = (city == "" ? "Bogota": city);
            if (parkingType) params.type = parkingType;
            if (availability) params.scheduleType = availability;
            if (vehicleType) params.vehicleType = vehicleType;
            if (date) params.date = date;
            if (startTime) params.startTime = startTime;
            if (endTime) params.endTime = endTime;
            
            api.get(`/parking/city/${urlCity}`, {params: params, headers: { Authorization: `Bearer ${token}` }})
            .then(res => {
                const parkingArray = res.data.map(parking => ({
                    id: parking.parkingId.idParking,
                    name: parking.namePark,
                    address: parking.address.descAddress,
                    coords: [parking.address.coordinatesX, parking.address.coordinatesY],
                    type: parking.parkingType.idParkingType,
                    ocupability: parking.ocupability
                }));
    
                setParkings(parkingArray);
            })
            .catch(err => {
                console.error(err.response || err);
            });
        }
    }, [city, parkingType, availability, vehicleType, date, startTime, endTime]);

    const getIcon = (type, ocupability) => {
        switch (type) {
            case 'COV':
                return new Icon({iconUrl: (ocupability >= 1 ? coveredRedIcon : (ocupability >= 0.7 ? coveredOrangeIcon : coveredWhiteIcon)), iconSize: [45, 45]});
            case 'UNC':
                return new Icon({iconUrl: (ocupability >= 1 ? uncoveredRedIcon : (ocupability >= 0.7 ? uncoveredOrangeIcon : uncoveredWhiteIcon)), iconSize: [45, 45]});
            case 'SEC':
                return new Icon({iconUrl: (ocupability >= 1 ? semicoveredRedIcon : (ocupability >= 0.7 ? semicoveredOrangeIcon : semicoveredWhiteIcon)), iconSize: [45, 45]});
            default:
                return new Icon({iconUrl: (ocupability >= 1 ? coveredRedIcon : (ocupability >= 0.7 ? coveredOrangeIcon : coveredWhiteIcon)), iconSize: [45, 45]});
        }
    };

    const handleChangeParking = (parking) => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        
        api.get(`/parking/coordinates/${parking.coords[0]}/${parking.coords[1]}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            setActualParking([res.data.parking, res.data.capacity]);
            setOnReservationForm(false);

            let newCenterCoords = actualCity;
            newCenterCoords.centerCoords = [parking.coords[0], parking.coords[1]];

            setActualCity(newCenterCoords);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const UpdateMap = ({ city, center, bounds }) => {
        const map = useMap();
    
        useEffect(() => {
            map.setView(center, 15); 
            map.setMaxBounds([bounds[0], bounds[1]]);
        }, [city]);
    
        return null;
    }

    return (
        <MapContainer minZoom={12} maxBounds={[actualCity.northLim, actualCity.southLim]} className='rounded-2xl shadow-lg'>
            <TileLayer 
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            <UpdateMap city={city} center={actualCity.centerCoords} bounds={[actualCity.northLim, actualCity.southLim]} />


            {parkings.map(parking => (
                <Marker key={parking.id} position={parking.coords} icon={getIcon(parking.type, parking.ocupability)} eventHandlers={{click: () => handleChangeParking(parking)}}> 
                    <Popup> 
                        <div className='flex flex-col font-title'>
                            <span className='font-semibold mb-1'> {parking.name} </span> 
                            <span className='text-xs'> {parking.address} </span>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;
