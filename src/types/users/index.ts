export interface IUserRegisterRequest {
  name: string
  password: string
}

export interface IUserRegister {
  id: number
  name: string
  password: string
  create_time: Date
  update_time: Date
}

export interface IUser {
  id: number
  name: string
}
