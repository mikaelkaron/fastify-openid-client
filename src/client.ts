import { FastifyInstance } from 'fastify';
import { JWK } from 'jose';
import { Client, ClientMetadata, ClientOptions, Issuer } from 'openid-client';

export interface OpenIDCreateClientOptions {
  name: string;
  metadata: ClientMetadata;
  jwks?: {
    keys: JWK[];
  };
  options?: ClientOptions;
}

export const openIDCreateClient = function (
  this: FastifyInstance,
  issuer: Issuer,
  { metadata, jwks, options }: OpenIDCreateClientOptions
): Client {
  return new issuer.Client(metadata, jwks, options);
};
