VITacademics-Faculty
====================

VITacademics for Faculty

This backend is hosted [here](http://vitacademics-faculty.herokuapp.com/)

For the API Documentation, check out the [Project Wiki] (https://github.com/aneesh-neelam/VITacademics-Faculty/wiki)

Please report any bugs or issues [here] (https://github.com/aneesh-neelam/VITacademics-Faculty/issues) 

#### Instructions for Installation:
###### Install Node.js 0.10.x 
###### Install all dependencies
    $ npm install
###### Run the server locally at port 3000 or "PORT" in process.env
    $ npm start
    
#### External Requirements:
* A MongoDB instance running locally or valid "MONGOLAB_URI"/"MONGOHQ_URI" string in process.env 
* A valid "COOKIE_SECRET" string in process.env for better security (Optional)
* A valid "LOGENTRIES_TOKEN" in process.env for Logentries support (Optional)
* A valid "NEWRELIC_APP_NAME" and "NEWRELIC_LICENSE" in process.env for New Relic support (Optional)
