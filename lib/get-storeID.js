const pizzapi = require('dominos')

module.exports = async function getStoreID(address) {
  return new Promise ( async (resolve) => {
    await pizzapi.Util.findNearbyStores(
        `${address}`,
        'Delivery',
        function (storeData) {
          resolve(storeData)
        }
    )
  })
}