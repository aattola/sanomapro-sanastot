import { makeAutoObservable } from 'mobx';

class ExtensionStore {
  search = ''

  theme: 'light' | 'dark' = 'light'

  listaMode = false

  toggleMode() {
    this.listaMode = !this.listaMode

    chrome.storage.sync.set({ listMode: this.listaMode });
  }

  setListMode(newListMode: boolean) {
    this.listaMode = newListMode
  }

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
    this.toggleMode = this.toggleMode.bind(this)

    chrome.storage.sync.get(['theme', 'listMode'], (result) => {
      if (!result) return
      if (result.theme === 'light' || result.theme === 'dark') {
        this.setTheme(result.theme)
      }

      if (result.listMode === true) {
        this.setListMode(true)
      }
      if (result.listMode === false) {
        this.setListMode(false)
      }
    });
  }
}

const extensionStore = new ExtensionStore()
export default extensionStore
