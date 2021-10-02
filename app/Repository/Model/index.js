'use strict'
const Presenter = use('App/Repository/Presenter')
class Model extends Presenter {
    constructor(brand, req) {
        super(brand);
        this.request = req;
    }
    
    showAll() {
        return this.getAll();
    }

    show(id) {
        return this.get(id);
    }

    showBy(field, value) {
        return this.getBy(field, value);
    }

    showTotalRow() {
        return this.getTotalRow();
    }

    showQuery(request) {
        return this.getQuery(request);
    }
}

module.exports = Model;