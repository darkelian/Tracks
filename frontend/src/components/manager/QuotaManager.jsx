import { useState, useEffect, useContext } from "react";
import { ApiContext } from '../../context/ApiContext';
import Swal from 'sweetalert2'

function QuotaManager({actualParking, setActualParking, actualCity, setCanEditSpaces }) {
    //Cupos Cubiertos
    const [quotaCarCov, setQuotaCarCov] = useState('');
    const [quotaMotoCov, setQuotaMotoCov] = useState('');
    const [quotaBicCov, setQuotaBicCov] = useState('');
    //Cupos Descubiertos
    const [quotaCarUnc, setQuotaCarUnc] = useState('');
    const [quotaMotoUnc, setQuotaMotoUnc] = useState('');
    const [quotaBicUnc, setQuotaBicUnc] = useState('');
    //Tarifas Cubiertos
    const [RateCarCov, setRateCarCov] = useState('');
    const [RateMotoCov, setRateMotoCov] = useState('');
    const [RateBicCov, setRateBicCov] = useState('');
    //Tarifas Descubiertos
    const [RateCarUnc, setRateCarUnc] = useState('');
    const [RateMotoUnc, setRateMotoUnc] = useState('');
    const [RateBicUnc, setRateBicUnc] = useState('');

    const api = useContext(ApiContext);

    useEffect(() => {
      if(actualParking[0].parkingType.idParkingType == 'COV' || actualParking[0].parkingType.idParkingType == 'SEC') {
        if(actualParking[1].CAR !== undefined) {
            setQuotaCarCov(actualParking[1].CAR.covered)
            setRateCarCov(actualParking[1].CAR['rate-covered'])
        }
        
        if(actualParking[1].MOT !== undefined) {
            setQuotaMotoCov(actualParking[1].MOT.covered)
            setRateMotoCov(actualParking[1].MOT['rate-covered'])
        }
        
        if(actualParking[1].BIC !== undefined) {
            setQuotaBicCov(actualParking[1].BIC.covered)
            setRateBicCov(actualParking[1].BIC['rate-covered'])
        }
      } 
      
      if(actualParking[0].parkingType.idParkingType == 'UNC' || actualParking[0].parkingType.idParkingType == 'SEC') {
        if(actualParking[1].CAR !== undefined) {
            setQuotaCarUnc(actualParking[1].CAR.uncovered)
            setRateCarUnc(actualParking[1].CAR['rate-uncovered'])
        }
        
        if(actualParking[1].MOT !== undefined) {
            setQuotaMotoUnc(actualParking[1].MOT.uncovered)
            setRateMotoUnc(actualParking[1].MOT['rate-uncovered'])
        }
        
        if(actualParking[1].BIC !== undefined) {
            setQuotaBicUnc(actualParking[1].BIC.uncovered)
            setRateBicUnc(actualParking[1].BIC['rate-uncovered'])
        }
      }
    }, [actualParking]);

    const handleSpaces = async () => {
        try {
            await Promise.all([
                updateCarCovSpaces(),
                updateCarUncSpaces(),
                updateMotoCovSpaces(),
                updateMotoUncSpaces(),
                updateBicCovSpaces(),
                updateBicUncSpaces()
            ]);
    
            Swal.fire({
                icon: 'success',
                title: `Se actualizaron correctamente los espacios al parqueadero`
            });

            setActualParking();
            setCanEditSpaces(false);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: `Error al actualizar espacios al parqueadero`,
                text: 'Hubo un error al intentar actualizar uno o más espacios'
            });
        }
    };

    const updateCarCovSpaces = async () => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        let amount = 0;

        if(quotaCarCov) {
            amount = quotaCarCov - actualParking[1].CAR.covered;
    
            if(amount > 0) {
                try {
                    await api.post(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/insert`, 
                    {vehicleType: 'CAR', amount: amount, isUncovered: false}, {headers: {Authorization: `Bearer ${token}`}});
                } catch (err) {
                    console.log(err);
                }
            } else if(amount < 0) {
                amount = actualParking[1].CAR.covered - quotaCarCov;
                
                try {
                    await api.delete(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/delete`, 
                    {headers: {Authorization: `Bearer ${token}`}, data: {vehicleType: 'CAR', amount: amount, isUncovered: false}});
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    const updateCarUncSpaces = async () => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        let amount = 0;

        if(quotaCarUnc) {
            amount = quotaCarUnc - actualParking[1].CAR.uncovered;
    
            if(amount > 0) {
                try {
                    await api.post(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/insert`, 
                    {vehicleType: 'CAR', amount: amount, isUncovered: true}, {headers: {Authorization: `Bearer ${token}`}});
                } catch (err) {
                    console.log(err);
                }
            } else if(amount < 0) {
                amount = actualParking[1].CAR.uncovered - quotaCarUnc;
                try {
                    await api.delete(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/delete`, 
                    {headers: {Authorization: `Bearer ${token}`}, data: {vehicleType: 'CAR', amount: amount, isUncovered: true}});
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
    
    const updateMotoCovSpaces = async () => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        let amount = 0;
        
        if(quotaMotoCov) {
            let amount = quotaMotoCov - actualParking[1].MOT.covered;
    
            if(amount > 0) {
                try {
                    await api.post(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/insert`, 
                    {vehicleType: 'MOT', amount: amount, isUncovered: false}, {headers: {Authorization: `Bearer ${token}`}});
                } catch (err) {
                    console.log(err);
                }
            } else if(amount < 0) {
                amount = actualParking[1].MOT.covered - quotaMotoCov;
                
                try {
                    await api.delete(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/delete`, 
                    {headers: {Authorization: `Bearer ${token}`}, data: {vehicleType: 'MOT', amount: amount, isUncovered: false}});
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    const updateMotoUncSpaces = async () => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        let amount = 0;
        
        if(quotaMotoUnc) {
            let amount = quotaMotoUnc - actualParking[1].MOT.uncovered;
    
            if(amount > 0) {
                try {
                    await api.post(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/insert`, 
                    {vehicleType: 'MOT', amount: amount, isUncovered: true}, {headers: {Authorization: `Bearer ${token}`}});
                } catch (err) {
                    console.log(err);
                }
            } else if(amount < 0) {
                amount = actualParking[1].MOT.uncovered - quotaMotoUnc;
                try {
                    await api.delete(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/delete`, 
                    {headers: {Authorization: `Bearer ${token}`}, data: {vehicleType: 'MOT', amount: amount, isUncovered: true}});
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
    
    const updateBicCovSpaces = async () => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        let amount = 0;
        
        if(quotaBicCov) {
            let amount = quotaBicCov - actualParking[1].BIC.covered;
    
            if(amount > 0) {
                try {
                    await api.post(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/insert`, 
                    {vehicleType: 'BIC', amount: amount, isUncovered: false}, {headers: {Authorization: `Bearer ${token}`}});
                } catch (err) {
                    console.log(err);
                }
            } else if(amount < 0) {
                amount = actualParking[1].BIC.covered - quotaBicCov;
                
                try {
                    await api.delete(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/delete`, 
                    {headers: {Authorization: `Bearer ${token}`}, data: {vehicleType: 'BIC', amount: amount, isUncovered: false}});
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    const updateBicUncSpaces = async () => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        let amount = 0;
        
        if(quotaBicUnc) {
            let amount = quotaBicUnc - actualParking[1].BIC.uncovered;
    
            if(amount > 0) {
                try {
                    await api.post(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/insert`, 
                    {vehicleType: 'BIC', amount: amount, isUncovered: true}, {headers: {Authorization: `Bearer ${token}`}});
                } catch (err) {
                    console.log(err);
                }
            } else if(amount < 0) {
                amount = actualParking[1].BIC.uncovered - quotaBicUnc;
                try {
                    await api.delete(`/parking/${actualParking[0].parkingId.idParking}/${actualCity.id}/parking-space/delete`, 
                    {headers: {Authorization: `Bearer ${token}`}, data: {vehicleType: 'BIC', amount: amount, isUncovered: true}});
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    return (
        <article className="w-full py-4 rounded-2xl shadow-xl bg-blue-light">
            <section className='flex flex-col justify-center items-center mb-2'>
                <div className='text-2xl font-semibold'> Administrar cupos </div>
                <div className='text-lg'> {actualParking[0].namePark} </div>
            </section>

            {(actualParking[0].parkingType.idParkingType == 'COV' || actualParking[0].parkingType.idParkingType == 'SEC') ? (
                <section className='mt-2 px-8'>
                    <label className='text font-semibold text-xl'> Cubierto </label>
                    
                    {actualParking[1].CAR !== undefined ? (
                        <section className='flex flex-col'>
                            <label className='mt-4 text font-semibold'> Automóvil </label>

                            <section className='flex justify-between mt-2'>
                                <div className='flex justify-between items-center'>
                                    <label className='text font-semibold'> # cupos </label>
                                    <input type="number" className='mr-8 w-7/12 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark'
                                    value={quotaCarCov} onChange={(e) => setQuotaCarCov(e.target.value)}/>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <label className='ml-8 text font-semibold'> Tarifa </label>
                                    <input type="" className='w-2/3 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark'
                                    value={RateCarCov} onChange={(e) => setRateCarCov(e.target.value)}/>
                                </div>
                            </section>
                        </section>
                    ) : null}

                    {actualParking[1].MOT !== undefined ? (
                        <section className='flex flex-col'>
                            <label className='mt-4 text font-semibold'> Motocicleta </label>

                            <section className='flex justify-between mt-2'>
                                <div className='flex justify-between items-center'>
                                    <label className='text font-semibold'> # cupos </label>
                                    <input type="number" className='mr-8 w-7/12 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark' 
                                    value={quotaMotoCov} onChange={(e) => setQuotaMotoCov(e.target.value)}/>
                                </div>

                                <div className='flex justify-between'>
                                    <label className='ml-8 text font-semibold'> Tarifa </label>
                                    <input type="" className='w-2/3 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark' 
                                    value={RateMotoCov} onChange={(e) => setRateMotoCov(e.target.value)}/>
                                </div>
                            </section>
                        </section>
                    ) : null}

                    {actualParking[1].BIC !== undefined ? (
                        <section className='flex flex-col'>
                            <label className='mt-4 text font-semibold'> Bicicleta </label>

                            <section className='flex justify-between mt-2'>
                                <div className='flex justify-between items-center'>
                                    <label className='text font-semibold'> # cupos </label>
                                    <input type="number" className='mr-8 w-7/12 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark'
                                    value={quotaBicCov} onChange={(e) => setQuotaBicCov(e.target.value)}/>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <label className='ml-8 text font-semibold'> Tarifa </label>
                                    <input type="" className='w-2/3 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark' 
                                    value={RateBicCov} onChange={(e) => setRateBicCov(e.target.value)}/>
                                </div>
                            </section>
                        </section>
                    ) : null}
                </section>
            ) : null}

            {(actualParking[0].parkingType.idParkingType == 'SEC') ? (<hr className="w-full h-0.5 mt-10 rounded-full bg-white"></hr>) : null}

            {(actualParking[0].parkingType.idParkingType == 'UNC' || actualParking[0].parkingType.idParkingType == 'SEC') ? (
                <section className='mt-6 px-8'>
                    <label className='text font-semibold text-lg'> Descubierto </label>

                    {actualParking[1].CAR !== undefined ? (
                        <section className='flex flex-col'>
                            <label className='mt-4 text font-semibold'> Automóvil </label>

                            <section className='flex justify-between mt-2'>
                                <div className='flex justify-between items-center'>
                                    <label className='text font-semibold'> # cupos </label>
                                    <input type="number" className='mr-8 w-7/12 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark' 
                                    value={quotaCarUnc} onChange={(e) => setQuotaCarUnc(e.target.value)}/>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <label className='ml-8 text font-semibold'> Tarifa </label>
                                    <input type="" className='w-2/3 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark' 
                                    value={RateCarUnc} onChange={(e) => setRateCarUnc(e.target.value)}/>
                                </div>
                            </section>
                        </section>
                    ) : null}

                    {actualParking[1].MOT !== undefined ? (
                        <section className='flex flex-col'>
                            <label className='mt-4 text font-semibold'> Motocicleta </label>

                            <section className='flex justify-between mt-2'>
                                <div className='flex justify-between items-center'>
                                    <label className='text font-semibold'> # cupos </label>
                                    <input type="number" className='mr-8 w-7/12 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark' 
                                    value={quotaMotoUnc} onChange={(e) => setQuotaMotoUnc(e.target.value)}/>
                                </div>

                                <div className='flex justify-between'>
                                    <label className='ml-8 text font-semibold'> Tarifa </label>
                                    <input type="" className='w-2/3 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark'
                                    value={RateMotoUnc} onChange={(e) => setRateMotoUnc(e.target.value)}/>
                                </div>
                            </section>
                        </section>
                    ) : null}

                    {actualParking[1].BIC !== undefined ? (
                        <section className='flex flex-col'>
                            <label className='mt-4 text font-semibold'> Bicicleta </label>

                            <section className='flex justify-between mt-2'>
                                <div className='flex justify-between items-center'>
                                    <label className='text font-semibold'> # cupos </label>
                                    <input type="number" className='mr-8 w-7/12 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark'
                                    value={quotaBicUnc} onChange={(e) => setQuotaBicUnc(e.target.value)}/>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <label className='ml-8 text font-semibold'> Tarifa </label>
                                    <input type="" className='w-2/3 shadow-xl px-3 py-2 rounded-md bg-white font-paragraph placeholder:text-gray-dark'
                                    value={RateBicUnc} onChange={(e) => setRateBicUnc(e.target.value)}/>
                                </div>
                            </section>
                        </section>

                    ) : null}
                </section>
            ) : null}


            <section className='flex items-center justify-between w-full mt-12 mb-2 px-14'>
                <button className='shadow-xl px-24 py-3 bg-blue-dark hover:bg-blue-darkest rounded-xl text-white font-title font-semibold'
                onClick={handleSpaces}> Confirmar </button>
                <button className='shadow-xl px-24 py-3 bg-red-dark hover:bg-red-darkest rounded-xl text-white font-title font-semibold'
                onClick={() => setCanEditSpaces(false)}> Cancelar </button>
            </section>
        </article>
    )
}

export default QuotaManager;