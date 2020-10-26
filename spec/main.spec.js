var { getStartEndCoordinates, getCityCoordinates, getCo2Emission, makeAPIRequest } = require('../main');
var config = require('../appConfig.json');

describe("validate getStartEndCoordinates, getCityCoordinates and getCo2Emission, ", function () {


    it("validate getStartEndCoordinates valid and invalid size of array ", async function (done) {
        var promise = await getStartEndCoordinates(["London", "Berlin"]);
        expect(promise.length).toBe(2);
        var promise = await getStartEndCoordinates(["London"]);
        expect(promise).toBe(false);
        var promise = await getStartEndCoordinates([]);
        expect(promise).toBe(false);
        done();
    });

    it("validate getCityCoordinates with valid and invalid city name", async function (done) {
        var value = await getCityCoordinates("Berlin");
        expect(value).toEqual([13.40732, 52.52045]);
        var value = await getCityCoordinates("London");
        expect(value).toEqual([-0.099076, 51.509648]);

        getCityCoordinates("Londoncwkcewkcnewckncwncwnew").catch(function (value) {
            expect(value).toBe("Londoncwkcewkcnewckncwncwnew location is not supported");
            done();
        })

    });

    it("validate getCo2Emission with valid and invalid coordinates", async function (done) {
        var value = await getCo2Emission([[13.40732, 52.52045], [-0.099076, 51.509648]], 27);
        expect(value).toEqual('29.74');
        var value = await getCo2Emission([[13, 52], [-0, 51]], 27);
        expect(value).toEqual('30.24');
        getCo2Emission([[13, 52], []], 27).catch(function (error) {
            console.log("error", error);
            expect(error).toBe("distance cannot be messured due to technical reason");
        });
        getCo2Emission([[], []], 27).catch(function (value) {
            expect(value).toBe("distance cannot be messured due to technical reason");
        })
        done();
    });

    it("validate makeAPIRequest with valid and invlaid URL", function(done){
        var city = "Munich";
        var url = `${config.service_url}geocode/search?api_key=${config.token}&text=${city}&layers=${config.layers}`;
        makeAPIRequest("GET", url, "body", function (error, response, body) {
            var responseBody = JSON.parse(body);
           expect(responseBody.features[0].geometry.coordinates).toEqual([ 11.544467, 48.152126 ]);
        })

        makeAPIRequest("GET", "invalidURL", "body", function (error, response, body) {
            expect(JSON.stringify(error)).toEqual('{}');
        })
        done();
    });
})
