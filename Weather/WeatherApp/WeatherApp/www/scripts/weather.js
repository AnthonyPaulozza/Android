var openWeatherAppKey = "8d0e7c385db023bd5e9b78301eaf4900";

function getWeatherWithZipCode() {
    
    var zipCode = $('#zip-code-input').val();

    var queryString = 'http://api.openweathermap.org/data/2.5/weather?zip='
    + zipCode + ',us&appid=' + openWeatherAppKey + '&units=metric';

    $.getJSON(queryString, function (results) {
        showWeatherData(results);
    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });

    return false;
}

function showWeatherData(results) {
    if (results.weather.length) {
        $('#error-msg').hide();
        $('#weather-data').show();

        $('#title').text(results.name);
        $('#temperature').text(results.main.temp);
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $('#visibility').text(results.weather[0].main);

        var sunriseDate = new Date(results.sys.sunrise);
        $('#sunrise').text(sunriseDate.toLocaleTimeString());

        var sunsetDate = new Date(results.sys.sunset);
        $('#sunset').text(sunsetDate.toLocaleTimeString());
    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retreiving data. ")
    }
}