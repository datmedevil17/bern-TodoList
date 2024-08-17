const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("Todo", (m) => {


  const Todo = m.contract("Todo", []);

  return { Todo };
});



