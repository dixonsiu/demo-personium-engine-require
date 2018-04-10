exports.personium = (function() {
    var personium = personium || {};
    var _keys = [];
    var _ = require("underscore")._;    
    
    personium.setAllowedKeys = function(tempArray) {
        _keys = tempArray;
    };
    
    personium.getAllowedKeys = function() {
        return _keys;
    };
    
    personium.getInvalidKeys = function(params) {
        var receivedKeys = _.keys(params); // Get only keys of the hash
        var allowedKeys = personium.getAllowedKeys();
        
        return (_.difference(receivedKeys, allowedKeys));
    };
    
    personium.validateKeys = function(params) {
        var invalidKeys = personium.getInvalidKeys(params);
        if (invalidKeys.length > 0) {
            var err = [
                "io.personium.client.DaoException: 400,",
                JSON.stringify({
                    "code": "PR400-OD-0014",
                    "message": {
                        "lang": "en",
                        "value": "Unknown property was appointed."
                    },
                    "data": invalidKeys
                })
            ].join("");
            throw new _p.PersoniumException(err);
        }
        return true;
    };
    
    personium.createErrorResponse = function(e) {
        if (e.code == 0) {
            return personium.createResponse(500, e.message);
        }
        return personium.createResponse(e.code, e.message);
    };
    
    personium.createResponse = function(tempCode, tempBody) {
        var isString = typeof tempBody == "string";
        var tempHeaders = isString ? {"Content-Type":"text/plain"} : {"Content-Type":"application/json"};
        return {
            status: tempCode,
            headers: tempHeaders,
            body: [isString ? tempBody : JSON.stringify(tempBody)]
        };
    };
    
    return personium;
}());
