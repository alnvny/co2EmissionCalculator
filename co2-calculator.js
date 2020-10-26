var program = require('commander');
var validateParams = require('./validation');
var { getStartEndCoordinates, getCo2Emission } = require('./main');
var vehicleCo2Emissions = require('./vehicleCo2Emissions.json');
program
    .requiredOption('--start <start>', 'start location')
    .requiredOption('--end <end>', 'end location')
    .requiredOption('--transportation-method <transportation-method>', 'transportation-method')
    .action(function (options) {
        if (!validateParams(options.start, options.end, options.transportationMethod, vehicleCo2Emissions)) {
            return false;
        }
        
        //get vehicle's CO2 emission
        var vehicleCo2Emission = vehicleCo2Emissions[options.transportationMethod];

        getStartEndCoordinates([options.start, options.end]).then(function (citiesCoordinates) {
            getCo2Emission(citiesCoordinates, vehicleCo2Emission).then(function (result) {
                console.log(`Your trip caused ${result}kg of CO2-equivalent.`);
            })
                .catch(function (error) {
                    console.error("error: ", error);
                });
        })
            .catch(function (error) {
                console.error("error: ", error);
            })
    });
    
program.parse(process.argv);