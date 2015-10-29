/**
 * Created by Tejas on 10/24/2015.
 */
module.exports = (function(){
	return {
		upload: function(request, response) {
        	console.log('in multipart upload');
			// require these node modules to parse multi-part forms
		    var multiparty = require('multiparty');
		    var fs = require('fs'); // isn't this included in express?
		    var util = require('util');

		    var form = new multiparty.Form();

		    form.parse(request, function(error, fields, file){
		        if (error) {
		            response.writeHead(400, {'content-type': 'text/plain'});
		            response.end("invalid request: " + error.message);
		            return;
		        }
		        console.log(file);
		        response.writeHead(200, {'content-type': 'text/plain'});
		        response.write('received fields:\n\n '+util.inspect(fields));
		        response.write('\n\n');
		        response.end('received files:\n\n '+util.inspect(file));
		    });
		}
	}
})();