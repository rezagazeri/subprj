const http = require('https');


const BaseService = require('../../../services/BaseService')

class FileService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/FileRepository')
    super(options)
  }

  getPromise(rlns) {
    return new Promise((resolve, reject) => {
      http.get(common.getConfig().file.url+rlns,{rejectUnauthorized: false}, (response) => {
        let chunks_of_data = [];

        response.on('data', (fragments) => {
          chunks_of_data.push(fragments);
        });

        response.on('end', () => {
          let response_body = Buffer.concat(chunks_of_data);
          resolve(response_body.toString());
        });

        response.on('error', (error) => {
          reject(error);
        });
      });
    });
  }

  async makeSynchronousRequest(request, res, req) {
    try {
      let http_promise = this.getPromise(request.originalUrl);
      let response_body = await http_promise;

      // holds response from server that is passed when Promise is resolved
      return response_body ;
    }
    catch(error) {
      // Promise rejected
      console.log(error);
    }
  }

}

module.exports = FileService