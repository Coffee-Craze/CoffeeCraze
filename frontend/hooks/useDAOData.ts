import { useContractRead } from 'wagmi';
import DAOAbi from '../../contracts/artifacts/contracts/DAOContract.sol/DAOContract.json';

const DAO_ADDRESS = process.env.NEXT_PUBLIC_DAO_ADDRESS || '0xYourDAOAddress';

export function useAllProposals() {
  const { data: nextId } = useContractRead({
    address: DAO_ADDRESS as `0x${string}`,
    abi: DAOAbi.abi,
    functionName: 'nextProposalId',
    watch: true,
  });
  const proposalIds = Array.from({ length: Number(nextId || 0) }, (_, i) => i);
  const proposals = proposalIds.map((id) =>
    useContractRead({
      address: DAO_ADDRESS as `0x${string}`,
      abi: DAOAbi.abi,
      functionName: 'proposals',
      args: [id],
      watch: true,
    })
  );
  return proposals.map((p, i) => ({ ...p.data, id: i, isLoading: p.isLoading, error: p.error }));
}
