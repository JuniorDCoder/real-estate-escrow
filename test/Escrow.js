const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    let realEstate, escrow;
    let nftAddress, seller, inspector, lender, buyer;

    beforeEach(async() => {
        [buyer, seller, inspector, lender] = await ethers.getSigners();

        // Deploy RealEstate contract
        const RealEstate = await ethers.getContractFactory('RealEstate');
        realEstate = await RealEstate.deploy();
        await realEstate.deployed();

        // Mint NFT
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS");
        await transaction.wait();

        nftAddress = realEstate.address;

        // Deploy Escrow contract
        const Escrow = await ethers.getContractFactory('Escrow');
        escrow = await Escrow.deploy(nftAddress, seller.address, inspector.address, lender.address);
        await escrow.deployed();

        // Approve Escrow contract to transfer NFT
        transaction = await realEstate.connect(seller).approve(escrow.address, 1);
        await transaction.wait();

        // List Property
        transaction = await escrow.connect(seller).list(1, buyer.address, tokens(10), tokens(5));
        await transaction.wait();
    });

    describe('Deployment', async() => {
        it('returns NFT address', async() => {
            expect(await escrow.nftAddress()).to.equal(nftAddress);
        });

        it('returns seller address', async() => {
            expect(await escrow.seller()).to.equal(seller.address);
        });

        it('returns inspector address', async() => {
            expect(await escrow.inspector()).to.equal(inspector.address);
        });

        it('returns lender address', async() => {
            expect(await escrow.lender()).to.equal(lender.address);
        });
    });

    describe('Listing', async() => {
        it('updates as listed', async() => {
            const results = await escrow.isListed(1);
            expect(results).to.equal(true);
        });

        it('updates the ownership of the NFT', async() => {
            expect(await realEstate.ownerOf(1)).to.equal(escrow.address);
        });

        it('returns buyer', async() => {
            const result = await escrow.buyer(1);
            expect(result).to.equal(buyer.address);
        });
        
        it('returns purchase price', async() => {
            const result = await escrow.purchasePrice(1);
            expect(result).to.equal(tokens(10));
        });

        it('returns escrow amount', async() => {
            const result = await escrow.escrowAmount(1);
            expect(result).to.equal(tokens(5));
        });
    });

    describe('Deposit', async() => {
        it('updates the escrow balance', async() => {
            const transaction = await escrow.connect(buyer).depositEarnest(1, { value: tokens(5) });
            await transaction.wait();

            const result = await escrow.getBalance();
            expect(result).to.equal(tokens(5));
        });
    });

    describe('Inspection', async() => {
        it('updates inspection status', async() => {
            const transaction = await escrow.connect(inspector).updateInspectionStatus(1, true);
            await transaction.wait();

            const result = await escrow.inspectionPassed(1);
            expect(result).to.equal(true);
        });
    });

    describe('Approval', async() => {
        it('updates approval status', async() => {
            let transaction = await escrow.connect(buyer).approveSale(1);
            await transaction.wait();
            
            transaction = await escrow.connect(seller).approveSale(1);
            await transaction.wait();

            transaction = await escrow.connect(lender).approveSale(1);
            await transaction.wait();

            expect(await escrow.approval(1, buyer.address)).to.equal(true);
            expect(await escrow.approval(1, seller.address)).to.equal(true);
            expect(await escrow.approval(1, lender.address)).to.equal(true);
        });
    });

    describe('Sale', async() => {
        beforeEach(async() => {
            await escrow.connect(buyer).depositEarnest(1, { value: tokens(5) });
            await escrow.connect(inspector).updateInspectionStatus(1, true);
            await escrow.connect(buyer).approveSale(1);
            await escrow.connect(seller).approveSale(1);
            await escrow.connect(lender).approveSale(1);

            await lender.sendTransaction({ to: escrow.address, value: tokens(5) });

            await escrow.connect(seller).finalizeSale(1);
        });

        it('updates the balance of the seller', async() => {
            const result = await escrow.getBalance();
            expect(result).to.equal(tokens(0));
        });

        it('updates the ownership of the NFT', async() => {
            expect(await realEstate.ownerOf(1)).to.equal(buyer.address);
        });
    });
});