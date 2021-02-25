const fs = require('fs')
const core = require('@actions/core')
const pizzapi = require('dominos')
const wait = require('./wait')

function orderPizza(){
    try {
        const customerData = core.getInput('RECEIVING_ADDRESS', { required: true })
        const customer = JSON.parse(customerData)
        const getAddress = new pizzapi.Address(customer.address).getAddressLines()

        

        const closestStoreID = pizzapi.Util.findNearbyStores(
            `${getAddress}`,
            'Delivery',
            function (storeData) {
                console.log(storeData)
                //if (storeData.status !== 0) {
                //    throw "Couldn't find a store close to this address."
                //}
                return storeData.Stores[0].StoreID
            }
        )

        console.log(closestStoreID)

        if (closestStoreID === undefined || closestStoreID == '') {
             throw new Error("Couldn't find a store close to this address.")
        }

        core.debug("Fetched the closest store")
        //await wait(parseInt(10000));

        let order = new pizzapi.Order({
            customer: new pizzapi.Customer(customer),
            // Hardcoded nearest store to Eric
            // To find the store closest to you, hit this url:
            // https://order.dominos.com/power/store-locator?s=YOUR_ZIP_CODE&c=&type=Delivery
            // Then find the "StoreID" on the first line
            storeID: closestStoreID,

            deliveryMethod: 'Delivery'
        })

        order.addItem(
            // Large Cheese Pizza
            new pizzapi.Item({
                code: '14SCREEN',
                options: [],
                quantity: 1
            })
        )
        
        order.validate(
            function(result) {
                core.debug("Order Validated!")
            }
        )

        console.log(order)

        //await wait(parseInt(20000));

        order.price(
            function(result) {
                console.debug("Price Added")
            }
        )

        console.log(order)

        //await wait(parseInt(20000));

        let cardInfo = new order.PaymentObject()
        let cardNumber = core.getInput('CC_NUMBER', {
            required: true
        })
        cardInfo.Amount = order.Amounts.Customer
        cardInfo.Number = cardNumber
        cardInfo.CardType = order.validateCC(cardNumber)
        cardInfo.Expiration = core.getInput('CC_EXP', {
            required: true
        }) //  01/15 just the numbers "01/15".replace(/\D/g,'')
        cardInfo.SecurityCode = core.getInput('CC_CVV', {
            required: true
        })
        cardInfo.PostalCode = core.getInput('CC_ZIP', {
            required: true
        }) // Billing Zipcode 

        order.Payments.push(cardInfo)

        order.place(
            function(result) {
                core.debug("Order Placed!")
                console.log(order)
                return(result.order)
            }
        )
    } catch (error) {
        core.setOutput('Error_Message', error.message)
        core.setFailed(error.message)
        throw error
    }
};

module.exports = orderPizza;
