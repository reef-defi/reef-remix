import { Plugin } from '@remixproject/engine';
import * as packageJson from '../../../../../package.json';

import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';

import { Signer, Provider as EvmProvider } from '@reef-defi/evm-provider';
import { WsProvider } from '@polkadot/api';

import { ethers } from 'ethers';

export const profile = {
  name: 'reefProvider',
  displayName: 'Global Reef EVM Provider',
  description:
    'Represent the current Reef EVM provider used by the app at global scope',
  methods: ['initExtension', 'accounts', 'signer', 'sign'],
  version: packageJson.version,
  kind: 'provider'
};

export class ReefProviderModule extends Plugin {
  constructor(blockchain) {
    super(profile);
    this.blockchain = blockchain;
  }

  async initExtension() {
    this.injectedPromise = await this.blockchain.polkadotjs();
  }

  async accounts() {
    if (!this.injectedPromise) {
      await this.initExtension();
    }
    return await web3Accounts();
  }

  async signer() {
    const injectedPromise = web3Enable('@reef-defi/remix-plugin');

    return await injectedPromise.then(extensions => {
      return extensions[0]?.signer;
    });
  }

  async sign(accountId) {
    // Flipper ABI definition
    let FlipperAbi = [
      {
        inputs: [
          {
            internalType: 'bool',
            name: 'initvalue',
            type: 'bool'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
      },
      {
        inputs: [],
        name: 'flip',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        inputs: [],
        name: 'get',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    const evmProvider = new EvmProvider({
      provider: new WsProvider('wss://rpc-testnet.reefscan.com/ws')
    });
    await evmProvider.api.isReady;

    const accountSigner = await this.signer();
    const wallet = new Signer(evmProvider, accountId, accountSigner);

    const flipperContractAddressTestnet =
      '0x6252dC9516792DE316694D863271bd25c07E621B';
    let ercContract = new ethers.Contract(
      flipperContractAddressTestnet,
      FlipperAbi,
      wallet
    );

    const res = await ercContract.flip();
    console.log(res);
  }
}
