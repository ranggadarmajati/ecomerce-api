'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { v4: uuidv4 } = require('uuid');

class Category extends Model {
    static boot() {
        super.boot()

        /**
         * A hook to generate uuid before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (FieldInstance) => {
            if (!FieldInstance.uuid) {
                FieldInstance.uuid = uuidv4();
            }
        })
    }

    product_categories() {
        return this.hasMany('App/Models/ProductCategory', 'id', 'category_id')
    }

    static scopeHasCategory(query, request){
        let { search } = request.all()
        return query.where(function(){
            if (search) {
                this.whereRaw('lower(name) like ?', '%' + `${search.toLowerCase()}` + '%')
            }
        })
    }

}

module.exports = Category
