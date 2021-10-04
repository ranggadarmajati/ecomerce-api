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

    create(obj) {
        return this.getCreate(obj);
    }

    merge(id, obj) {
        return this.getMerge(id, obj);
    }

    delete(id) {
        return this.getDelete(id);
    }

    deleteBy(field, value) {
        return this.getDeleteBy(field, value);
    }
}

module.exports = Model;