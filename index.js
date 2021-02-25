const core = require('@actions/core');
const orderPizza = require('./lib/order-pizza');


// most @actions toolkit packages have async methods
async function run() {
  try {
    core.debug("Creating Order"); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    const order = await orderPizza();
    core.setOutput("Order Details", order);
  } catch (error) {
    core.setOutput("")
    core.setFailed(error.message);
  }
}

run();
