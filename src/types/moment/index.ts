import { IUserRegister } from '../users'

export interface IMomentRequest {
  content: string
}

export interface IMomentListRequest {
  size: string
  offset: string
}

export interface IMomentListResponse {
  id: number
  content: string
  create_time: Date
  update_time: Date
  user: IUserRegister
  comment_count: number
}

export interface IMomentUpdateRequest {
  content: string
}

export interface IMomentLabels {
  labels: string[]
}

export interface ILabelContext {
  id: number
  name: string
}
