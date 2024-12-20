'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getEigenAPIURL } from './util';
// import { getBaseURL } from './util';

export const retrieveOperators = async () => {
  const options = {method: 'GET'};
  const baseURL = getEigenAPIURL();
  return fetch(`${baseURL}/operators?withTvl=true&sortByTotalAvs=desc`, options)
  .then(response => response.json())
}
export function useRetrieveOperators(props: { page: number }) {
  const query = useSuspenseQuery({
    queryKey: ['retrieveOperators', props.page],
    queryFn: async () => {
      const res: unknown = await retrieveOperators()
      return res
    },
  })

  return [query.data as any, query] as const
}



export const retrieveStaker = async (address?: string) => {
  if(!address) return {};
  const options = {method: 'GET'};
  const baseURL = getEigenAPIURL();
  return fetch(`${baseURL}/stakers/${address}?withTvl=true`, options)
  .then(response => response.json())
}
export function useRetrieveStaker(props: { address?: string }) {
  const query = useSuspenseQuery({
    queryKey: ['retrieveStaker', props.address],
    queryFn: async () => {
      const res: unknown = await retrieveStaker(props?.address)
      return res
    },
  })

  return query
}

export const retrieveOperator = async (address?: string) => {
  if(!address) return {};
  const options = {method: 'GET'};
  const baseURL = getEigenAPIURL();
  // https://api.eigenexplorer.com/operators/{address}
  return fetch(`${baseURL}/operators/${address}?withTvl=true`, options)
  .then(response => response.json())
}
export function useRetrieveOperator(props: { address?: string }) {
  const query = useSuspenseQuery({
    queryKey: ['retrieveOperator', props.address],
    queryFn: async () => {
      const res: unknown = await retrieveOperator(props?.address)
      return res
    },
  })

  return query
}



export const retrieveQueuedWithdrawals = async (address?: string) => {
  if(!address) return {};
  const options = {method: 'GET'};
  const baseURL = getEigenAPIURL();
  // https://api.eigenexplorer.com/stakers/{address}/withdrawals/queued_withdrawable

  return fetch(`${baseURL}/stakers/${address.toLowerCase()}/withdrawals/queued`, options)
  .then(response => response.json())
}
export function useRetrieveQueuedWithdrawals(props: { address?: string }) {
  const query = useSuspenseQuery({
    queryKey: ['retrieveQueuedWithdrawals', props.address],
    queryFn: async () => {
      const res: unknown = await retrieveQueuedWithdrawals(props?.address)
      return res
    },
  })

  return query
}


export const retrieveQueuedAndWithdrawableWithdrawals = async (address?: string) => {
  if(!address) return {};
  const options = {method: 'GET'};
  const baseURL = getEigenAPIURL();
  // https://api.eigenexplorer.com/stakers/{address}/withdrawals/queued_withdrawable

  return fetch(`${baseURL}/stakers/${address?.toLowerCase()}/withdrawals/queued_withdrawable`, options)
  .then(response => response.json());
  // return fetch(`${baseURL}/stakers/${address}/withdrawals/queued`, options)
  // .then(response => response.json())
}
export function useRetrieveQueuedAndWithdrawableWithdrawals(props: { address?: string }) {
  const query = useSuspenseQuery({
    queryKey: ['retrieveQueuedAndWithdrawableWithdrawals', props.address],
    queryFn: async () => {
      const res: unknown = await retrieveQueuedAndWithdrawableWithdrawals(props?.address)
      return res
    },
  })

  return query
}



export const retrieveCompleteWithdrawals = async (address?: string) => {
  if(!address) return {};
  const options = {method: 'GET'};
  const baseURL = getEigenAPIURL();
  // https://api.eigenexplorer.com/stakers/{address}/withdrawals/queued_withdrawable

  return fetch(`${baseURL}/stakers/${address?.toLowerCase()}/withdrawals/completed`, options)
  .then(response => response.json());
  // return fetch(`${baseURL}/stakers/${address}/withdrawals/queued`, options)
  // .then(response => response.json())
}
export function useRetrieveCompleteWithdrawals(props: { address?: string }) {
  const query = useSuspenseQuery({
    queryKey: ['retrieveCompleteWithdrawals', props.address],
    queryFn: async () => {
      const res: unknown = await retrieveQueuedAndWithdrawableWithdrawals(props?.address)
      return res
    },
  })

  return query
}