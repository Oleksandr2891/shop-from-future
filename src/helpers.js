import Handlebars from 'handlebars';
import { __ } from './js/functions';

Handlebars.registerHelper('__', str => __(str));

Handlebars.registerHelper('isSelectedSales', (name) => {
    return name === "sales";
});


export default Handlebars;