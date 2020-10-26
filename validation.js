function validateParams(start, end, transportationMethod, data){
    if(!validateCitiesNotEmpty(start,end)){
        return false;
    }else if(!validateInvalidCharecters(start, end)){
        return false;
    }else if(!validateSameCities(start, end)){
        return false;
    }else if(!validateTransportModeEmpty(transportationMethod)){
        return false
    }else if(!validateAllowedTransportMode(data, transportationMethod)){
        return false;
    }
    return true;
}

function validateCitiesNotEmpty(start, end){
    if(!start){
        console.error(`error: start location cannot be empty`);
        return false;
    }else if(!end){
        console.error(`error: end location cannot be empty`);
        return false;
    }
    return true;
}

function validateInvalidCharecters(start,end){
    var invalidCharactersPattern = new RegExp('[/\\\\:*?@#$%!{}(),.+~"<>|]');
    if(invalidCharactersPattern.test(start)){
        console.error(`error: start location has invalid charecters in pattern ${invalidCharactersPattern}`);
        return false;
    }else if(invalidCharactersPattern.test(end)){
        console.error(`error: end location has invalid charecters  in pattern ${invalidCharactersPattern}`);
        return false;
    }
    return true
}

function validateSameCities(start, end){
    if(start.toUpperCase() === end.toUpperCase()){
        console.error(`Your trip caused 0kg of CO2-equivalent.`)
        return false;
    }
     return true;
}

function validateTransportModeEmpty(transportationMethod){
    if(!transportationMethod){
        console.error(`error: transportation-method  cannot be empty`);
        return false;
    }
    return true;
}

function validateAllowedTransportMode(data,transportationMethod){
    if(!data[transportationMethod]){
        console.error(`error: ${transportationMethod } transportation-method is not supported`);
        return false;
    }
    return true;
}

module.exports = validateParams;