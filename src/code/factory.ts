export interface Factory<T> {
    make(json: any): T
  }
  