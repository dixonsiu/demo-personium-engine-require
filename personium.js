exports.personium = (function() {
    var personium = personium || {};
    var _keys = [];
    var _unitAdminInfo = {};
    var _appCellAdminInfo = {
        cellUrl : "***",
        userId : "***",
        password: "***" 
    };
    var _ = require("underscore")._;    
    
    personium.setUnitAdminInfo = function(tempInfo) {
        _unitAdminInfo =  {
            unitUrl: tempInfo.targetUnitUrl,
            cellUrl: tempInfo.targetUnitUrl + tempInfo.targetUnitAdminCellName + '/',
            accountName: tempInfo.targetUnitAdminAccountName,
            accountPass: tempInfo.targetUnitAdminAccountPassword
        };
    };

    personium.getUnitAdminInfo = function() {
        return _unitAdminInfo;
    };

    personium.setAppCellAdminInfo = function(tempInfo) {
        _appCellAdminInfo = tempInfo;
    };

    personium.getAppCellAdminInfo = function() {
        return _appCellAdminInfo;
    };

    personium.getUserCell = function(accInfo, cellname) {
        return _p.as(accInfo).cell(cellname);
    };

    personium.getUserCellMainBox = function(accInfo, cellname){
        return _p.as(accInfo).cell(cellname).box("__");
    };
    
    personium.setAllowedKeys = function(tempArray) {
        _keys = tempArray;
    };
    
    personium.getAllowedKeys = function() {
        return _keys;
    };
    
    personium.validateKeys = function(params) {
        var invalidParams = _.omit(params, _keys);
        if (_.isEmpty(invalidParams)) {
            return true;
        } else {
            var invalidKeys = _.keys(invalidParams);
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
    };
    
    /*
     * There is no way to differentiate system error or Personium Exception.
     * Therefore, we try to check if e.message is JSON (Personium Exception) or not.
     */
    personium.createErrorResponse = function(e) {
        var tempErrorCode = e.code;
        // System error
        if (_.isError(e)) {
            return personium.createResponse(500, e);
        }

        var tempErrorMessage;
        try {
            // Convert to JSON so that response header can be properly configured ("Content-Type":"application/json").
            tempErrorMessage = JSON.parse(e.message);
        } catch(e) {
            tempErrorMessage = e.message;
        }
        if (_.isUndefined(tempErrorCode) || _.isNull(tempErrorCode) || tempErrorCode == 0) {
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
