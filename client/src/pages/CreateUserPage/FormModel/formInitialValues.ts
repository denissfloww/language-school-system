import formModel from './formModel';
const {
    formField: {
        firstName,
        lastName,
        middleName,
        role,
        address1,
        city,
        zipcode,
        country,
        useAddressForPaymentDetails,
        nameOnCard,
        cardNumber,
        expiryDate,
        cvv,
    },
} = formModel;

export default {
    [firstName.name]: '',
    [lastName.name]: '',
    [address1.name]: '',
    [city.name]: '',
    [zipcode.name]: '',
    [country.name]: '',
    [useAddressForPaymentDetails.name]: false,
    [nameOnCard.name]: '',
    [cardNumber.name]: '',
    [expiryDate.name]: '',
    [cvv.name]: '',
    [middleName.name]: '',
    [role.name]: '',
};
