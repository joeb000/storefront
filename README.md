# storefront
Backend prototype of venture concept design for a smart network of ownerless, "vending-machine-like" storefronts.

These instructions assume that you already have a working ethereum node with an interactive javascript console. Using the testnet or a private chain is highly recommended so that you don't lose any actual ether.

You should also have multiple ethereum accounts (at least 3) set up and unlocked.

# Deploying the Solidity Scripts

I've included some solidity snippets in the `js` folder to help make things easier. If you don't want to compile the `.sol` files for yourself, feel free to copy/paste the snippets from `deploy.js`.

Once the scripts are deployed via javascript console, create javascript objects for each instance of the contract. See below for my recommendations/implementation of this:

    var mymaster = mastercontractContract.at("0x43fd4c2e324458dab93b71a791e848653e9868ca"); //replace contract address with your own
    
    var myvendor = vendorcontractContract.at("0x81a7e5ded2314da924bdeb7bcf7707b653bcffe9");


# WIP
This documentation is a Work in Progress and will be updated shortly (hopefully)
