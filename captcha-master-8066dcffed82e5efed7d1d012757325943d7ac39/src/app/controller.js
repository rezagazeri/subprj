const captchapng = require('captchapng');
const md5 = require('md5');

class Controller
{
    constructor(client) 
    {
        this.client = client;
    }

    create()
    {   
        return (req, res) => {  
            const number = parseInt(Math.random()*9000+1000);        
            const p = new captchapng(80,30,number); // width,height,numeric captcha
            p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
            p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    
            const img = p.getBase64();
            const imgbase64 = new Buffer(img,'base64');

            this.client.set(`captcha:${number}`, JSON.stringify({id: md5(imgbase64)}));
            this.client.expireat(`captcha:${number}`, 60 * 15);

            res.status(200);
            res.json({data: {image: imgbase64, id: md5(imgbase64)}});
        }
   
    }

    verify()
    {
        return (req, res) => {
            const id = req.query.id;
            const value = req.query.value;
            
            this.client.get(`captcha:${value}`, (err, data) => {
                let error = false;

                if (err || !data) error = true;

                if (data && data.id != id) error = true;

                try {
                    if (error) throw new Error;
    
                    res.status(200);
                    res.json({message: 'It\'s Ok.'});
                } catch (error) {
                    res.status(422);
                    res.json({message: 'Invalid data.'});
                }
            });
        }
    }
}

module.exports = {
    Controller
}