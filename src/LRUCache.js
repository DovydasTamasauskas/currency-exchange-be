export default class LRUCache {
  constructor(max = 10) {
    this.max = max;
    this.cache = new Map();
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, val) {
    this.cache.set(key, val);
  }

  first() {
    return this.cache.keys().next().value;
  }

  getAll() {
    return this.cache.keys();
  }
}
