const captchapng = require('captchapng');
const md5 = require('md5');

class CaptchaService  {
    async create(client) {
        // Set number and create image
        const number = parseInt(Math.random() * 90000 + 10000);
        const p = new captchapng(100, 40, number); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

        // Set image as base64 and Buffer it
        const img = p.getBase64()
        const imgbase64 = new Buffer.from(img, 'base64')
        const id = md5(imgbase64)
        const redisKey = 'captcha_' + id;
        const redisValue = JSON.stringify({number: number})

        // Set redis key
        await client.set(redisKey, redisValue);
        await client.expireat(redisKey, parseInt((+new Date)/1000) + 600);
        console.log(redisKey)

        // ToDo : remove value after check
        return {value: number, id: id, image: img}
    }

    async verify(client, id, value) {
        // Set redis key
        let status = false
        const redisKey = 'captcha_' + id;

        const redis_result =  await client.getAsync(redisKey);
        console.log("redis_result")
        console.log(redis_result)
        console.log(value)
        if (redis_result===null) {
            return false;
        }

        const dataObj = JSON.parse(redis_result)
        if (dataObj.number == value) {

            // Delete key
            client.del(redisKey);

            return true;
        } else {
            return false;
        }
    }
}

module.exports = CaptchaService