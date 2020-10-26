var request = require('request');
var config = require('./appConfig.json');

// get the co-ordinates for all  the passed city names
// typeof param cities is array
function getStartEndCoordinates(cities) {
    if (!cities || cities.length < 2) {
        return false;
    }
    var promises = [];
    for (var city of cities) {
        promises.push(getCityCoordinates(city));
    }
    return Promise.all(promises);
}

// get the co-ordinates for a city name
// typeof param city is string
function getCityCoordinates(city) {
    return new Promise(function (resolve, reject) {
        var url = `${config.service_url}geocode/search?api_key=${config.token}&text=${city}&layers=${config.layers}`;
        makeAPIRequest("GET", url, 'body', function (error, response, body) {
            if (error) {
                if (error.message.includes('connect ETIMEDOUT')) {
                    reject(` System might be in VPN, Disconnecting the VPN might work -` + error.message);
                }
                reject(error);
            } else {
                var responseBody = JSON.parse(body);
                if (responseBody && responseBody.features[0] && responseBody.features[0].geometry) {
                    resolve(responseBody.features[0].geometry.coordinates);
                } else {
                    reject(`${responseBody.geocoding.query.text} location is not supported`)
                }
            }
        })
    })
}

// get CO2 Emiision for the passed  co-ordinates and CO2 gram
// typeof param coordinates is array
// typeof param co2Gram is number 
function getCo2Emission(coordinates, co2Gram) {
    return new Promise(function (resolve, reject) {
        url = `${config.service_url}v2/matrix/driving-car`;
        body = `{
            "locations":${JSON.stringify(coordinates)},
            "metrics":["distance"],
            "units":"km"
            }`

        makeAPIRequest("POST", url, body, function (error, response, body) {
            if (error) {
                reject(error);
            }
            var responseBody = JSON.parse(body);
            if (!responseBody.distances) {
                reject(`distance cannot be messured due to technical reason`);
            } else {
                var distance = responseBody.distances[0][1];
                var calc = (co2Gram * distance) / 1000;
                resolve(calc.toFixed(2));
            }
        })
    })
}

// a common function to make the API request
// typeof method is string
// typeof url is string
// typeof body is string
// typeof callback is function 
function makeAPIRequest(method, url, body, callback) {
    var reqConfig = {};
    reqConfig.url = url;
    reqConfig.method = method;
    if (method === "POST") {
        reqConfig.headers = {};
        reqConfig.headers.Authorization = `${config.token}`;
        reqConfig.headers["Content-Type"] = 'application/json; charset=utf-8';
        reqConfig.body = body;
    }
    request(reqConfig, callback)
}

module.exports = {
    getStartEndCoordinates: getStartEndCoordinates,
    getCityCoordinates: getCityCoordinates,
    getCo2Emission: getCo2Emission,
    makeAPIRequest: makeAPIRequest
};

