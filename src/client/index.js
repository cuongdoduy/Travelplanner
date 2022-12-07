import './styles/style.scss'
import './styles/invalid.scss'
import { handleSubmit } from './js/app.js'
import {CountDates} from './js/CountDates.js'
Validator({
form:'#form-1',
 rules:[
Validator.isRequired('#place'),
Validator.pickerDay('#planday'),
Validator.checkDay('#planday')
        ]});
        import {Validator} from './js/validator.js'
window.Validator=Validator;
handleSubmit();

