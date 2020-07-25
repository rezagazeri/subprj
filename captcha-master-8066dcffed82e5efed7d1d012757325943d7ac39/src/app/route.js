const Controller = require('../app/controller').Controller

class Route 
{
    constructor(app, client)
    {
        this.app = app;
        this.controller = new Controller(client);
    }

    _run()
    {
        this.app.get('/create',
            this.controller.create(this.app.req, this.app.res));

        this.app.get('/verify',
            this.controller.verify(this.app.req, this.app.res));
    }

}

module.exports = {
    Route
}