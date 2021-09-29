'use strict'

/*
|--------------------------------------------------------------------------
| MasterSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Role = use('App/Models/Role')
const Color = use('App/Models/Color')
const Courier = use('App/Models/Courier')
class MasterSeeder {
  async run() {
    const colors = [
      {
        name: 'black',
        color_code: '#000000'
      },
      {
        name: 'white',
        color_code: '#FFFFFF'
      },
      {
        name: 'gray',
        color_code: '#808080'
      },
      {
        name: 'red',
        color_code: '#FF0000'
      },
      {
        name: 'maroon',
        color_code: '#800000'
      },
      {
        name: 'yellow',
        color_code: '#FFFF00'
      },
      {
        name: 'olive',
        color_code: '#808000'
      },
      {
        name: 'lime',
        color_code: '#00FF00'
      },
      {
        name: 'green',
        color_code: '#008000'
      },
      {
        name: 'lime green',
        color_code: '#32CD32'
      },
      {
        name: 'aqua',
        color_code: '#00FFFF'
      },
      {
        name: 'teal',
        color_code: '#008080'
      },
      {
        name: 'blue',
        color_code: '#0000FF'
      },
      {
        name: 'navy',
        color_code: '#000080'
      },
      {
        name: 'silver',
        color_code: '#C0C0C0'
      },
      {
        name: 'gold',
        color_code: '#FFD700'
      },
      {
        name: 'purple',
        color_code: '#800080'
      },
      {
        name: 'pink',
        color_code: '#FFC0CB'
      }
    ]

    await Color.createMany(colors)

    const couriers = [
      {
        name: 'Pos Indonesia',
        initial: 'pos',
        website: 'https://www.posindonesia.co.id',
        img_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Pos_Indonesia_logo.svg/1200px-Pos_Indonesia_logo.svg.png'
      },
      {
        name: 'Lion Parcel',
        initial: 'LION',
        website: 'lionparcel.com',
        img_url: 'https://searchlogovector.com/wp-content/uploads/2019/05/lion-parcel-logo-vector.png'
      },
      {
        name: 'Ninja Express',
        initial: 'NINJA',
        website: 'https://www.ninjaxpress.co/id-id',
        img_url: 'https://images.ctfassets.net/iu7xhxelvu8m/7l1zY2r0imZ3Ir1LEHutdd/be1e0916e43967bb69646cdc6bf832d8/nv-logo-regular-id.svg'
      },
      {
        name: 'ID Express',
        initial: 'IDE',
        website: 'https://idexpress.com',
        img_url: 'https://idexpress.com/r/cms/www/default/images/logo.png'
      },
      {
        name: 'SiCepat Express',
        initial: 'SICEPAT',
        website: 'https://www.sicepat.com',
        img_url: 'https://pluginongkoskirim.com/wp-content/uploads/2020/01/logo-main.png'
      },
      {
        name: 'SAP Express',
        initial: 'SAP',
        website: 'https://www.sap-express.id/',
        img_url: 'https://www.sap-express.id/assets/img/logo.png'
      },
      {
        name: 'Nusantara Card Semesta (NCS)',
        initial: 'ncs',
        website: 'http://ncskurir.com',
        img_url: 'http://ncskurir.com/wp-content/uploads/2018/05/LOGO-NCS-e1525624030279.png'
      },
      {
        name: 'AnterAja',
        initial: 'ANTERAJA',
        website: 'https://anteraja.id',
        img_url: 'https://anteraja.id/assets/img/Logo%20Anteraja-New-01.png'
      },
      {
        name: 'Rex Express Indonesia',
        initial: 'REX',
        website: 'https://www.rex.co.id/',
        img_url: 'https://t-2.tstatic.net/tribunnewswiki/foto/bank/images/rex-jasa-kirim.jpg'
      },
      {
        name: 'Sentral Cargo (SENTRAL)',
        initial: 'SENTRAL',
        website: 'https://sentralcargo.co.id/',
        img_url: 'https://sentralcargo.co.id/themes/sentra-cargo/assets/images/logo-small-alt.png'
      },
      {
        name: 'Jalur Nugraha Ekakurir (JNE)',
        initial: 'JNE',
        website: 'https://jne.co.id',
        img_url: 'https://www.jne.co.id/frontend/images/material/logo.jpg'
      },
      {
        name: 'Citra Van Titipan Kilat (TIKI)',
        initial: 'TIKI',
        website: 'https://www.tiki.id/id/beranda',
        img_url: 'https://www.tiki.id/images/logo.png'
      },
      {
        name: 'RPX Indonesia',
        initial: 'RPX',
        website: 'https://www.rpx.co.id/',
        img_url: 'https://www.rpx.co.id/static/images/logo.png'
      },
      {
        name: 'Pandu Logistics (PANDU)',
        initial: 'PANDU',
        website: 'https://pandulogistics.com/id/',
        img_url: 'https://pandulogistics.com/wp-content/uploads/2021/08/logo-pandulogistic2-e1629419647166.png'
      },
      {
        name: 'Wahana Logistik',
        initial: 'WAHANA',
        website: 'https://www.wahana.com/',
        img_url: 'https://www.wahana.com/uploads/logo/logo_5c49fe3908e3b.png'
      },
      {
        name: 'J&T Express',
        initial: 'jnt',
        website: 'https://jet.co.id/',
        img_url: 'https://jet.co.id/static/images/logo.png'
      },
      {
        name: 'JET Express (JET)',
        initial: 'JET',
        website: 'http://www.jetexpress.co.id/',
        img_url: 'http://www.jetexpress.co.id/Statics/images/logo.png'
      },
      {
        name: 'Pahala Express',
        initial: 'PAHALA',
        website: 'https://www.pahalaexpress.co.id/',
        img_url: 'https://firebasestorage.googleapis.com/v0/b/pahalaexpress-9cdf5.appspot.com/o/Pahala%20Express.png?alt=media&token=e741fb65-44d2-4391-85e8-879814913bfe'
      },
      {
        name: 'Solusi Ekspres (SLIS)',
        initial: 'slis',
        website: 'https://www.cekpengiriman.com',
        img_url: 'https://www.cekpengiriman.com/wp-content/uploads/2019/12/solusi-ekspres.png'
      },
      {
        name: 'Expedito',
        initial: 'expedito',
        website: 'https://www.expedito.co.id/',
        img_url: 'https://www.expedito.co.id/img/expeditologo.png'
      },
      {
        name: '21 Express',
        initial: 'dse',
        website: 'https://21express.co.id/',
        img_url: 'https://21express.co.id/assets/new-21express/images/logo.png'
      },
      {
        name: 'First Logistics (FIRST)',
        initial: 'first',
        website: 'http://www.firstlogistics.co.id/',
        img_url: 'http://www.firstlogistics.co.id/img/logo/logonew.png'
      },
      {
        name: 'Star Cargo (STAR)',
        initial: 'star',
        website: 'https://www.starcargo.co.id/',
        img_url: 'https://www.starcargo.co.id/images/logo_x.png'
      },
      {
        name: 'IDL Cargo (IDL)',
        initial: 'idl',
        website: 'http://idlcargo.co.id/',
        img_url: 'http://idlcargo.co.id/public/template/images/cropped-logo-idl-transparan.png'
      }
    ]

    await Courier.createMany(couriers)

    const roles = [
      {
        name: 'superadmin',
        initial: 'sa'
      },
      {
        name: 'admin',
        initial: 'a'
      },
      {
        name: 'customer',
        initial: 'c'
      }
    ]
    await Role.createMany(roles)

  }
}

module.exports = MasterSeeder
