pragma solidity ^0.5.0;

contract Marketplace {
    string public name;

    mapping(uint => Product) public products;

    uint public totalProducts = 0;

    struct Product {
        uint id;
        string name;
        uint price;
        bool sold;
        address owner;
    }

    event productCreated(
        uint id,
        string name,
        uint price,
        bool sold,
        address owner
    );

    constructor() public {
        name = "First Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Name is required");
        require(_price > 0, "Price is required");
        totalProducts++;
        products[totalProducts] = Product(
            totalProducts,
            _name,
            _price,
            false,
            msg.sender
        );
        emit productCreated(totalProducts, _name, _price, false, msg.sender);
    }
}
