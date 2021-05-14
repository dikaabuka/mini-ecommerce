import { BaseService } from './base.service'
import { ErrorWrapper, ResponseWrapper } from './util'

export class UsersService extends BaseService {
  static get entity () {
    return 'user'
  }

  static async getCurrent () {
    try {
      const response = await this.request({ auth: true }).get(`${this.entity}`)
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }
}
