import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext } from '../../context/ApiContext';
import Swal from 'sweetalert2'
import coveredIcon from '../../assets/Parking Icons/Covered-Transparent.png';
import uncoveredIcon from '../../assets/Parking Icons/Uncovered-Transparent.png';
import semicoveredIcon from '../../assets/Parking Icons/Semicovered-Transparent.png';

function ReservationCard({setOnReservationForm, actualParking, actualCity }) {
    const [resStartDate, setResStartDate]= useState('');
    const [resEndDate, setResEndDate]= useState('');
    const [resStart, setResStart] = useState('');
    const [resEnd, setResEnd] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [resPayMethod, setResPayMethod] = useState('');
    const [price, setPrice] = useState('');
    const [fieldParking, setFieldParking] = useState('');

    const carCompData = actualParking[1].CAR;
    const motCompData = actualParking[1].MOT;
    const bicCompData = actualParking[1].BIC;

    const api = useContext(ApiContext);

    function calculatePrice(param) {
        let a = parseInt(resStart,10)
        let b = parseInt(resEnd,10)
        if (b < a) {
            b += 24;
        }
        const startDate = new Date(resStartDate);
        const endDate = new Date(resEndDate);
        const diffMs = endDate - startDate;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        let totalHours = (b - a) + (diffDays * 24);
        let totalPrice = totalHours * param;
        setPrice(totalPrice)
        
    }
    
    const navigate = useNavigate();
    //Hacer calculo de tarifa
    const idCiudad = actualCity.id;
    let tipoParkeadero = actualParking[0].parkingType.idParkingType;
    const idParqueadero = actualParking[0].parkingId.idParking;

    useEffect(() => {
        if (tipoParkeadero !== "SEC") {
            setFieldParking(tipoParkeadero);
            console.log(fieldParking)
        }
    }, [tipoParkeadero]);
 
    useEffect(() => {
        //console.log(tipoParkeadero) 
        let precioVehiculoCarroDescubierto;
        let precioVehiculoCarroCubierto;
        let precioVehiculoMotoDescubierto;
        let precioVehiculoMotoCubierto;
        let precioVehiculoBiciDescubierto;
        let precioVehiculoBiciCubierto;
    
        if (actualParking && actualParking[1]) {
            const carData = actualParking[1].CAR;
            const motData = actualParking[1].MOT;
            const bicData = actualParking[1].BIC;
    
            if (carData) {
                precioVehiculoCarroDescubierto = carData["rate-uncovered"];
                precioVehiculoCarroCubierto = carData["rate-covered"];
            }
    
            if (motData) {
                precioVehiculoMotoDescubierto = motData["rate-uncovered"];
                precioVehiculoMotoCubierto = motData["rate-covered"];
            }
    
            if (bicData) {
                precioVehiculoBiciDescubierto = bicData["rate-uncovered"];
                precioVehiculoBiciCubierto = bicData["rate-covered"];
            }
        }
    
        if (precioVehiculoCarroDescubierto !== undefined && vehicleType=="CAR" && fieldParking=="UNC") {
            console.log(precioVehiculoCarroDescubierto);
            calculatePrice(precioVehiculoCarroDescubierto)
        }
        if (precioVehiculoCarroCubierto !== undefined && vehicleType=="CAR" && fieldParking=="COV") {
            console.log(precioVehiculoCarroCubierto);
            calculatePrice(precioVehiculoCarroCubierto)
        }
        if (precioVehiculoMotoDescubierto !== undefined && vehicleType=="MOT" && fieldParking=="UNC") {
            console.log(precioVehiculoMotoDescubierto);
            calculatePrice(precioVehiculoMotoDescubierto)
        }
        if (precioVehiculoMotoCubierto !== undefined && vehicleType=="MOT" && fieldParking=="COV") {
            console.log(precioVehiculoMotoCubierto);
            calculatePrice(precioVehiculoMotoCubierto)
        }
        if (precioVehiculoBiciDescubierto !== undefined && vehicleType=="BIC" && fieldParking=="UNC") {
            console.log(precioVehiculoBiciDescubierto);
            calculatePrice(precioVehiculoBiciDescubierto)
        }
        if (precioVehiculoBiciCubierto !== undefined && vehicleType=="BIC" && fieldParking=="COV") {
            console.log(precioVehiculoBiciCubierto);
            calculatePrice(precioVehiculoBiciCubierto)
        }
    },[vehicleType, resStart, resEnd, fieldParking]);

    const handleTimeChange = (setter) => (event) => {
        const time = new Date(event.target.valueAsNumber);
        if (time) {
          time.setMinutes(0);
          time.setSeconds(0);
          setter(time.toISOString().substr(11, 8));
        }
      };

    const handleReservation = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token').replace(/"/g, '');

        const user =JSON.parse(sessionStorage.getItem('userLogged'));
        const idNumber = user.idNumber;  
        const idType = user.idType;

        if(!resStartDate ||!resEndDate || !resStart || !resEnd || !licensePlate || !vehicleType || !resPayMethod) {
            Swal.fire({
                icon: 'info',
                title: `Por favor llene todos los campos`
            });
        } else {
            api.post(`/reservation/start`, {
                startDateRes: resStartDate, 
                endDateRes: resEndDate,
                startTimeRes: resStart, 
                endTimeRes: resEnd, 
                licensePlate: licensePlate,
                clientId:{
                    idUser:idNumber,idDocType:idType
                },
                cityId:idCiudad,
                parkingId:idParqueadero,
                vehicleType:vehicleType,
                isUncovered: true
            },{headers: {Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res);
                
                Swal.fire({
                    icon: 'success',
                    title: `Reserva exitosa`
                });
            })
            .catch(err => {
                if ((err.response.data.message)=="¡No se encontró espacio libre!") {
                    Swal.fire({
                        icon: 'error',
                        title: `No hay espacios disponibles` ,
                    });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: `Hubo un error al realizar la reserva` ,
                    });
                }

                console.log(err.data);
            })
        }
    }

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
        <article className="bg-blue-light mt-12 pt-5 pb-6 relative rounded-2xl shadow-xl">
            <section className="flex flex-col items-center px-6">
                <section className="w-full flex justify-between">
                    <div className="w-1/6 flex justify-center rounded-md border-2 border-black">
                            <img className="w-16" src={getIcon()} alt="Imagen que identifica el tipo de parqueadero"/>
                    </div>

                    <section className="flex flex-col justify-evenly items-center w-4/5 h-16">
                        <h1 className="text-center text-title font-semibold text-lg"> {actualParking[0].namePark}</h1>
                        <span className="w-full h-0.5 rounded-full bg-black"></span>
                    </section>
                </section>

                <section className="flex flex-col justify-evenly items-center w-full h-22 mt-8">
                    <div className="flex justify-between w-full mb-5">
                        <div className="flex flex-col w-2/5 mr-4">
                            <label className='text-sm font-title font-semibold mb-2'>Fecha inicio</label>
                            <input type="date" id="resStartDate" className="p-3 rounded-md bg-white font-paragraph" value={resStartDate} 
                            onChange={(e) => setResStartDate(e.target.value)}></input>
                        </div>
                        
                        <div className="flex flex-col w-2/5 mr-4">
                            <label className='text-sm font-title font-semibold mb-2'>Fecha fin</label>
                            <input type="date" id="resStartDate" className="p-3 rounded-md bg-white font-paragraph" value={resEndDate} 
                            onChange={(e) => setResEndDate(e.target.value)}></input>
                        </div>
                       
                        <div className="flex flex-col w-2/5 mr-4">
                            <label className='text-sm font-title font-semibold mb-2'>Hora inicio</label>
                            <input type="time" id="resStart" className="p-3 rounded-md bg-white font-paragraph" value={resStart} 
                            onChange={handleTimeChange(setResStart)}></input>
                        </div>
                        
                        <div className="flex flex-col w-2/5 mr-4">
                            <label className='text-sm font-title font-semibold mb-2'>Hora fin</label>    
                            <input type="time" id="resEnd"className="p-3 rounded-md bg-white font-paragraph" placeholder="Hora fin" value={resEnd} 
                            onChange={handleTimeChange(setResEnd)}></input>
                        </div>
                    </div>
                
                    <div className="flex justify-between w-full mb-5">
                        <div className="flex flex-col w-2/5 mr-4">
                            <label className='text-sm font-title font-semibold mb-2'>Tipo de vehículo</label>    
                            <select id="vehicleType" className="p-3 rounded-md bg-white font-paragraph" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                                {motCompData?<option value="MOT">Moto</option>:<></>}
                                {carCompData?<option value="CAR">Carro</option>:<></>}
                                {bicCompData?<option value="BIC">Bicicleta</option>:<></>}
                            </select>
                        </div>
                        
                        {tipoParkeadero=="SEC" ?  (
                            <div className="flex flex-col w-2/5 mr-4">
                                <label className='text-sm font-title font-semibold mb-2'>Tipo de plaza</label>    
                                <select id="fieldParking" className="p-3 rounded-md bg-white font-paragraph" value={fieldParking} onChange={(e) => setFieldParking(e.target.value)}>
                                    <option value="COV">Cubierta</option>
                                    <option value="UNC">Descubierta</option>
                                </select>
                            </div>
                        ) :<></>}

                        <div className="flex flex-col w-2/5 mr-4">
                            <label className='text-sm font-title font-semibold mb-2'>Matrícula del vehículo</label>    
                            <input id="licensePlate" className="p-3 rounded-md bg-white font-paragraph placeholder:text-gray-dark" placeholder="XYZ123"
                            value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)}></input>
                        </div>
                    </div>
                
                    <div className="w-full">
                        <div className="flex flex-col w-full mr-4">
                            <label className='text-sm font-title font-semibold mb-2'>Método de pago</label>    
                            <select id="resPayMethod" className="p-3 rounded-md bg-white font-paragraph" value={resPayMethod} 
                            onChange={(e) => setResPayMethod(e.target.value)}>
                                <option value=""></option>
                                <option value="5104499087433833">5104499087433833</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between w-full mt-5">
                        <div className="text font-semibold text-lg">Precio Reserva: ${resStart=="" || resEnd=="" ? " " :price}</div>
                        <hr className="h-0.5 rounded-full bg-blue-light"></hr>
                    </div>
                </section>  

                <div className="flex justify-between">
                    <button className="mt-8 px-10 py-3 mr-8 bg-blue-dark hover:bg-blue-darkest rounded-xl text-white font-title font-semibold" 
                    onClick={handleReservation}> Realizar reserva </button>
                    <button className="mt-8 px-10 py-3 bg-red-dark hover:bg-red-darkest rounded-xl text-white font-title font-semibold" 
                    onClick={() => setOnReservationForm(false)}> Cancelar </button>
                </div>
            </section>
        </article>
    )
}

export default ReservationCard;