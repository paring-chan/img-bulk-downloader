#!node
const inquirer = require('inquirer')
const fetch = require('node-fetch')
// const {JSDOM} = require("jsdom")
const puppeteer = require('puppeteer')

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

setImmediate(async () => {
    await inquirer.prompt([
        {
            message: '웹사이트 URL',
            name: 'url',
        },
        {
            message: '셀렉터',
            name: 'selector'
        }
    ]).then(async (data) => {
        console.log('페이지 접속중...')
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(data.url)
        console.log('이미지 찾는중...')

        const selector = await page.waitForSelector(data.selector)

        await autoScroll(page)

        const images = await selector.$$eval('img[src]', images => images.map(x=>x.getAttribute('src')))

        let iterator = 1
        if (!require('fs').existsSync('download')) require('fs').mkdirSync('download')
        for (const image of images) {
            let img = image
            if (img.startsWith('//')) img = 'http:' + img
            console.log(`다운로드: ${img}`)
            const res = await fetch(img).then(async x => (
                {
                    buffer: await x.buffer(),
                    headers: x.headers
                }
            ))
            require('fs').writeFileSync(require('path').join(process.cwd(), 'download', Date.now() + '.' + res.headers.get('content-type').split('/')[1]), res.buffer)
            iterator++
        }
        await browser.close()
    })
})
