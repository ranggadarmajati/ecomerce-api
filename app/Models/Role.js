'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { v4: uuidv4 } = require('uuid');
class Role extends Model {
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

    static get computed() {
        return ['text']
    }

    getText(data) {
        return data.name;
    }

    user_roles() {
        return this.hasMany('App/Models/UserRole', 'id', 'role_id')
    }
}

module.exports = Role
