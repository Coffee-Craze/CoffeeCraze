import wagmiConfig from './wagmiClient';
import { useAccount } from 'wagmi';
import { writeContract, waitForTransaction } from 'wagmi/actions';
import { useState } from 'react';
import LearningModuleNFTAbi from '../../contracts/artifacts/contracts/LearningModuleNFT.sol/LearningModuleNFT.json';

// Replace with your deployed contract address
const LEARNING_MODULE_NFT_ADDRESS = process.env.NEXT_PUBLIC_LEARNING_MODULE_NFT_ADDRESS || '0xYourContractAddress';

export function useMintLearningModuleNFT() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function mintNFT(to: string, uri: string) {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    try {
      const hash = await writeContract(
        {
          address: LEARNING_MODULE_NFT_ADDRESS as `0x${string}`,
          abi: LearningModuleNFTAbi.abi,
          functionName: 'mint',
          args: [to, uri],
        },
        wagmiConfig
      );
      await waitForTransaction({ transactionHash: hash }, wagmiConfig);
      setIsSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return { mintNFT, isLoading, isSuccess, error };
}
