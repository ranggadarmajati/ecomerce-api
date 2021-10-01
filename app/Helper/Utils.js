
'use strict'
const Database = use('Database')
class Utils {
    replacePhoneNumber(value) {
        String.prototype.replaceAt = function (index, replacement) {
            return this.substr(0, index) + replacement + this.substr(index + replacement.length);
        }
        return '6' + value.replaceAt(0, "2");
    }
}

module.exports = new Utils