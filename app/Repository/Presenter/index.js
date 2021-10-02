'use strict'

class Presenter {
    constructor(model) {
        this.modelname = model;
    }

    getAll() {
        return this.modelname.all();
    }

    get(id) {
        return this.modelname.find(id);
    }

    getBy(field, value) {
        return this.modelname.findBy(field, value);
    }

    getTotalRow() {
        return this.modelname.getCount();
    }

    getQuery(req) {
        let { page, limit, orders, search } = req.all();
        let order = orders != undefined ? JSON.parse(orders) : { column: 'id', sort: 'asc' };
        return this.modelname.query().where(function () {
            if (search) {
                this.whereRaw('lower(name) like ?', '%' + `${search.toLowerCase()}` + '%')
            }
        }).orderBy(order.column, order.sort).paginate(page != undefined ? page : 1, limit != undefined ? parseInt(limit) : 10)

    }
}

module.exports = Presenter;