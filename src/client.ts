import type { FastifyInstance } from 'fastify'
import type { JWK } from 'jose'
import type {
  Client,
  ClientMetadata,
  ClientOptions,
  Issuer
} from 'openid-client'

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

export const openIDCreateClient: OpenIDCreateClient = (
  issuer,
  { metadata, jwks, options }
) => new issuer.Client(metadata, jwks, options)
