const fs = require('fs');

// const jsonNameList = [
//     'INodeRewardPool', 'IDynamicRewardPool', 'IStaticRewardPool', 'IGuaranteeRewardPool', 'IFeeManager', 'IPancakePair', 'GenesisNFT', 'EcologyNFT', 'L25600NFT'
// ];

const jsonNameList = ['INodeRewardPool'];

const fromPath = '~/Desktop/KleinSwapContracts/artifacts/contracts/interfaces/';
const fromPath2 = '~/Desktop/KleinSwapContracts/artifacts/contracts/nfts/';
const toPath = '~/Documents/work/hc_kly_backend/service/json/';

function main() {
    for (let i = 0; i < jsonNameList.length; i++) {
        let fromLink = fromPath + jsonNameList[i] + '.sol/' + jsonNameList[i] + '.json';
        let toLink = toPath + jsonNameList[i] + '.json';
        if (jsonNameList[i].indexOf('NFT') > 0) {
            fromLink = fromPath2 + jsonNameList[i] + '.sol/' + jsonNameList[i] + '.json';
        }
        fs.cp(fromLink, toLink, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }

}

main()