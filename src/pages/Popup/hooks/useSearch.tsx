import Fuse from 'fuse.js';
import React from 'react';

function useSearch<T>(
  list: T[],
  searchTerm: string,
  fuseOptions?: Fuse.IFuseOptions<T>,
): Fuse.FuseResult<T>[] {
  const fuse = React.useMemo(() => new Fuse(list, fuseOptions), [list, fuseOptions])

  return React.useMemo(() => fuse.search(searchTerm), [fuse, searchTerm])
}

export default useSearch
