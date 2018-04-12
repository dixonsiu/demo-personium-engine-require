function(request){
    try {
        var bodyAsString = request["input"].readAll();
        if (bodyAsString === "") {
            var tempBody = {
                code: "PR400-OD-0006",
                message: {
                    lang: "en",
                    value: "Request body is empty."
                }
            };
            return loadTest.personium.createResponse(400, tempBody);
        }
        var params = JSON.parse(bodyAsString);
    
        // Compare and see if unsupportd keys exist or not
        var allowedKeys = getAllowedKeys();
        loadTest.personium.setAllowedKeys(allowedKeys);
        loadTest.personium.validateKeys(params);

        params.status="success";

        return loadTest.personium.createResponse(201, params);
    } catch(e) {
        return loadTest.personium.createErrorResponse(e);
    }
}

var getAllowedKeys = function() {
    return ["a", "b", "c", "d", "e", "f", "g"];
};

var loadTest = {};
loadTest.personium = require("personium").personium;

