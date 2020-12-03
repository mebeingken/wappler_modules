// JavaScript Document
exports.write_binary = function (options) {
    //for converting file paths provided in UI
    const { toSystemPath } = require('../../../lib/core/path');

    //required for retrieving and saving file
    const http = require('https');
    const fs = require('fs');

    //convert the user local_path provided in the API action to useable in the module
    let path = toSystemPath(this.parseRequired(this.parse(options.local_path), 'string', 'fs.exists: path is required.'));

    //evaluate the data binding for remoteURL
    let remoteURL = this.parseRequired(options.file_url, 'string', 'parameter value is required.');

    //open up the stream for writing the file
    const file = fs.createWriteStream(path + '/' + options.local_file);

    //go get the file at the provided remote url
    const request = http.get(remoteURL, function (response) {
        response.pipe(file);
    });
};