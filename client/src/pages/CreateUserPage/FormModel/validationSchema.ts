import * as Yup from 'yup';
import moment from 'moment';
import formModel from './formModel';
const {
    formField: { firstName, lastName, role, phone, middleName, address1, city, zipcode, country, nameOnCard, cardNumber, expiryDate, cvv },
} = formModel;

const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

export default [
    Yup.object().shape({
        [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
        [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
        [phone.name]: Yup.string()
            .required(`${phone.requiredErrorMsg}`)
            .matches(/^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s-]?[0-9]{2}[\s\\-]?[0-9]{2}$/, phone.validateErrorMsg),
        // [address1.name]: Yup.string().required(`${address1.requiredErrorMsg}`),
        // [city.name]: Yup.string()
        //   .nullable()
        //   .required(`${city.requiredErrorMsg}`),
        // [zipcode.name]: Yup.string()
        //   .required(`${zipcode.requiredErrorMsg}`),
        // [country.name]: Yup.string()
        //   .nullable()
        //   .required(`${country.requiredErrorMsg}`)
    }),
    Yup.object().shape({
        [role.name]: Yup.array().required(`${role.requiredErrorMsg}`),
        // [cardNumber.name]: Yup.string()
        //   .required(`${cardNumber.requiredErrorMsg}`)
        //   .matches(visaRegEx, cardNumber.invalidErrorMsg),
        // [expiryDate.name]: Yup.string()
        //   .nullable()
        //   .required(`${expiryDate.requiredErrorMsg}`)
        //   .test('expDate', expiryDate.invalidErrorMsg, val => {
        //     if (val) {
        //       const startDate = new Date();
        //       const endDate = new Date(2050, 12, 31);
        //       if (moment(val, moment.ISO_8601).isValid()) {
        //         return moment(val).isBetween(startDate, endDate);
        //       }
        //       return false;
        //     }
        //     return false;
        //   }),
        // [cvv.name]: Yup.string()
        //   .required(`${cvv.requiredErrorMsg}`)
    }),
];
