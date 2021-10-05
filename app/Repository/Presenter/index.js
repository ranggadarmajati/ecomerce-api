'use strict'

const moment = require("moment");

const Database = use('Database');
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

    async getBy(field, value) {
        try {
            return await this.modelname.findBy(field, value); 
        } catch (error) {
            return false;
        }
        
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

    async getCreate(obj) {
        const trx = await Database.beginTransaction();
        try {
            const data = await this.modelname.create(obj, trx);
            await trx.commit();
            return data;
        } catch (error) {
            console.log("error getCreate:", error)
            await trx.rollback()
            return false;
        }
    }

    async getMerge(id, obj) {
        const trx = await Database.beginTransaction();
        try {
            let data = await this.modelname.findBy('uuid', id);
            data.merge(obj);
            await data.save(trx);
            await trx.commit();
            return data;
        } catch (error) {
            console.log("error getMerge:", error)
            await trx.rollback();
            return false;
        }
    }

    async getDelete(id) {
        const trx = await Database.beginTransaction();
        try {
            let data = await this.modelname.find(id);
            await data.delete(trx);
            await trx.commit();
            return true;
        } catch (error) {
            console.log("error getDelete:", error);
            await trx.rollback();
            return false;
        }
    }

    async getDeleteBy(field, value) {
        const trx = await Database.beginTransaction();
        try {
            let data = await this.modelname.findBy(field, value);
            await data.delete(trx);
            await trx.commit();
            return true;
        } catch (error) {
            console.log("error getDeleteBy:", error);
            await trx.rollback();
            return false;
        }
    }

    async softDelete(id) {
        const trx = await Database.beginTransaction();
        try {
            let data = await this.modelname.findBy('uuid', id);
            data.deleted_at = moment().format('YYYY-mm-dd hh:mm:ss');
            await data.save(trx);
            await trx.commit();
            return true;
        } catch (error) {
            console.log("error softDelete:", error);
            await trx.rollback();
            return false;
        }
    }
}

module.exports = Presenter;