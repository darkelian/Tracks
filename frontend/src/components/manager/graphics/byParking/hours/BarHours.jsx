import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState, useContext } from "react";
import { ApiContext } from '../../../../../context/ApiContext';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarHours = ({actualParking, startDate, endDate}) => {
    const [hoursAverage, setHoursAverage] = useState([]);
    const api = useContext(ApiContext);

    useEffect(() => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        setHoursAverage([]);
      
        api.get(`/statistics/average-hour`, {params: {
            initialDate: startDate,
            finalDate: endDate,
            idParking: actualParking.id
        }, headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
            const hoursData = res.data.map(item => ({ hour: item.hour, average: item.average }));
            setHoursAverage(element => [...element, ...hoursData]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [actualParking, startDate, endDate]);      

    const labels = hoursAverage.map((item) => item.hour);
    const average = hoursAverage.map((item) => item.average);

    const customPastelColors = [
        '#b1d4e6'
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'Reservas',
            data: average,
            backgroundColor: customPastelColors,
            borderColor: customPastelColors,
            borderWidth: 1,
        }]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'PROMEDIO DE RESERVAS POR HORA',
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

export default BarHours;
