import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState, useContext } from "react";
import { ApiContext } from '../../../../../context/ApiContext';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarOccupation = ({actualCity, startDate}) => {
    const [idCity, setIdCity] = useState('');
    const [occupation, setOccupation] = useState([]);
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
            setOccupation([]);
          
            api.get(`/statistics/city-occupation`, {params: {
                date: startDate,
                city: idCity
            }, headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                const occupationData = res.data.map(item => ({ hour: item.hour, occupation: item.occupation }));
                setOccupation(element => [...element, ...occupationData]);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [idCity, startDate]);   
 
    const labels = occupation.map((item) => item.hour);
    const sumOccupation = occupation.map((item) => item.occupation);

    const customPastelColors = [
        '#b1d4e6'
    ];
 
    const data = {
        labels: labels,
        datasets: [{
            label: '% ocupación',
            data: sumOccupation,
            backgroundColor: customPastelColors,
            borderColor: customPastelColors,
            borderWidth: 1,
        }]
    };
 
    const options = {
        plugins: {
            title: {
                display: true,
                text: `PORCENTAJE DE OCUPACIÓN POR HORA  EN ${actualCity.toUpperCase()}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true
            },
        },
    };
 
    return <Bar data={data} options={options} />;
};
 
export default BarOccupation;