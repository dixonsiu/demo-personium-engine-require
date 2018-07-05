function(request){
    try {
        var params = personium.parseBodyAsJSON(request);
    
        // Compare and see if unsupportd keys exist or not
        var allowedKeys = getAllowedKeys();
        personium.setAllowedKeys(allowedKeys);
        personium.validateKeys(params);

        params.status="success";

        return personium.createResponse(201, params);
    } catch(e) {
        return personium.createErrorResponse(e);
    }
}

var getAllowedKeys = function() {
    return ["a", "b", "c", "d", "e", "f", "g"];
};

var personium = require("personium").personium;

