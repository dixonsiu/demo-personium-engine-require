# Background  
Demonstrate how to require JavaScript in Personium Engine script.  

# How to use the require feature  
You can now use require feature to do the heavy lifting.  
Only 3 steps to add JS libraries and use it.

1. [Add two lines](https://github.com/dixonsiu/demo-personium-engine-require/commit/c6d9f34ac6c81427981dbc9523d8efe018e90f50#diff-0f36b362a0b81d6f4d4bfd8a7413c75d) to the existing library file.  
1. [Require it](https://github.com/dixonsiu/demo-personium-engine-require/blob/master/personium.js#L10) from your Engine Script.  
1. [Use the library funtion](https://github.com/dixonsiu/demo-personium-engine-require/blob/master/personium.js#L50) like normal JS.  
1. For advance user, you can [require recursively](https://github.com/dixonsiu/demo-personium-engine-require/blob/master/test.js#L34).  
For exmple, Require personium.js which internally require underscore.js

# How to deploy  
I assume you already know how to deploy a service.  

1. Create a service in you Cell.  
1. Upload all the JavaScript files into the service folder.  
1. Configure test.js as the endpoint.  

# How to test  
You can try out the CODEPEN or import the RestletClient.json to Restlet Client in Chome and execute the requests.  

1. [Parameter validation](https://codepen.io/dixonsiu/pen/wmNzrm)  
1. [Initialize Moment with timezone info](https://codepen.io/dixonsiu/pen/XYLjNK)  
Without timezone, the date with become 9am in Japan. With timezone, the date is midnight as expected.  

# Library version  
1. [moment v2.22.1](https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.js)  
1. [moment-timezone v0.5.14](https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.14/moment-timezone-with-data.js)  
1. [underscore v1.9.1](https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore.js)    
