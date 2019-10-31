import Cookies from 'js-cookie'

const TokenKey = 'token'
const InfoKey = 'userinfo'
const PermissionKey = 'permissions'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getInfo() {
  return Cookies.get(InfoKey)
}

export function setInfo(info) {
  return Cookies.set(InfoKey, info)
}

export function removeInfo() {
  return Cookies.remove(InfoKey)
}

export function getPermission() {
  return Cookies.get(PermissionKey)
}

export function setPermission(permissions) {
  return Cookies.set(PermissionKey, permissions)
}

export function removePermission() {
  return Cookies.remove(PermissionKey)
}
