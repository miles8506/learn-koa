export interface ILoginRequest {
  name: string
  password: string
}

export interface ILoginResponse {
  id: number
  name: string
  token: string
}
