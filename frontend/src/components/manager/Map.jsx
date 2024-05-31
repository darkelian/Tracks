import { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon} from 'leaflet';
import { ApiContext } from '../../context/ApiContext';
import coveredWhiteIcon from '../../assets/Parking Icons/Covered-White.png';
import uncoveredWhiteIcon from '../../assets/Parking Icons/Uncovered-White.png';
import semicoveredWhiteIcon from '../../assets/Parking Icons/Semicovered-White.png';
import "leaflet/dist/leaflet.css";
import "../../css/map.css";

const Map = ({ city, actualCity, setActualCity, setActualParking }) => {
    const [parkings, setParkings] = useState([]);
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
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        const urlCity = (city == "" ? "Bogota": city);
        
        api.get(`/parking/city/${urlCity}`, {headers: { Authorization: `Bearer ${token}` }})
        .then(res => {
            const parkingArray = res.data.map(parking => ({
                id: parking.parkingId.idParking,
                name: parking.namePark,
                address: parking.address.descAddress,
                coords: [parking.address.coordinatesX, parking.address.coordinatesY],
                type: parking.parkingType.idParkingType,
            }));

            setParkings(parkingArray);
        })
        .catch(err => {
            console.error(err.response || err);
        });
    }, [city]);

    const getIcon = (type) => {
        switch (type) {
            case 'COV':
                return new Icon({iconUrl: coveredWhiteIcon, iconSize: [45, 45]});
            case 'UNC':
                return new Icon({iconUrl: uncoveredWhiteIcon, iconSize: [45, 45]});
            case 'SEC':
                return new Icon({iconUrl: semicoveredWhiteIcon, iconSize: [45, 45]});
            default:
                return new Icon({iconUrl: coveredWhiteIcon, iconSize: [45, 45]});
        }
    };

    const handleChangeParking = (parking) => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        
        api.get(`/parking/coordinates/${parking.coords[0]}/${parking.coords[1]}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            setActualParking([res.data.parking, res.data.capacity, res.data.scoreResponse]);

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

            {parkings.length > 0 ? (
                parkings.map(parking => (
                    <Marker key={parking.id} position={parking.coords} icon={getIcon(parking.type)} eventHandlers={{click: () => handleChangeParking(parking)}}>
                        <Popup> 
                            <div className='flex flex-col font-title'>
                                <span className='font-semibold mb-1'> {parking.name} </span> 
                                <span className='text-xs'> {parking.address} </span>
                            </div>
                        </Popup>
                    </Marker>
                ))
            ) : null }
        </MapContainer>
    );
}

export default Map;
