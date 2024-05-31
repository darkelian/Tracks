import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState, useContext } from "react";
import { ApiContext } from '../../../../../context/ApiContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineOccupation = ({startDate}) => {
    const [occupation, setOccupation] = useState([]);
    const api = useContext(ApiContext);

    useEffect(() => {
        const token = sessionStorage.getItem('token').replace(/"/g, '');
        setOccupation([]);
      
        api.get(`/statistics/all-occupation`, {params: {
            date: startDate,
        }, headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
            const occupationData = res.data.map(item => ({ hour: item.hour, occupation: item.occupation }));
            setOccupation(element => [...element, ...occupationData]);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [startDate]);           
 
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
                text: 'PORCENTAJE DE OCUPACIÓN POR HORA EN TODOS LOS PARQUEADEROS',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineOccupation;
