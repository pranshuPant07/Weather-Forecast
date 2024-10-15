function calculateAQI(pollutants) {
    const aqiValues = [];

    // Breakpoints for each pollutant
    const breakpoints = {
        co: [[0, 4.4, 0, 50], [4.5, 9.4, 51, 100], [9.5, 12.4, 101, 150], [12.5, 15.4, 151, 200], [15.5, 30.4, 201, 300]],
        no2: [[0, 53, 0, 50], [54, 100, 51, 100], [101, 360, 101, 150]],
        o3: [[0, 54, 0, 50], [55, 70, 51, 100], [71, 85, 101, 150]],
        pm2_5: [[0, 12, 0, 50], [12.1, 35.4, 51, 100], [35.5, 55.4, 101, 150]],
        pm10: [[0, 54, 0, 50], [55, 154, 51, 100]],
        so2: [[0, 35, 0, 50], [36, 75, 51, 100]]
    };

    // Calculate AQI for each pollutant
    for (const [key, value] of Object.entries(pollutants)) {
        let aqi = null;

        for (const [low, high, lowAQI, highAQI] of breakpoints[key]) {
            if (value >= low && value <= high) {
                aqi = ((highAQI - lowAQI) / (high - low)) * (value - low) + lowAQI;
                break;
            }
        }

        if (aqi !== null) {
            aqiValues.push(Math.round(aqi));
        }
    }

    // Return the maximum AQI value
    return Math.max(...aqiValues);
}

// Given pollutant values
const pollutants = {
    co: 821.11,
    nh3: 6.9,
    no: 0.01,
    no2: 34.96,
    o3: 73.67,
    pm2_5: 46.64,
    pm10: 71.66,
    so2: 37.19
};

const overallAQI = calculateAQI(pollutants);
console.log("Overall AQI:", overallAQI);
