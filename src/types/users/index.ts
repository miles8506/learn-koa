export interface IUserRegisterRequest {
  name: string
  password: string
}

export interface IUserRegister {
  id: number
  name: string
  password: string
  createAt: Date
  updateAt: Date
}

export interface IUser {
  id: number
  name: string
}
