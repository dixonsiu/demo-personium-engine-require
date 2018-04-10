function(request){
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
    var receivedKeys = loadTest._.keys(params); // Get only keys of the hash
    var allowedKeys = getAllowedKeys();
    
    // Compare and see if unsupportd keys exist or not
    if (loadTest._.difference(receivedKeys, allowedKeys).length > 0) {
        var tempBody = {
            code: "PR400-OD-0014",
            message: {
                lang: "en",
                value: "Unknown property was appointed."
            }
        };
        return loadTest.personium.createResponse(400, tempBody);
    }
    
    params.status="success";

    return loadTest.personium.createResponse(201, params);
}

var getAllowedKeys = function() {
    return ["a", "b", "c", "d", "e", "f", "g"];
};

var loadTest = {};
loadTest._ = require("underscore")._;
loadTest.personium = require("personium").personium;

