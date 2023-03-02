import useSwr from 'swr';
import useSwrMutation from 'swr/mutation';
import useSWRInfinite from 'swr/infinite';
export const useSwrHook = useSwr;
export const useMutationHook = useSwrMutation;
export const useSWRInfiniteHook = useSWRInfinite;
