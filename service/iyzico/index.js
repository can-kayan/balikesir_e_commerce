import Iyzipay from "iyzipay";
import * as Cards from "./methods/cards";
import * as Installments from "./methods/installmetns" 
import * as Payments from "./methods/payments"
import nanoid from "../../utils/nanoid";
import * as Logs from "../../utils/logs"
import * as  PaymentThreeDs from "./methods/threeds-payment"
import * as Checkouts from "./methods/checkout"
import * as CancelPayments from "./methods/cancel-payments"
import * as RefundPayments from "./methods/refund-payments"

/*------------------------------- 
CARDS
------------------------------- */
const createUserAndCards=()=>{
    Cards.createUserCard({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        email:"email@email.com",
        externalId:nanoid(),
        card:{
            cardAlias:"Kredi kartım",
            cardHolderName:"John Doe",
            cardNumber:"5528790000000008",
            expireMonth:"12",
            expireYear:"2030"
        }
    }).then((result)=>{
        console.log(result)
        Logs.logFile("1-cards-kullanıcı-ve-kart-oluştur",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("1-cards-kullanıcı-ve-kart-oluştur-hata",err)
    })
}
// createUserAndCards();

//Bir kullanıcıya yeni bir kart ekleme

const createCardForUser=()=>{
    Cards.createUserCard({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        email:"email@email.com",
        externalId:nanoid(),
        cardUserKey: "WduMAWzpich2GkRGPJA744NYxP8=",
        card:{
            cardAlias:"Kredi kartım",
            cardHolderName:"John Doe",
            cardNumber:"5528790000000008",
            expireMonth:"12",
            expireYear:"2030"
        }
    }).then((result)=>{
        console.log(result)
        Logs.logFile("2-cards-bir-kullanıcıya-card-ekle",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("2-cards-bir-kullanıcıya-card-ekle-hata",err)
    })
}
// createCardForUser()

//Bir kullanıcının kartlarını oku
const readCardsOfUser=()=>{
    Cards.getUserCards({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        cardUserKey: "WduMAWzpich2GkRGPJA744NYxP8=",
    }).then((result)=>{
        console.log(result)
        Logs.logFile("3-bir-kullanıcının-kartlarını-oku",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("3-bir-kullanıcının-kartlarını-oku-hata",err)
    })
}
// readCardsOfUser()
//Bir kullanıcının bir kartını sil
const deleteCardOfUser=()=>{
    Cards.deleteUserCard({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        cardUserKey: "WduMAWzpich2GkRGPJA744NYxP8=",
        cardToken:"SnpXmh7v1X9s/2OlNN+AhXyvC2s="
    }).then((result)=>{
        console.log(result)
        Logs.logFile("4-bir-kullanıcının-kartını-sil",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("4-bir-kullanıcının-kartını-sil-hata",err)
    })
}
// deleteCardOfUser()



/*------------------------------- 
INSTALLMENTS
------------------------------- */

//Bir kart ve ücretle ilgili gerçekleşebilecek taksitlerin kontrolü
const checkInstallments=()=>{
    return Installments.checkInstallment({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        binNumber:"55287900",
        price:"1000"
    }).then((result)=>{
        console.log(result)
        Logs.logFile("5-installment-bir kart-ve-ucret-taksit-kontrolu",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("5-installment-bir kart-ve-ucret-taksit-kontrolu-hata",err)
    })
}
// checkInstallments()


/*------------------------------- 
Normal Payments
------------------------------- */

//kayıtlı olmayan kartla ödeme yapmak ve kartı kaydetmek

const createPayment=()=>{
    return Payments.createPayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        binNumber:"55287900",
        price:"400",
        paidPrice:"400",
        currency:Iyzipay.CURRENCY.TRY,
        installment:"1",
        basketId:"B67JD5",
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard:{
            cardHolderName:"John Doe",
            cardNumber:"5528790000000008",
            expireMonth:"12",
            expireYear:"2030",
            cvc:'123',
            registerCard:"0"
        },
        buyer:{
            id:"fsdfsdf",
            name:"jhon",
            surname:"doe",
            gsmNumber:"+905530000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-05 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        billingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung s20",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
            {
                id:"BT101",
                name:"Iphone",
                category1:"Telefon",
                caategory2:"IOS",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:200
            },
            {
                id:"BT101",
                name:"Samsung a31",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
        ]
    }).then((result)=>{
        console.log(result)
        Logs.logFile("6-yeni-bir-kartla-ödeme-al-ve-kartı-kaydetme",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("6-yeni-bir-kartla-ödeme-al-ve-kartı-kaydetme-hata",err)
    })
}
// createPayment()
//Bir kredi kartı ile ödeme yap kartı kaydet
const createPaymentAndSaveCard=()=>{
    return Payments.createPayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        binNumber:"55287900",
        price:"400",
        paidPrice:"400",
        currency:Iyzipay.CURRENCY.TRY,
        installment:"1",
        basketId:"B67JD5",
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard:{
            cardUserKey: "WduMAWzpich2GkRGPJA744NYxP8=",
            cardAlias:"Kredi Kartı ödeme sonrası",
            cardHolderName:"John Doe",
            cardNumber:"5528790000000008",
            expireMonth:"12",
            expireYear:"2030",
            cvc:'123',
            registerCard:"1"
        },
        buyer:{
            id:"fsdfsdf",
            name:"jhon",
            surname:"doe",
            gsmNumber:"+905530000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-05 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        billingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung s20",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
            {
                id:"BT101",
                name:"Iphone",
                category1:"Telefon",
                caategory2:"IOS",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:200
            },
            {
                id:"BT101",
                name:"Samsung a31",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
        ]
    }).then((result)=>{
        console.log(result)
        Logs.logFile("7-yeni-bir-kartla-ödeme-al-ve-kartı-kaydet",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("7-yeni-bir-kartla-ödeme-al-ve-kartı-kaydet-hata",err)
    })
}
// createPaymentAndSaveCard()


//Bir kayıtlı kart ile ödeme yap kartı kaydet
const createPaymentWithSavedCard=()=>{
    return Payments.createPayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        binNumber:"55287900",
        price:"400",
        paidPrice:"400",
        currency:Iyzipay.CURRENCY.TRY,
        installment:"1",
        basketId:"B67JD5",
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard:{
            cardUserKey: "WduMAWzpich2GkRGPJA744NYxP8=",
            cardToken:"ZLazVRgIZNc8eL713ppt17zhDJg="
        },
        buyer:{
            id:"fsdfsdf",
            name:"jhon",
            surname:"doe",
            gsmNumber:"+905530000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-05 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        billingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung s20",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
            {
                id:"BT101",
                name:"Iphone",
                category1:"Telefon",
                caategory2:"IOS",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:200
            },
            {
                id:"BT101",
                name:"Samsung a31",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
        ]
    }).then((result)=>{
        console.log(result)
        Logs.logFile("8-kayıtlı-bir-kartla-ödeme-yap",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("8-kayıtlı-bir-kartla-ödeme-yap-hata",err)
    })
}
// createPaymentWithSavedCard()

    /*------------------------------- 
ThreeDS Payments
------------------------------- */

//kayıtlı olmayan kartla ödeme yapmak ve kartı kaydetmek

const initializeThreeDSPayment=()=>{
    PaymentThreeDs.initializePayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        binNumber:"55287900",
        price:"400",
        paidPrice:"400",
        currency:Iyzipay.CURRENCY.TRY,
        installment:"1",
        basketId:"B67JD5",
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl:"https://localhost/api/payment/3ds/complate",
        paymentCard:{
            cardHolderName:"John Doe",
            cardNumber:"5528790000000008",
            expireMonth:"12",
            expireYear:"2030",
            cvc:'123',
            registerCard:"0"
        },
        buyer:{
            id:"fsdfsdf",
            name:"jhon",
            surname:"doe",
            gsmNumber:"+905530000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-05 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        billingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung s20",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
            {
                id:"BT101",
                name:"Iphone",
                category1:"Telefon",
                caategory2:"IOS",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:200
            },
            {
                id:"BT101",
                name:"Samsung a31",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
        ]
    }).then((result)=>{
        console.log(result)
        Logs.logFile("9-3d-yeni-bir-kartla-ödeme-al-3d",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("9-3d-yeni-bir-kartla-ödeme-al-3d-hata",err)
    })
}

// initializeThreeDSPayment()

const completeThreeDSPayment=()=>{
    PaymentThreeDs.complatePayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        paymentId:"21188646",
        conversationData:"conversation data"
    }).then((result)=>{
        console.log(result)
        Logs.logFile("10-threeds-payments-odeme-tamamla",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("10-threeds-payments-odeme-tamamla-hata",err)
    })
}
// completeThreeDSPayment()


//threeds ödemesini kayıtlı kartla gerçekleştir
const initializeThreedsPaymentWithRegisteredCard=()=>{
    PaymentThreeDs.initializePayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        binNumber:"55287900",
        price:"400",
        paidPrice:"400",
        currency:Iyzipay.CURRENCY.TRY,
        installment:"1",
        basketId:"B67JD5",
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl:"https://localhost/api/payment/3ds/complate",
        paymentCard:{
            cardUserKey:"WduMAWzpich2GkRGPJA744NYxP8=",
            cardToken:"TpxRRDynhu3fJ3J7YPvs2jJjZ90="
        },
        buyer:{
            id:"fsdfsdf",
            name:"jhon",
            surname:"doe",
            gsmNumber:"+905530000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-05 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        billingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung s20",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
            {
                id:"BT101",
                name:"Iphone",
                category1:"Telefon",
                caategory2:"IOS",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:200
            },
            {
                id:"BT101",
                name:"Samsung a31",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
        ]
    }).then((result)=>{
        console.log(result)
        Logs.logFile("11-threeds-kayıtlı-bir-kart",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("11-threeds-kayıtlı-bir-kart-hata",err)
    })
}
// initializeThreedsPaymentWithRegisteredCard()


const initializeThreedsPaymentWwithNewCardAndRegister=()=>{
    PaymentThreeDs.initializePayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        binNumber:"55287900",
        price:"400",
        paidPrice:"400",
        currency:Iyzipay.CURRENCY.TRY,
        installment:"1",
        basketId:"B67JD5",
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl:"https://localhost/api/payment/3ds/complate",
        paymentCard:{
            cardUserKey: "WduMAWzpich2GkRGPJA744NYxP8=",
            cardAlias:"Kredi Kartı threeds ödeme sonrası",
            cardHolderName:"John Doe",
            cardNumber:"5528790000000008",
            expireMonth:"12",
            expireYear:"2030",
            cvc:'123',
            registerCard:"1"
        },
        buyer:{
            id:"fsdfsdf",
            name:"jhon",
            surname:"doe",
            gsmNumber:"+905530000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-05 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        billingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung s20",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
            {
                id:"BT101",
                name:"Iphone",
                category1:"Telefon",
                caategory2:"IOS",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:200
            },
            {
                id:"BT101",
                name:"Samsung a31",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
        ]
    }).then((result)=>{
        console.log(result)
        Logs.logFile("12-threeds-yeni-kart-ile-odeme-ve-kartı-kaydetme",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("12-threeds-yeni-kart-ile-odeme-ve-kartı-kaydetme-hata",err)
    })
}
// readCardsOfUser()
// initializeThreedsPaymentWwithNewCardAndRegister()

/*------------------------------- 
checkout form
------------------------------- */
//checkout form içerisinde ödeme başlat

const initializeCheckoutForm=()=>{
    Checkouts.initialize({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        binNumber:"55287900",
        price:"400",
        paidPrice:"400",
        currency:Iyzipay.CURRENCY.TRY,
        installment:"1",
        basketId:"B67JD5",
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl:"https://localhost/api/payment/3ds/complate/payment",
        enabledInstallments:[1,2,3,6,9],
        buyer:{
            id:"fsdfsdf",
            name:"jhon",
            surname:"doe",
            gsmNumber:"+905530000000",
            email:"email@email.com",
            identityNumber:"743008664791",
            lastLoginDate:"2020-10-05 12:43:35",
            registrationDate:"2020-10-05 12:43:35",
            registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            ip: "85.34.78.112",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34732"
        },
        shippingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        billingAddress: {
            contactName: "Jane Doe",
            city: "Istanbul",
            country: "Turkey",
            address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
            zipCode: "34742"
        },
        basketItems:[
            {
                id:"BT101",
                name:"Samsung s20",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
            {
                id:"BT101",
                name:"Iphone",
                category1:"Telefon",
                caategory2:"IOS",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:200
            },
            {
                id:"BT101",
                name:"Samsung a31",
                category1:"Telefon",
                caategory2:"Android",
                itemType:Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price:100
            },
        ]
        
    }).then((result)=>{
        console.log(result)
        Logs.logFile("13-checkot-form-payments",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("13-checkot-form-payments-hata",err)
    })
}
// initializeCheckoutForm()

//tamamlanmış/tamamlanmamış ödeme bilgisini göster
const getFormPayment=()=>{
    Checkouts.getFormPayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        token:'45da3dba-3600-4525-931f-8eba23c16373'
    }).then((result)=>{
        console.log(result)
        Logs.logFile("14-checkot-form-payments-get-details",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("14-checkot-form-payments-get-details-hata",err)
    })
}
// getFormPayment()
/*------------------------------- 
Cancel payments
------------------------------- */
//ödeme iptal etme
const cancelPayments=()=>{
    CancelPayments.cancelPayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        paymentId:"21188743",
        ip:"85.34.78.112"
    }).then((result)=>{
        console.log(result)
        Logs.logFile("15-cancel-payments",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("15-cancel-payments-hata",err)
    })
}
// cancelPayments() 
const cancelPaymentsWithReason=()=>{
    CancelPayments.cancelPayment({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        paymentId:"21188636",
        ip:"85.34.78.112",
        reason:Iyzipay.REFUND_REASON.BUYER_REQUEST,
        description:'Kullanıcı isteği ile iptal edildi'
    }).then((result)=>{
        console.log(result)
        Logs.logFile("16-cancel-payments-reason",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("16-cancel-payments-reason-hata",err)
    })
}
// cancelPaymentsWithReason() 

/*------------------------------- 
Refund payments
------------------------------- */
const refundPayment=()=>{
    RefundPayments.refundPayments({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        paymentTransactionId:"23136795",
        price:"30",
        ip:"85.34.78.112"
    }).then((result)=>{
        console.log(result)
        Logs.logFile("17-refund-payments",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("17-refund-payments-hata",err)
    })
}
// refundPayment()
//açıklamalı
const refundPaymentWithReason=()=>{
    RefundPayments.refundPayments({
        locale:Iyzipay.LOCALE.TR,
        conversationId:nanoid(),
        paymentTransactionId:"23136794",
        price:"60",
        ip:"85.34.78.112",
        reason:Iyzipay.REFUND_REASON.BUYER_REQUEST,
        description:'Kullanıcı isteği ile iptal edildi'
    }).then((result)=>{
        console.log(result)
        Logs.logFile("18-refund-payments-reason",result)
    }).catch((err)=>{
        console.log(err)
        Logs.logFile("18-refund-payments-reason-hata",err)
    })
}
refundPaymentWithReason()