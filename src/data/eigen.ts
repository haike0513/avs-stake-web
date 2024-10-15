'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
// import { getBaseURL } from './util';

export const retrieveOperators = async () => {
  const options = {method: 'GET'};
  return fetch('https://api.eigenexplorer.com/operators?withTvl=true&sortByTotalAvs=desc', options)
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