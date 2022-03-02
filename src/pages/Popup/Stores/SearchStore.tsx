import { makeAutoObservable } from 'mobx';

class SearchStore {
  search = ''

  setSearch(newSearch: string) {
    this.search = newSearch
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const searchStore = new SearchStore()
export default searchStore
