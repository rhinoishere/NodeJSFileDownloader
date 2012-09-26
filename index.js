var server = require("./server");
var router = require("./router");
var fileDownloadHandler = require("./FileDownloader/fileDownloadHandler");

var handle = {}
handle["/downloadFile"] = fileDownloadHandler.downloadFile;

server.start(router.route, handle);