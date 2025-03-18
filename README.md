# Real Estate Escrow Blockchain System

## 📌 Project Overview

This is a **decentralized real estate escrow system** built using **Solidity, Hardhat, OpenZeppelin, JavaScript, and React**. The system ensures secure property transactions between **buyers and sellers**, with a **third-party escrow agent** facilitating the process. Funds are locked in a **smart contract** and released only when both parties meet the conditions of the agreement.

---

## 🚀 Features

- **Secure escrow transactions** for real estate deals.
- **Role-based system**: Buyer, Seller, and Escrow Agent.
- **Fund locking and release mechanism**.
- **Decentralized, tamper-proof transactions**.
- **Automated smart contract execution**.
- **Complete unit tests** using Hardhat.
- **React frontend** for user interaction.

---

## 🛠️ Tech Stack

### **Smart Contracts**

- **Solidity** (for writing the escrow contract)
- **Hardhat** (for development & testing)
- **OpenZeppelin** (for security & reusable contracts)

### **Frontend**

- **React.js** (for UI)
- **Ethers.js** (for interacting with the smart contract)

### **Testing & Deployment**

- **Chai & Mocha** (for unit testing)
- **Hardhat Testnet** (for local blockchain testing)
- **MetaMask** (for signing transactions)

---

## 🏗️ System Flow

1. **Deployment**: The smart contract is deployed by the escrow agent.
2. **Property Listing**: Seller lists the property with an agreed price.
3. **Escrow Agreement**: Buyer deposits the agreed amount into the smart contract.
4. **Inspection & Approval**: Seller transfers property, and buyer verifies ownership.
5. **Fund Release**: Escrow agent releases funds to the seller after approval.
6. **Dispute Resolution**: If disputes arise, the escrow agent mediates and releases funds accordingly.

---

## 📂 Project Structure

```
real-estate-escrow/
├── contracts/            # Solidity smart contracts
│   ├── Escrow.sol        # Main escrow contract
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── utils/       # Web3 helpers
│   │   ├── App.js       # Main app file
├── test/                # Smart contract tests
│   ├── escrow.test.js   # Unit tests for Escrow.sol
├── scripts/             # Deployment scripts
│   ├── deploy.js        # Script for deploying contract
├── hardhat.config.js    # Hardhat configuration
└── README.md            # Project documentation
```

---

## ⚡ Getting Started

### 1️⃣ Prerequisites

Ensure you have **Node.js**, **npm/yarn**, and **MetaMask** installed.

```sh
node -v  # Ensure Node.js is installed
npm -v   # Ensure npm is installed
```

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/JuniorDCoder/real-estate-escrow.git
cd real-estate-escrow
```

### 3️⃣ Install Dependencies

```sh
npm install  # Installs all dependencies
```

---

## 📝 Smart Contract Deployment

### 1️⃣ Compile the Contracts

```sh
npx hardhat compile
```

### 2️⃣ Run Tests

```sh
npx hardhat test
```

### 3️⃣ Deploy to Local Hardhat Network

```sh
npx hardhat node  # Starts a local blockchain
npx hardhat run scripts/deploy.js --network localhost
```

### 4️⃣ Deploy to a Public Testnet (e.g., Goerli)

```sh
npx hardhat run scripts/deploy.js --network goerli
```

---

## 🖥️ Running the Frontend

```sh
cd frontend
npm start  # Starts the React app
```

Connect **MetaMask** to the correct network before interacting with the escrow contract.

---

## ✅ Testing the Workflow

1. **Seller lists a property** (Registers property and price).
2. **Buyer deposits funds** (Sends ETH to the contract).
3. **Escrow agent locks funds** (Ensures funds are secure).
4. **Property is transferred & verified**.
5. **Escrow agent releases payment**.

---

## 📜 Smart Contract Overview

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    address public escrowAgent;
    uint public price;
    bool public isFundsLocked;

    constructor(address _buyer, address _seller, uint _price) {
        escrowAgent = msg.sender;
        buyer = _buyer;
        seller = _seller;
        price = _price;
    }

    function deposit() external payable {
        require(msg.sender == buyer, "Only buyer can deposit");
        require(msg.value == price, "Incorrect amount");
        isFundsLocked = true;
    }

    function releaseFunds() external {
        require(msg.sender == escrowAgent, "Only agent can release funds");
        require(isFundsLocked, "Funds are not locked");
        payable(seller).transfer(address(this).balance);
        isFundsLocked = false;
    }
}
```

---

## 📢 Contributions

We welcome contributions! Feel free to submit pull requests or open issues.

---

## 🔗 Resources

- [Solidity Docs](https://docs.soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [OpenZeppelin](https://openzeppelin.com/)
- [Ethers.js](https://docs.ethers.io/)

---

## 🎯 Future Improvements

- Implement **multi-sig escrow agents** for better security.
- Integrate **oracles** for automatic property verification.
- Extend **dispute resolution mechanisms** with community voting.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

For any issues, reach out via:

- **Email**: foryoungjuniorngu@gmail.com
- **GitHub**: [JuniorDCoder](https://github.com/JuniorDCoder)

---

🚀 \*\*Start securing real estate trans
# real-estate-escrow
# real-estate-escrow
