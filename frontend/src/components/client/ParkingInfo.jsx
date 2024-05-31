import coveredIcon from '../../assets/Parking Icons/Covered-Transparent.png';
import uncoveredIcon from '../../assets/Parking Icons/Uncovered-Transparent.png';
import semicoveredIcon from '../../assets/Parking Icons/Semicovered-Transparent.png';

const ParkingInfo = ({setOnReservationForm, actualParking}) => {
    const getIcon = () => {
        switch (actualParking[0].parkingType.idParkingType) {
            case 'COV':
                return coveredIcon;
            case 'UNC':
                return uncoveredIcon;
            case 'SEC':
                return semicoveredIcon;
            default:
                return coveredIcon;
        }
    };

    return (
        <section className="flex flex-col items-center w-full mt-12 pl-12">
            <article className="w-3/5 rounded-md shadow-md bg-blue-light">
                <section className="flex items-center m-5">
                    <div className="w-1/4 flex justify-center rounded-md border-2 border-black">
                        <img src={getIcon()} alt="Imagen que identifica el tipo de parqueadero"/>
                    </div>

                    <section className="flex flex-col justify-evenly items-center w-4/5 h-16 ml-4">
                        <h1 className="-mt-2 mb-2 text-center text-title font-semibold text-lg"> {actualParking[0].namePark}</h1>
                        <span className="w-11/12 h-0.5 rounded-full bg-black"></span>
                    </section>
                </section>

                <section className="ml-5 mb-5">
                    <h2 className="mb-5 text-title text-md"> <span className="font-semibold"> Ciudad: </span> {actualParking[0].parkingId.city.name} </h2>

                    <section className="mb-5">
                        <h2 className="text-title text-md"> <span className="font-semibold"> Disponibilidad: </span> {actualParking[0].schedule.scheduleType}  </h2>
                        <h2 className="text-title text-md"> <span className="font-semibold"> Horario: </span> 
                        {actualParking[0].startTime} - {actualParking[0].endTime} </h2>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-title text-md"> <span className="font-semibold"> Teléfono: </span> {actualParking[0].phone} </h2>
                        <h2 className="text-title text-md"> <span className="font-semibold"> Correo electrónico: </span> {actualParking[0].email} </h2>
                    </section> 
                    
                    <section className="mb-5">
                        {actualParking[1].CAR !== undefined ? (
                            actualParking[1].CAR.covered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Cupos automóvil cubierto: </span> {actualParking[1].CAR.covered} </h2> 
                            ): null
                        ) : null}

                        {actualParking[1].CAR !== undefined ? (
                            actualParking[1].CAR.uncovered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Cupos automóvil descubierto: </span> {actualParking[1].CAR.uncovered} </h2> 
                            ): null
                        ) : null}
                        
                        {actualParking[1].MOT !== undefined ? (
                            actualParking[1].MOT.covered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Cupos motocicleta cubierto: </span> {actualParking[1].MOT.covered} </h2> 
                            ): null
                        ) : null}
                        
                        {actualParking[1].MOT !== undefined ? (
                            actualParking[1].MOT.uncovered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Cupos motocicleta descubierto: </span> {actualParking[1].MOT.uncovered} </h2> 
                            ): null
                        ) : null}
                        
                        {actualParking[1].BIC !== undefined ? (
                            actualParking[1].BIC.covered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Cupos bicicleta cubierto: </span> {actualParking[1].BIC.covered} </h2> 
                            ): null
                        ) : null}  

                        {actualParking[1].BIC !== undefined ? (
                            actualParking[1].BIC.uncovered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Cupos bicicleta descubierto: </span> {actualParking[1].BIC.uncovered} </h2> 
                            ): null
                        ) : null}
                    </section> 
                    
                    <section className="mb-5">
                        {actualParking[1].CAR !== undefined ? (
                            actualParking[1].CAR.covered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Tarifa automóvil cubierto: </span> ${actualParking[1].CAR['rate-covered']} /hora 
                                </h2> 
                            ): null
                        ) : null}

                        {actualParking[1].CAR !== undefined ? (
                            actualParking[1].CAR.uncovered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Tarifa automóvil descubierto: </span> ${actualParking[1].CAR['rate-uncovered']} /
                                hora </h2> 
                            ): null
                        ) : null}
                        
                        {actualParking[1].MOT !== undefined ? (
                            actualParking[1].MOT.covered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Tarifa motocicleta cubierto: </span> ${actualParking[1].MOT['rate-covered']} /hora 
                                </h2> 
                            ): null
                        ) : null}
                        
                        {actualParking[1].MOT !== undefined ? (
                            actualParking[1].MOT.uncovered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Tarifa motocicleta descubierto: </span> ${actualParking[1].MOT['rate-uncovered']} /
                                hora </h2> 
                            ): null
                        ) : null}
                        
                        {actualParking[1].BIC !== undefined ? (
                            actualParking[1].BIC.covered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Tarifa bicicleta cubierto: </span> ${actualParking[1].BIC['rate-covered']} /hora 
                                </h2> 
                            ): null
                        ) : null}  

                        {actualParking[1].BIC !== undefined ? (
                            actualParking[1].BIC.uncovered !== undefined ? (
                                <h2 className="text-title text-md"> <span className="font-semibold"> Tarifa bicicleta descubierto: </span> ${actualParking[1].BIC['rate-uncovered']} /
                                hora </h2> 
                            ): null
                        ) : null}
                    </section> 
                </section>
            </article>

            <button className="w-1/3 my-6 px-2 py-3 rounded-2xl bg-blue-dark shadow-md font-title font-semibold text-lg text-white hover:bg-blue-darkest"
            onClick={() => setOnReservationForm(true)}> Realizar reserva </button>
        </section>
    )
}

export default ParkingInfo