/* eslint-disable prettier/prettier */
export interface IRetorno<T> {
    status: number,
    message?: string,
    erro?: any,
    data?: T
  }