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
    
    /*
     * There is no way to differentiate system error or Personium Exception.
     * Therefore, we try to check if e.message is JSON (Personium Exception) or not.
     */
    personium.createErrorResponse = function(e) {
        var tempErrorCode = e.code;
        var tempErrorMessage;
        try {
            // Convert to JSON so that response header can be properly configured ("Content-Type":"application/json").
            tempErrorMessage = JSON.parse(e.message);
        } catch(e) {
            tempErrorMessage = e.message;
        }
        if (tempErrorCode == 0) {
            return personium.createResponse(500, tempErrorMessage);
        }
        return personium.createResponse(tempErrorCode, tempErrorMessage);
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
