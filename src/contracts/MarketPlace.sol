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
        address payable owner;
    }

    event productCreated(
        uint id,
        string name,
        uint price,
        bool sold,
        address payable owner
    );

    event productPurchased(
        uint id,
        string name,
        uint price,
        bool sold,
        address payable owner
    );

    constructor() public {
        name = "First Marketplace";
    }

    function increaseProductCount() public {
        totalProducts++;
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

    function purchaseProduct(uint _id) public payable {
        //checks

        //check id is valid
        require(_id >= 0 && _id < totalProducts, "Product not exist");

        Product memory _product = products[_id];

        //check the balance is high or equal

        require(_product.price <= msg.value, "your balance is low");

        //check buyer is not the seller

        require(_product.owner != msg.sender, "buyer cannot be the seller");

        //check product is not sold

        require(!_product.sold, "product is already sold");

        address(_product.owner).transfer(msg.value);
        _product.owner = msg.sender;
        _product.sold = true;

        products[_id] = _product;

        emit productPurchased(
            _id,
            _product.name,
            _product.price,
            _product.sold,
            _product.owner
        );
    }
}
