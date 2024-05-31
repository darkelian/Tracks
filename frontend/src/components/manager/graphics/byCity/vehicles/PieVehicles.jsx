import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState, useContext } from "react";
import { ApiContext } from '../../../../../context/ApiContext';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

const PieVehicles = ({actualCity}) => {
    const [idCity, setIdCity] = useState('');
    const [vehiclePerc, setVehiclePerc] = useState([]);
    const api = useContext(ApiContext);

    useEffect(() => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');

        api.get(`/city/${actualCity}`, {headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
            setIdCity(res.data.idCity);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [actualCity]);  

    useEffect(() => {
        if(idCity) {
            const token = sessionStorage.getItem('token').replace(/"/g, '');
            setVehiclePerc([]);
    
            api.get(`/statistics/city-vehicle-percentage`, {params: {
                city: idCity
            }, headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                const vehicleData = res.data.map(item => ({ vehicle: item.vehicle, percentage: item.percentage }));
                setVehiclePerc(element => [...element, ...vehicleData]);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [idCity]);

    const labels = vehiclePerc.map((item) => item.vehicle);
    const percentage = vehiclePerc.map((item) => item.percentage);

    const customPastelColors = [
        '#C3E8FA',
        '#B1D4E6',
        '#85D6FF',
        '#B0EBFF',
        '#1A7691', 
        '#95D6F0', 
        '#76AFCC',
        '#AEE0EB', 
        '#99C8E0', 
        '#ADD9E8', 
        '#96E0ED', 
        '#48AADB', 
        '#7EBEDE',
        '#2d6a88', 
        '#77BBDB',
        '#7DBED4',
        '#448EB3',
        '#C0DDEB',
        '#A2CADE',
        '#1A4B63', 
        '#4C839E',
        '#87B3C9',
        '#5D94B0',
        '#205d7b' 
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'Ocupación',
            data: percentage,
            backgroundColor: customPastelColors,
            borderColor: customPastelColors,
            borderWidth: 1,
        }]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: `PORCENTAJE DE OCUPACIÓN POR TIPO DE VEHICULO EN ${actualCity.toUpperCase()}`,
            },
        }
    };

    return <Pie data={data} options={options} />;
};

export default PieVehicles;
