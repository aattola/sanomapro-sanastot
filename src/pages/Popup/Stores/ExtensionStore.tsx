import { makeAutoObservable } from 'mobx';

class ExtensionStore {
  search = ''

  theme: 'light' | 'dark' = 'light'

  setSearch(newSearch: string) {
    this.search = newSearch
  }

  setTheme(newTheme: 'light' | 'dark') {
    this.theme = newTheme

    chrome.storage.sync.set({ theme: newTheme });
  }

  toggleTheme() {
    if (this.theme === 'light') {
      this.setTheme('dark')
      return;
    }
    this.setTheme('light')
  }

  constructor() {
    makeAutoObservable(this)

    this.toggleTheme = this.toggleTheme.bind(this)

    chrome.storage.sync.get(['theme'], (result) => {
      if (!result) return
      if (result.theme === 'light' || result.theme === 'dark') {
        this.setTheme(result.theme)
      }
    });
  }
}

const extensionStore = new ExtensionStore()
export default extensionStore
