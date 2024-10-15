function calculateAQI(pollutants) {
    const aqiValues = {};

    // Function to calculate AQI for PM2.5
    const calculatePM25AQI = (pm25) => {
        if (pm25 <= 12) return (50 / 12) * pm25;
        if (pm25 <= 35.4) return (50 / 23.3) * (pm25 - 12) + 51;
        if (pm25 <= 55.4) return (50 / 20) * (pm25 - 35.4) + 101;
        if (pm25 <= 150.4) return (100 / 94.9) * (pm25 - 55.4) + 151;
        return 301; // Assuming higher categories are > 300
    };

    // Function to calculate AQI for PM10
    const calculatePM10AQI = (pm10) => {
        if (pm10 <= 54) return (50 / 54) * pm10;
        if (pm10 <= 154) return (100 / 100) * (pm10 - 54) + 51;
        return 201; // Assuming higher categories are > 150
    };

    // Function to calculate AQI for O3
    const calculateO3AQI = (o3) => {
        if (o3 <= 54) return (50 / 54) * o3;
        if (o3 <= 70) return (100 / 16) * (o3 - 54) + 51;
        return 201; // Assuming higher categories are > 70
    };

    // Function to calculate AQI for NO2
    const calculateNO2AQI = (no2) => {
        if (no2 <= 53) return (50 / 53) * no2;
        if (no2 <= 100) return (100 / 47) * (no2 - 53) + 51;
        return 201; // Assuming higher categories are > 100
    };

    // Function to calculate AQI for SO2
    const calculateSO2AQI = (so2) => {
        if (so2 <= 35) return (50 / 35) * so2;
        if (so2 <= 75) return (100 / 40) * (so2 - 35) + 51;
        return 201; // Assuming higher categories are > 75
    };

    // Function to calculate AQI for CO
    const calculateCOAQI = (co) => {
        if (co <= 4.4) return (50 / 4.4) * co;
        if (co <= 9.4) return (100 / 5) * (co - 4.4) + 51;
        return 201; // Assuming higher categories are > 9.4
    };

    // Calculate AQI for each pollutant
    aqiValues.pm2_5 = calculatePM25AQI(pollutants.pm2_5);
    aqiValues.pm10 = calculatePM10AQI(pollutants.pm10);
    aqiValues.o3 = calculateO3AQI(pollutants.o3);
    aqiValues.no2 = calculateNO2AQI(pollutants.no2);
    aqiValues.so2 = calculateSO2AQI(pollutants.so2);
    aqiValues.co = calculateCOAQI(pollutants.co);

    // Find the maximum AQI value
    const overallAQI = Math.max(...Object.values(aqiValues));

    return overallAQI;
}

