import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import coveredWhiteIcon from '../../assets/Parking Icons/Covered-White.png';
import uncoveredWhiteIcon from '../../assets/Parking Icons/Uncovered-White.png';
import semicoveredWhiteIcon from '../../assets/Parking Icons/Semicovered-White.png';
import "leaflet/dist/leaflet.css";
import "../../css/map.css";

const Map = ({ actualCity, actualParking }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'COV':
                return new Icon({iconUrl: coveredWhiteIcon, iconSize: [50, 50]});
            case 'UNC':
                return new Icon({iconUrl: uncoveredWhiteIcon, iconSize: [50, 50]});
            case 'SEC':
                return new Icon({iconUrl: semicoveredWhiteIcon, iconSize: [50, 50]});
            default:
                return new Icon({iconUrl: coveredWhiteIcon, iconSize: [50, 50]});
        }
    };
    
    const UpdateMap = ({ center, bounds }) => {
        const map = useMap();
    
        useEffect(() => {
            map.setView(center, 15); 
            map.setMaxBounds([bounds[0], bounds[1]]);
        }, []);
    
        return null;
    }

    return (
        actualCity !== undefined ? (
            <MapContainer minZoom={12} maxBounds={[actualCity.northLim, actualCity.southLim]} className='rounded-2xl shadow-lg'>
                <TileLayer 
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <UpdateMap center={actualCity.centerCoords} bounds={[actualCity.northLim, actualCity.southLim]} />

                {actualParking !== undefined ? (
                    <Marker key={actualParking[0].idParking} position={[actualParking[0].address.coordinatesX, actualParking[0].address.coordinatesY]} 
                    icon={getIcon(actualParking[0].parkingType.idParkingType, actualParking[0].ocupability)}> 
                        <Popup> 
                            <div className='flex flex-col font-title'>
                                <span className='font-semibold mb-1'> {actualParking[0].namePark} </span> 
                                <span className='text-xs'> {actualParking[0].address.descAddress} </span>
                            </div>
                        </Popup>
                    </Marker>
                ) : null}
            </MapContainer>
        ) : null
    );
}

export default Map;
