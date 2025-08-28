import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, ethers, JsonRpcProvider } from 'ethers';
import donationManagerJson from '../donations/DonationManager.json';

@Injectable()
export class ContractService implements OnModuleInit {
  private provider: JsonRpcProvider;
  private signer: ethers.Wallet;
  private contract: Contract;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const rpc = this.config.get('RPC_URL');
    this.provider = new JsonRpcProvider(rpc);

    this.signer = new ethers.Wallet(
      this.config.get('CONTRACT_OWNER_PRIVATE_KEY') ?? '',
      this.provider,
    );

    this.contract = new ethers.Contract(
      this.config.get('CONTRACT_ADDRESS') ?? '',
      donationManagerJson.abi,
      this.signer,
    );
  }

  async donate(ngoAddress: string, amountEth: number): Promise<string> {
    const tx = await this.contract.donate(ngoAddress, {
      value: ethers.parseEther(amountEth.toString()),
    });
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }

  async freezeNgo(ngoAddress: string): Promise<void> {
    await (await this.contract.freezeNgo(ngoAddress)).wait();
  }

  async unfreezeNgo(ngoAddress: string): Promise<void> {
    await (await this.contract.unfreezeNgo(ngoAddress)).wait();
  }

  async withdraw(
    ngoAddress: string,
    to: string,
    amountEth: number,
  ): Promise<string> {
    const tx = await this.contract.withdraw(
      ngoAddress,
      to,
      ethers.parseEther(amountEth.toString()),
    );
    const receipt = await tx.wait();
    return receipt.transactionHash;
  }
}
