<?php
//!

//!   Student Name: Kritish Dhakal
//!   Student ID: 2408573

//!  

//? Server, username, password, database
$connection = mysqli_connect("localhost", "root", "", "weatherdata");


//? If connection fails
if (!$connection) {
    exit("Connection failed: ".mysqli_connect_error());
}


//? Retrieving the name of the city from the url passed in js file using '$_GET superglobal'
$city = $_GET['city'];


//? Function to fetch todays weather data of given city
function fetchTodayData($connection, $city) {
    //? SQL query to check if any recent weather data exists in the database for the given city
    $sqlToday = "SELECT * FROM weather_data WHERE city = '$city' AND last_updated > DATE_SUB(NOW(), INTERVAL 6 HOUR)";
    $resultToday = mysqli_query($connection, $sqlToday);

    //? If data exists in database return it as associative array
    if ($resultToday && mysqli_num_rows($resultToday) > 0) {

        return mysqli_fetch_assoc($resultToday);

    } else {

        $apiKey = "fec81edd16e193e514c606bf1b80293e";
        $weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=$city&units=metric&appid=$apiKey";

        //? Getting json weather data from the api and converting it to associative array
        $weatherData = json_decode(file_get_contents($weatherApiUrl), true);

        //? Checking if weather data exists and is fetched properly
        if (isset($weatherData['main'])) {

            $temperature = $weatherData['main']['temp'] ?? 0;
            $humidity = $weatherData['main']['humidity'] ?? 0;
            $pressure = $weatherData['main']['pressure'] ?? 0;
            $wind_speed = $weatherData['wind']['speed'] ?? 0;
            $weather_description = $weatherData['weather'][0]['description'] ?? 'Unknown';
            $icon = $weatherData['weather'][0]['icon'] ?? '01d';
            $country = $weatherData['sys']['country'] ?? '';

            //? Inserting weather data in the database
            $sqlInsert = "INSERT INTO weather_data (city, temperature, humidity, pressure, wind_speed, weather_description, icon, country, last_updated) VALUES ('$city', '$temperature', '$humidity', '$pressure', '$wind_speed', '$weather_description', '$icon', '$country', NOW())";

            //? If inserted successfully
            if (mysqli_query($connection, $sqlInsert)) {
                $resultToday = mysqli_query($connection, "SELECT * FROM weather_data WHERE city = '$city' AND last_updated > DATE_SUB(NOW(), INTERVAL 6 HOUR)");

                // DATE_SUB subtracts date

                //? Trying to return weather data from database
                if ($resultToday && mysqli_num_rows($resultToday) > 0) {
                    return mysqli_fetch_assoc($resultToday);
                } else {
                    echo json_encode(array('error' => 'Error fetching today\'s weather data from the database.'));
                    exit;
                }

            } else {
                echo json_encode(array('error' => 'Error updating database: ' . mysqli_error($connection)));
                exit;
            }

        } else {
            echo json_encode(array('error' => 'Error fetching weather data.'));
            exit;
        }
    }
}

//? Saving todays weather data in a variable
$rowToday = fetchTodayData($connection, $city);

if ($city === 'nagaon') {

    $sqlSevenDays = "SELECT DISTINCT DATE(last_updated) AS date, MAX(id) AS max_id, city, temperature, humidity, pressure, wind_speed, weather_description, icon, country FROM weather_data WHERE city = 'nagaon' AND last_updated > DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND DATE(last_updated) < CURDATE() GROUP BY DATE(last_updated)";
    
    $resultSevenDays = mysqli_query($connection, $sqlSevenDays);

    if ($resultSevenDays && mysqli_num_rows($resultSevenDays) > 0) {
        //? Creating an empty array
        $sevenDaysData = array();

        //? looping as long as there is data that can be converted to associative array in result
        while ($rowSevenDays = mysqli_fetch_assoc($resultSevenDays)) {

            //? Adding the associative array inside the data array
            $sevenDaysData[] = $rowSevenDays;
        }

        echo json_encode(array('currentData' => $rowToday, 'sevenDaysData' => $sevenDaysData));

    } else {
        echo json_encode(array('currentData' => $rowToday, 'sevenDaysData' => array()));
    }
} else {
    echo json_encode(array('currentData' => $rowToday));
}

mysqli_close($connection);
?>
