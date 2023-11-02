const ethers = require("ethers");
// OR import ethers from 'ethers';

// HTTP version
(async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/bsc');
  const version = await provider.send('web3_clientVersion');
  console.log(version);
})();

