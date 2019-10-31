import request from '../index'

export const config = {

}

export default function req (funcName, data, isToken = true, isCancel = true) {
  return request(config, funcName, data, isToken, isCancel)
}
