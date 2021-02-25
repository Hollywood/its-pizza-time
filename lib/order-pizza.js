const fs = require('fs')
const core = require('@actions/core')
const pizzapi = require('dominos')
const wait = require('./wait')

async function orderPizza(){
    try {
        let customer = JSON.parse(core.getInput('RECEIVING_ADDRESS', {
            required: true
        }))
        let getAddress = new pizzapi.Address(customer.address).getAddressLines()

        let closestStoreID = await pizzapi.Util.findNearbyStores(
            `${getAddress}`,
            'Delivery',
            function (storeData) {
                return storeData.result.Stores[0].StoreID
            }
        )

        if (closestStoreID === undefined) {
            core.setOutput('ERROR_MESSAGE', "Couldn't find a store close to this address.");
            process.exit(1);
        }

        core.debug("Fetched the closest store")
        await wait(parseInt(10000));

        var order = new pizzapi.Order({
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

        await wait(parseInt(20000));

        order.price(
            function(result) {
                core.debug("Price Added")
            }
        )

        console.log(order)

        await wait(parseInt(20000));

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
        core.setFailed(error.message)
        core.setOutput('ERROR_MESSAGE', error.message);
    }
};

module.exports = orderPizza;
