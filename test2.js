function(request){
    try {
        var params = personium.parseBodyAsJSON(request);
        
        var t1 = moment(params.datetime);
        var t2 = moment.tz(params.datetime, params.timezone);
        
        params.withoutTZ = t1.toISOString();
        params.withTZ = t2.toISOString();
        
        return personium.createResponse(200, params);
    } catch(e) {
        return personium.createErrorResponse(e);
    }
}

var personium = require("personium").personium;
var moment = require("moment").moment;
moment = require("moment_timezone_with_data").mtz;