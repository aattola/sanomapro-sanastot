importScripts('comlink.js');
importScripts('fuse.js')
// importScripts("../../../dist/umd/comlink.js");

const obj = {
  counter: 0,
  results: [],
  inc() {
    this.counter++;
  },
  search(words, searchTerm) {
    const fuse = new Fuse(words, {
      keys: ['origin', 'translation'],
      useExtendedSearch: true,
      limit: 25,
      threshold: 0.7,
    })

    const results = fuse.search(searchTerm)

    const finalRes = []
    for (let i = 0; i < (results.length < 24 ? results.length : 24); i++) {
      finalRes.push(results[i])
    }

    this.results = finalRes
  },
};

Comlink.expose(obj);
