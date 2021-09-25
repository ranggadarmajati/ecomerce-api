const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    const Database = use('Database')
    Database.on('query', (item) => {
        let logger
        if (item.sql === 'BEGIN;' || item.sql === 'COMMIT;') {
            logger = {
                query: item.sql
            }
        } else {
            logger = {
                queryUid: item.__knexQueryUid,
                method: item.method,
                value: item.bindings,
                query: item.sql
            }
        }
        console.log(logger)
    });

    const Response = use('Adonis/Src/Response')
    Response.macro('Wrapper', function (code = 200, status = true, message = "", contents = null || {} || []) {
        let data = {
            'code':code,
            'status':status,
            'message':message,
            'contents':contents
        }
        this.status(code).send(data)
    })
});

hooks.after.providersRegistered(() => {
    // execute your code
});