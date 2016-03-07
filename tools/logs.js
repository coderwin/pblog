var fs = require("fs");

var Log = function(fileName,content){
	if (typeof content == "object") {
		content = JSON.stringify(content);
	}
	console.log(content)
	fs.appendFile("../WBued/logsFile/"+fileName+".log", content, function(err, data) {
		console.log(arguments);
	});
};
module.exports = Log;