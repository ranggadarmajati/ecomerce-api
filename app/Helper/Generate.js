'use strict'
var randomstring = require('randomstring')
class Generate{
    trans_no(user_id){
        let a = randomstring.generate({
            length: 4,
            charset: 'alphabetic'
        });
        var date = new Date()
        var month = date.getMonth()
        var year = date.getFullYear()
        var year_string = year.toString()
        let id = user_id
        let trans_no = 'trx-'+a+id+month+year_string.substr(2, 2)
        return trans_no
    }

    activationKey(){
        let a = randomstring.generate({
            length: 100,
            charset: 'alphabetic'
        });
        var date = new Date()
        var month = date.getMonth()
        var year = date.getFullYear()
        var year_string = year.toString()
        let result = month+a+year_string.substr(2, 2)
        return result
    }

    reqid(){
        let a = randomstring.generate({
            length: 8,
            charset: 'alphabetic'
        });
        var date = new Date()
        var month = date.getMonth()
        var year = date.getFullYear()
        var year_string = year.toString()
        let result = month+a+year_string.substr(2, 2)
        return result
    }

    reqMsgId(){
        let a = randomstring.generate({
            length: 7,
            charset: 'numeric'
        });
        let b = randomstring.generate({
            length: 8,
            charset: 'alphabetic'
        });
        let c = randomstring.generate({
            length: 7,
            charset: 'numeric'
        });
        let result = a+b+c
        return result
    }

    numericGenerate(){
        return randomstring.generate({
            length:6,
            charset:'numeric'
        })
    }

    passwordGenerate(){
        const special_characters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
        let one_index = randomstring.generate({
            length:1,
            charset:'numeric'
        })
        let two_index = randomstring.generate({
            length:1,
            charset:'numeric'
        })
        let one = randomstring.generate({
            length:2,
            charset:'numeric'
        })
        let two = randomstring.generate({
            length:4,
            charset:'alphabetic'
        })
        let three =  randomstring.generate({
            length:2,
            charset:'numeric'
        })
        let sc_1 = special_characters[one_index]
        let sc_2 = special_characters[two_index]
        let result = one+sc_1+two+sc_2+three
        return result
    }
}

module.exports = new Generate