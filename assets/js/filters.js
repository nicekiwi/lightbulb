import numeral from 'numeral';
import moment from 'moment';

export default {
  currency(value) {
    if (!value) return '';
    return numeral(value).format('$0,0.00');
  },
  currencyRaw(value) {
    if (!value) return '';
    return numeral(value).format('0,0.00');
  },
  date(value) {
    if (!value) return '';
    return moment(value).format('YYYY/MM/DD');
  },
  dateFromNow(value) {
    if (!value) return '';
    return moment(value).fromNow();
  },
  capitalize: function (value) {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
};