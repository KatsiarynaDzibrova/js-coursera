/**
 * @param {String} date
 * @returns {Object}
 */

function format(value) {
    return value < 10 ? '0' + value : value;
}

module.exports = function (date) {
    let obj = {
        value: '2017-04-20 14:00',
        init: function(date) {
            this.value = date;
            let res = date.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/);
            this._date = new Date(res[1], res[2] - 1, res[3], res[4], res[5]);
            return this;
        },
        add: function (val, type, add=true){
            if (val < 0 && add) throw TypeError('Number must be positive');
            switch(type) {
                case 'minutes':
                    date.set = this._date.setMinutes(this._date.getMinutes() + val);
                    break;
                case 'hours':
                    date.set = this._date.setHours(this._date.getHours() + val);
                    break;
                case 'days':
                    this._date.setDate(this._date.getDate() + val);
                    break;
                case 'months':
                    this._date.setMonth(this._date.getMonth() + val);
                    break;
                case 'years':
                    this._date.setFullYear(this._date.getFullYear() + val);
                    break;
                default:
                    throw TypeError('Type not found');
            }
            this.changeValue();
            return this;
        },
        subtract: function (val, type){
            if (val < 0 ) throw TypeError('Number must be positive');
            return this.add(-val, type, false);
        },
        changeValue: function() {
            let year = this._date.getFullYear();
            let month = this._date.getMonth() + 1;
            let days = this._date.getDate();
            let hours = this._date.getHours();
            let minutes = this._date.getMinutes();
            this.value = year + '-' + format(month) + '-' + format(days) + ' ' + format(hours) + ":" + format(minutes);
        }
        };
        return obj.init(date);
};
