const rpcurl = "https://speedy-nodes-nyc.moralis.io/4f7bf6c59fdbf10c6c3a0aeb/eth/mainnet";
const network = {
    name: "eth",
    chainId: 1,
};
const provider = new ethers.providers.JsonRpcProvider(rpcurl, network);
const userAddress = '0x5c42173d94886fec77df45c07a8c3379e3b3a9d6';

const abi = [
    "function withdrawableDividendOf(address,address) view returns (uint256)",
    "function getTotalDividendsDistributed(address) view returns (uint256)"
];
const contrAddress = '0x920e4Cc5c50548ED2825de9e380A4d7b2A7Ff143';
const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

const contract = new ethers.Contract(contrAddress, abi, provider);
const button = document.getElementById("reward-button");
const getRewards = async () => {
    const rewards = await contract.withdrawableDividendOf(userAddress,usdcAddress);
    let rewardsDisplay = document.getElementById("rewards-usdc");
    rewardsDisplay.innerText = "You have " + (rewards/1000000).toFixed(2) + " $USDC"; 
    claim.classList.add("show");
};
const getTotalRewards = async () => {
    const totalRewards = await contract.getTotalDividendsDistributed(usdcAddress);
    const claim = document.getElementById("claim");
    let totalRewardsDisplay = document.getElementById("total-rewards-usdc");
    totalRewardsDisplay.innerText = "$" + (totalRewards/1000000).toFixed(2);
};


button.addEventListener('click', getRewards );
getTotalRewards();