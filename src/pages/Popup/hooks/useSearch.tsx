import Fuse from 'fuse.js';
import React from 'react';

interface CustomFuseOptions<T> extends Fuse.IFuseOptions<T>{
  limit?: number
}

function useSearch<T>(
  list: T[],
  searchTerm: string,
  fuseOptions?: CustomFuseOptions<T>,
): Fuse.FuseResult<T>[] {
  const fuse = React.useMemo(() => new Fuse(list, fuseOptions), [list, fuseOptions])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return React.useMemo(() => fuse.search(searchTerm, fuseOptions), [fuse, searchTerm, fuseOptions])
}

export default useSearch
