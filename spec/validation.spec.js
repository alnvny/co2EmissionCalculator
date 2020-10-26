var validateParams = require('../validation');
var vehicleCo2Emissions = require('../vehicleCo2Emissions.json');

describe("validate params passed to the application", function () {
    it("vlidate validateCitiesNotEmpty", function () {
        expect(validateParams("", "", "bus", vehicleCo2Emissions)).toBe(false);
        expect(validateParams("London", "", "bus", vehicleCo2Emissions)).toBe(false);
        expect(validateParams("", "London", "bus", vehicleCo2Emissions)).toBe(false);
    });
    it("validate validateInvalidCharecters", function () {
        expect(validateParams("@Lon#", "Paris", "bus", vehicleCo2Emissions)).toBe(false);
        expect(validateParams("@Lon#", "Paris$", "bus", vehicleCo2Emissions)).toBe(false);
        expect(validateParams("London", "Munich!!", "bus", vehicleCo2Emissions)).toBe(false);
    });
    it("validate validateSameCities", function () {
        expect(validateParams("London", "London", "bus", vehicleCo2Emissions)).toBe(false);
        expect(validateParams("london", "LONDON", "bus", vehicleCo2Emissions)).toBe(false);
        expect(validateParams("LONDON", "LONDON", "bus", vehicleCo2Emissions)).toBe(false);
        expect(validateParams("london", "london", "bus", vehicleCo2Emissions)).toBe(false);
    });
    it("validate validateTransportModeEmpty", function () {
        expect(validateParams("London", "London", "", vehicleCo2Emissions)).toBe(false);
    });
    it("validate validateAllowedTransportMode", function () {
        expect(validateParams("London", "London", "Tram", vehicleCo2Emissions)).toBe(false);
        expect(validateParams("London", "London", "Bike", vehicleCo2Emissions)).toBe(false);
    })
    it("validate params for valid values", function () {
        expect(validateParams("London", "Berlin", "bus", vehicleCo2Emissions)).toBe(true);
    })

});
