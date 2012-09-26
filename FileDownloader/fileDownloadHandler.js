var fs = require('fs');
var exec = require("child_process").exec;
var mime = require('mime');
var url = require('url');

var fileName;
var filePath;
var mimetype;

function downloadFile(request, response) {
    console.log("Request handler 'downloadFile' was called.");

    // use exec so that this handler is non-blocking
    exec(getFileInfo(request), function(error, stdout, stderr) {
        console.log("Have set file info, starting download...");

        response.setHeader('Content-disposition', 'attachment; filename=' + fileName);
        response.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(filePath);
        filestream.on('data', function(chunk) {
            response.write(chunk);
            console.log("Have set file info, starting download...");
        });
        filestream.on('end', function() {
            response.end();
        }
    );

    });
}

function getFileInfo(request) {
    fileName = url.parse(request.url, true).query.file;
    console.log("File Name: " + fileName);

    filePath = __dirname + "/Files/" + fileName;
    console.log("File Path: " + filePath);

    mimetype = mime.lookup(fileName);
    console.log("Mime Type: " + mimetype);
}

exports.downloadFile = downloadFile;