// JavaScript Document
exports.get_file_type = async function (options) {
    //determines the file type using the file-type package at https://www.npmjs.com/package/file-type
    //makes determination using the file content rather than filename extension
    //returns the mime type and extension
    
    //for converting file paths provided in UI
    const { toSystemPath } = require('../../../lib/core/path');

    //convert the user local_path provided in the API action to useable in the module
    let file_path = toSystemPath(this.parseRequired(this.parse(options.file_path), 'string', 'fs.exists: file_path is required.'));

    let file_name = this.parseRequired(options.file_name, 'string', 'parameter file_name is required.');

    let file = file_path + "/" + file_name;

    async function getExt() {
        const FileType = require('file-type');
        return await FileType.fromFile(file);
        //=> {ext: 'png', mime: 'image/png'}
    }

    return await getExt();



};

exports.write_binary = async function (options) {
    //retrieves a file via remote http request and saves the file to the local server
    //names the file using a uuid
    
    //for converting file paths provided in UI
    const { toSystemPath } = require('../../../lib/core/path');

    //uuid package
    const { v4: uuidv4 } = require('uuid');

    //required for retrieving 
    const request = require('request');

    //and saving file
    const fs = require('fs');

    //convert the user local_path provided in the API action to useable in the module
    let path = toSystemPath(this.parseRequired(this.parse(options.local_path), 'string', 'fs.exists: path is required.'));

    //evaluate the data binding for remoteURL
    let remoteURL = this.parseRequired(options.file_url, 'string', 'parameter value is required.');

    //generate uuid
    let uuid = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

    //set the filename
    let file_name = path + '/' + uuid;

    //create a promise that waits for the onclose event of the remote request
    await new Promise(resolve => {
        const download = (url, path) => {
            request.head(url, (err, res, body) => {
                request(url)
                    .pipe(fs.createWriteStream(path)) // write the response (the remote file) into the designated location on the server
                    .on('close', resolve) // resolve the promise on request close 
            })
        }

        //trigger the download
        download(remoteURL, file_name);

    });

    //return the file_name
    return { "file_name": uuid }

};

