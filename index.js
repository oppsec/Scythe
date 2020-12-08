// Dependecies
const colors = require('colors');
const prompt = require('prompt-sync')();
const got = require('got');

// Helper
const getAscii = require('./core/helper');

// Scraper
const websiteScraper = require('./core/website_scraper')


const Menu = async () => {
    console.clear();
    getAscii()
    websiteConnection()
}


const websiteConnection = async () => {
    try {
        console.time(':: Request time'.cyan)

        const websiteURLInput = prompt(":: Type the website URL (https://example.com) ~> ".yellow)
        console.log('\n')

        const response = await got(websiteURLInput)
        scytheInitializer(response, websiteURLInput)
    } catch (error) {
        console.log('::: A error happened, please verify your URL or website status.'.red);
        console.log(`::: Error: ${error.message}`.red)
    }
}


const scytheInitializer = async (response, websiteURLInput) => {

    function Data (Info, Result) {
        this.Info = Info;
        this.Result = Result;
    }

    const DataTable = {};
    const Host = new URL(websiteURLInput)

    DataTable.host = new Data("Website Hostname", `${Host.hostname}`);
    DataTable.url = new Data("Website URL", `${response.url}`);
    DataTable.ip = new Data("Website IP", `${response.ip}`);
    DataTable.sc = new Data("Status Code", `${response.statusCode}`);

    console.table(DataTable)
    console.log('\n')
    
    console.timeEnd(':: Request time'.cyan)

    websiteScraper(response, Host)

}


Menu()