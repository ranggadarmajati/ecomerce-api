'use strict'

/*
|--------------------------------------------------------------------------
| AboutSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const About = use('App/Models/About')
const Env = use('Env')
class AboutSeeder {
  async run () {
    let about = new About()
    about.content = 'This is the Ecomerce API Project. This project uses the Adonis Framework Js'
    about.image = 'about.png'
    about.image_path = 'uploads/images/about'
    about.image_url = `${Env.get('APP_URL')}/uploads/images/about/about.png`
    await about.save()
  }
}

module.exports = AboutSeeder
