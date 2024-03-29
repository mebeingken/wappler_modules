// JavaScript Document

const fs = require('fs-extra');
const App = require('../../../lib/core/app');

module.exports = async (job) => {


    const app = new App({ params: job.data.jobData, session: {}, cookies: {}, signedCookies: {}, query: {}, headers: {} });
    const action = await fs.readJSON(`app/modules/lib/${job.data.action}.json`);

    return app.define(action, true);



}