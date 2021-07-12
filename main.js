#!node
const inquirer = require('inquirer')
// const fetch = require('node-fetch')
// const {JSDOM} = require("jsdom")
const puppeteer = require('puppeteer')

setImmediate(async () => {
    await inquirer.prompt([
        {
            message: '웹사이트 URL',
            name: 'url',
        },
        {
            message: '셀렉터',
            name: 'selector'
        },
        {
            message: 'prefix',
            name: 'prefix',
            default: ''
        }
    ]).then(async (data) => {
        // const res = await fetch(data.url).then(x => x.text())
        // const dom = new JSDOM(null, {
        //     url: data.url,
        //     runScripts: 'outside-only'
        // })
        // dom.window.addEventListener('DOMContentLoaded', () => {
        //     const images = Array.from(dom.window.document.querySelectorAll(data.selector)).map(x => Array.from(x.querySelectorAll('img')).map(x => x.src))
        //     console.log(images)
        //     // let iterator = 1
        //     // if (!require('fs').existsSync('download')) require('fs').mkdirSync('download')
        //     // for (const value of images) {
        //     //     for (const image of value) {
        //     //         let img = image
        //     //         if (image.startsWith('//')) img = 'http:' + image
        //     //         console.log(`Downloading: ${img}`)
        //     //         const buffer = await fetch(img).then(x => x.buffer())
        //     //         require('fs').writeFileSync(require('path').join(process.cwd(), 'download', data.prefix + iterator + '.' + img.split('.').pop()), buffer)
        //     //         iterator++
        //     //     }
        //     // }
        // })
    })
})
