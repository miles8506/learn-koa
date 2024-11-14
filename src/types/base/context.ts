import type { DefaultContext, DefaultState, ParameterizedContext } from 'koa'
import Router from '@koa/router'

export type RouterContext<T = object, B = unknown> = ParameterizedContext<
  DefaultState,
  DefaultContext & Router.RouterParamContext<DefaultState, DefaultContext> & T,
  B
>
