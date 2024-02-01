<?php
//! Student Name: Kritish Dhakal
//! Student ID: 2408573

//? Establish database connection
$connection = mysqli_connect("localhost", "root", "", "weatherdata");

header('Content-Type: application/json');

//? Check for connection failure
if (!$connection) {
    exit("Connection failed: " . mysqli_connect_error());
}

//? Retrieve the city from the URL or default to 'Nagaon'
$city = isset($_GET['city']) ? $_GET['city'] : 'Nagaon';

//? Function to handle API errors and exit
function handleApiError($message) {
    echo json_encode(['error' => $message]);
    exit;
}

//? Function to fetch today's weather data for a given city
function fetchTodayData($connection, $city) {
    //? Query to check for recent weather data in the database
    $sqlToday = "SELECT * FROM weather_data WHERE city = '$city' AND last_updated > DATE_SUB(NOW(), INTERVAL 6 HOUR)";
    $resultToday = mysqli_query($connection, $sqlToday);

    if ($resultToday && mysqli_num_rows($resultToday) > 0) {
        return mysqli_fetch_assoc($resultToday);
    } else {
        //? OpenWeatherMap API key
        $apiKey = "fec81edd16e193e514c606bf1b80293e";
        $weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=$city&units=metric&appid=$apiKey";

        //? Fetch weather data from the API
        $weatherData = json_decode(file_get_contents($weatherApiUrl), true);

        if (isset($weatherData['main'])) {
            //? Extract weather data
            $temperature = $weatherData['main']['temp'] ?? 0;
            $humidity = $weatherData['main']['humidity'] ?? 0;
            $pressure = $weatherData['main']['pressure'] ?? 0;
            $wind_speed = $weatherData['wind']['speed'] ?? 0;
            $weather_description = $weatherData['weather'][0]['description'] ?? 'Unknown';
            $icon = $weatherData['weather'][0]['icon'] ?? '01d';
            $country = $weatherData['sys']['country'] ?? '';

            //? Insert weather data into the database
            $sqlInsert = "INSERT INTO weather_data (city, temperature, humidity, pressure, wind_speed, weather_description, icon, country, last_updated) VALUES ('$city', '$temperature', '$humidity', '$pressure', '$wind_speed', '$weather_description', '$icon', '$country', NOW())";

            if (mysqli_query($connection, $sqlInsert)) {
                //? Retrieve and return the inserted data
                $resultToday = mysqli_query($connection, "SELECT * FROM weather_data WHERE city = '$city' AND last_updated > DATE_SUB(NOW(), INTERVAL 6 HOUR)");

                if ($resultToday && mysqli_num_rows($resultToday) > 0) {
                    return mysqli_fetch_assoc($resultToday);
                } else {
                    handleApiError('Error fetching today\'s weather data from the database.');
                }
            } else {
                handleApiError('Error updating the database: ' . mysqli_error($connection));
            }
        } else {
            handleApiError('Error fetching weather data from the API.');
        }
    }
}

//? Fetch today's weather data
$rowToday = fetchTodayData($connection, $city);

//? Fetch seven days weather data for Nagaon
if (strtolower($city) === 'nagaon') {
    //? Query for seven days weather data
    $sqlSevenDays = "SELECT DISTINCT DATE(last_updated) AS date, MAX(id) AS max_id, city, temperature, humidity, pressure, wind_speed, weather_description, icon, country FROM weather_data WHERE city = 'nagaon' AND last_updated > DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND DATE(last_updated) < CURDATE() GROUP BY DATE(last_updated)";
    
    $resultSevenDays = mysqli_query($connection, $sqlSevenDays);

    if ($resultSevenDays && mysqli_num_rows($resultSevenDays) > 0) {
        //? Create an array to store seven days data
        $sevenDaysData = [];

        //? Loop through the result and add to the array
        while ($rowSevenDays = mysqli_fetch_assoc($resultSevenDays)) {
            $sevenDaysData[] = $rowSevenDays;
        }

        //? Output JSON with current and seven days data
        echo json_encode(['currentData' => $rowToday, 'sevenDaysData' => $sevenDaysData]);

    } else {
        handleApiError('Error fetching seven days weather data from the database.');
    }
} else {
    //? Output JSON with only current data
    echo json_encode(['currentData' => $rowToday]);
}

//? Close database connection
mysqli_close($connection);
?>
