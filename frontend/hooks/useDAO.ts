import { useAccount } from 'wagmi';
import { writeContract, waitForTransaction } from 'wagmi/actions';
import { useState } from 'react';
import DAOAbi from '../../contracts/artifacts/contracts/DAOContract.sol/DAOContract.json';
import wagmiConfig from './wagmiClient';

const DAO_ADDRESS = process.env.NEXT_PUBLIC_DAO_ADDRESS || '0xYourDAOAddress';

export function useCreateProposal() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function createProposal(title: string, description: string) {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    try {
      const hash = await writeContract({
        address: DAO_ADDRESS as `0x${string}`,
        abi: DAOAbi.abi,
        functionName: 'createProposal',
        args: [title, description],
      }, wagmiConfig);
      await waitForTransaction({ hash }, wagmiConfig);
      setIsSuccess(true);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { createProposal, isLoading, isSuccess, error };
}

export function useVoteProposal() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function voteProposal(proposalId: number, support: boolean) {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    try {
      const hash = await writeContract({
        address: DAO_ADDRESS as `0x${string}`,
        abi: DAOAbi.abi,
        functionName: 'vote',
        args: [proposalId, support],
      }, wagmiConfig);
      await waitForTransaction({ hash }, wagmiConfig);
      setIsSuccess(true);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { voteProposal, isLoading, isSuccess, error };
}

export function useExecuteProposal() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function executeProposal(proposalId: number) {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    try {
      const hash = await writeContract({
        address: DAO_ADDRESS as `0x${string}`,
        abi: DAOAbi.abi,
        functionName: 'executeProposal',
        args: [proposalId],
      }, wagmiConfig);
      await waitForTransaction({ hash }, wagmiConfig);
      setIsSuccess(true);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }

  return { executeProposal, isLoading, isSuccess, error };
}
