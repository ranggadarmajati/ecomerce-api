'use strict'

/*
|--------------------------------------------------------------------------
| ContactSeeder
|--------------------------------------------------------------------------
|
| Make use of the Contact instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Contact = use('App/Models/Contact')
const ModelRepository = use('App/Repository/Model')
class ContactSeeder {
  async run () {
    let contact = new ModelRepository(Contact)
    let obj = {
      map_iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347864539!2d107.57311651102016!3d-6.903444341603095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1633614378821!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
      longitude: 107.5731165,
      latitude: -6.9034443,
      address: 'Bandung, Jawabarat, Indonesia',
      email: 'cs@ecomerce-api.com',
      mobile_phone: '62221234765',
      wa_no: '6285721731444',
      facebook_url: '#',
      instagram_url: '#',
      youtube_url: '#',
      tiktok_url: '#'
    }
    await contact.create(obj)
  }
}

module.exports = ContactSeeder
