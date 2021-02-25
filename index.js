const core = require('@actions/core');
const orderPizza = require('./lib/order-pizza');


// most @actions toolkit packages have async methods
function run() {
  try {
    core.debug("Creating Order");
    const order = orderPizza();
    core.setOutput("Order Details", order);
  } catch (error) {
    core.setOutput("Error_Message", error.message)
    core.setFailed(error.message);
  }
}

run();
