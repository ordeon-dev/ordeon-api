import { AsyncLocalStorage } from 'async_hooks';

export class RequestContext {
  private static storage = new AsyncLocalStorage<Map<string, any>>();

  static set(key: string, value: any) {
    const store = this.storage.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  static get<T>(key: string): T | undefined {
    const store = this.storage.getStore();
    return store ? store.get(key) : undefined;
  }

  static run(fn: () => void) {
    this.storage.run(new Map(), fn);
  }
}