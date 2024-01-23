<?php
//!

//!   Student Name: Kritish Dhakal
//!   Student ID: 2408573

//!  

$servername = "localhost";
$username = "root";
$password = "";
$database = "weatherdata";

$connection = mysqli_connect($servername, $username, $password, $database);

if (!$connection) {
    exit("Connection failed: ".mysqli_connect_error());
}

$city = $_GET['city'];

$sql = "SELECT * FROM weather_data WHERE city = '$city' AND last_updated > DATE_SUB(NOW(), INTERVAL 6 HOUR)";
$result = mysqli_query($connection, $sql);

if ($result && mysqli_num_rows($result) > 0) {

    $row = mysqli_fetch_assoc($result);
    echo json_encode($row); //? Sending the row as json to client

} else {

    $apiKey = "fec81edd16e193e514c606bf1b80293e";
    $weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=$city&units=metric&appid=$apiKey";
    
    //? JSON_Decode converts json data to php array
    //? file_get_contents gets the contents of the given file
    $weatherData = json_decode(file_get_contents($weatherApiUrl), true);

    if (isset($weatherData['main'])) {

        //? ?? (null coalescing operator) gives default value if the weather data returns NULL or undefined
        $temperature = $weatherData['main']['temp'] ?? 0;
        $humidity = $weatherData['main']['humidity'] ?? 0;
        $pressure = $weatherData['main']['pressure'] ?? 0;
        $wind_speed = $weatherData['wind']['speed'] ?? 0;
        $weather_description = $weatherData['weather'][0]['description'] ?? 'Unknown';
        $icon = $weatherData['weather'][0]['icon'] ?? '01d';
        $country = $weatherData['sys']['country'] ?? '';

        $sql = "INSERT INTO weather_data (city, temperature, humidity, pressure, wind_speed, weather_description, icon, country, last_updated) VALUES ('$city', '$temperature', '$humidity', '$pressure', '$wind_speed', '$weather_description', '$icon', '$country', NOW())";

        if (mysqli_query($connection, $sql)) {

            //? After inserting data, fetching the data from the database
            $result = mysqli_query($connection, "SELECT * FROM weather_data WHERE city = '$city' AND last_updated > DATE_SUB(NOW(), INTERVAL 6 HOUR)");
            
            if ($result && mysqli_num_rows($result) > 0) {
                $row = mysqli_fetch_assoc($result);
                echo json_encode($row); //? Sending row as json to client
            } else {
                echo "Error fetching weather data from the database.";
            }

        } else {
            echo "Error updating database: ".mysqli_error($connection);
        }

    } else {
        echo "Error fetching weather data.";
    }

}

//? Closing the database connection
mysqli_close($connection);
?>
