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