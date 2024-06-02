export default class LRUCache {

   max: number;
   cache: Map<string, {}>;

  constructor(max = 10) {
    this.max = max;
    this.cache = new Map();
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, val: {}) {
    this.cache.set(key, val);
  }

  first() {
    return this.cache.keys().next().value;
  }

  getAll() {
    return this.cache.keys();
  }
}
