function parseTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return { hours, minutes };
}

function getTimeDifference(startTime, endTime) {
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    let differenceHours = end.hours - start.hours;
    let differenceMinutes = end.minutes - start.minutes;

        if (differenceMinutes < 0) {
        differenceHours--;
        differenceMinutes += 60;
    }

    return { differenceHours, differenceMinutes };
}

function showCountdown(startTime, endTime) {
    const { differenceHours, differenceMinutes } = getTimeDifference(startTime, endTime);
    let hours = differenceHours;
    let minutes = differenceMinutes;

    
    const timer = setInterval(() => {
        
        if (hours === 0 && minutes === 0) {
            clearInterval(timer);
            return;
        }

        
        if (minutes === 0) {
            hours--;
            minutes = 59;
        } else {
            minutes--;
        }


        console.log(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`);
    }, 60000); 
}


module.exports = showCountdown;
