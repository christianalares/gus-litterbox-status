// import { api as convexApi } from '@convex-api'
// import { convexQuery } from '@convex-dev/react-query'
// import { useQuery as useTanstackQuery } from '@tanstack/react-query'
// import { type Path, type GetPathValue, getByPath } from '@clickbar/dot-diver'

// type FilterUnderscorePaths<T extends string> = T extends `${string}_${string}`
//   ? never
//   : T extends `${infer Part}.${infer Rest}`
//     ? FilterUnderscorePaths<Part> extends never
//       ? never
//       : `${Part}.${FilterUnderscorePaths<Rest>}`
//     : T

// type ApiPath = FilterUnderscorePaths<Path<typeof convexApi>>
// type GetArgs = Parameters<GetPathValue<typeof convexApi, ApiPath>>

// export const useQuery = <Args extends GetPathValue<typeof convexApi, ApiPath>>(path: ApiPath, args: Args) => {
//   const fn = getByPath(convexApi, path)

//   const query = useTanstackQuery(convexQuery(fn, args))

//   return query
// }

// useQuery('litterboxVisits.get')
