import { type FastifyInstance } from 'fastify'
import { type JWK } from 'jose'
import { type Client, type ClientMetadata, type ClientOptions, type Issuer } from 'openid-client'

export interface OpenIDCreateClientOptions {
  metadata: ClientMetadata
  jwks?: {
    keys: JWK[]
  }
  options?: ClientOptions
}

export type OpenIDCreateClient = (
  this: FastifyInstance,
  issuer: Issuer,
  options: OpenIDCreateClientOptions
) => Client

export const openIDCreateClient: OpenIDCreateClient = function (
  issuer,
  { metadata, jwks, options }
) {
  return new issuer.Client(metadata, jwks, options)
}
