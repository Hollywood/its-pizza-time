const core = require('@actions/core');
const orderPizza = require('./lib/order-pizza');


// most @actions toolkit packages have async methods
async function run() {
  try {
    core.debug("Creating Order");
    let order = await orderPizza();
    core.setOutput("Order_Details", order);
  } catch (error) {
    core.setOutput("Error_Message", error)
    core.setFailed(error);
  }
}

run();
