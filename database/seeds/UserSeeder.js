'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')
const User = use('App/Models/User')
const UserRole = use('App/Models/UserRole')
const Role = use('App/Models/Role')
class UserSeeder {
  async run() {
    const trx = await Database.beginTransaction()
    try {
      // superadmin
      const superadmin = new User()
      superadmin.name = 'superadmin'
      superadmin.mobile_phone = '6285938498394'
      superadmin.email = 'superadmin@mailinator.com'
      superadmin.password = 'superadmin123!'
      await superadmin.save(trx)
      let role = await Role.findBy('initial', 'sa')
      const user_role = new UserRole()
      user_role.role_id = role.id
      await superadmin.user_roles().save(user_role, trx)

      // admin
      const admin = new User()
      admin.name = 'admin'
      admin.mobile_phone = '6285721731476'
      admin.email = 'admin@mailinator.com'
      admin.password = 'admin123!'
      await admin.save(trx)
      let roleadmin = await Role.findBy('initial', 'a')
      const admin_role = new UserRole()
      admin_role.role_id = roleadmin.id
      await admin.user_roles().save(admin_role, trx)

      // customer
      const customer = new User()
      customer.name = 'customer'
      customer.mobile_phone = '6285721731477'
      customer.email = 'customer@mailinator.com'
      customer.password = 'customer123!'
      await customer.save(trx)
      let rolecustomer = await Role.findBy('initial', 'c')
      const customer_role = new UserRole()
      customer_role.role_id = rolecustomer.id
      await customer.user_roles().save(customer_role, trx)

      await trx.commit()
    } catch (error) {
      console.log(error)
      await trx.rollback()
    }
  }
}

module.exports = UserSeeder
