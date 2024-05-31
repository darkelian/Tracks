import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState, useContext } from "react";
import { ApiContext } from '../../../../context/ApiContext';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

const PieHours = ({actualParking, startDate, endDate}) => {
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
        }
    };

    return <Pie data={data} options={options} />;
};

export default PieHours;
