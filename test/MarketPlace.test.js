const { assert } = require("chai");

const MarketPlace = artifacts.require("MarketPlace");

contract("MarketPlace", ([deployer, seller, buyer]) => {
  let marketplace;

  //it can be used inside the test case AWA test suite
  before(async () => {
    marketplace = await MarketPlace.deployed();
  });

  describe("deployed", async () => {
    it("deployed successfully", async () => {
      const address = await marketplace.address;
      assert.notEqual(address, null);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await marketplace.name();
      assert.equal(name, "First Marketplace");
    });
  });

  //it use to differentiate the test type like here i did
  //i seperate the product from the name
  describe("product", async () => {
    //before it is use to run the function before testing the desired values
    //here we will test the values
      before(async () => {
        result = await marketplace.createProduct(
        "macbook",
        web3.utils.toWei("1", "Ether"),
        {
          from: seller,
        }
      );
    });

    it("create product", async () => {
      console.log(result.logs);
    });
  });
});
