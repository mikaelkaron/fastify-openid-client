import type { FastifyPluginAsync, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { type OpenIDCreateClientOptions, openIDCreateClient } from './client.js'
import { type OpenIDCreateIssuerOptions, openIDCreateIssuer } from './issuer.js'

export type FastifyOpenIDClientPluginOptions = FastifyPluginOptions & {
  issuer: { decorator?: string | symbol } & OpenIDCreateIssuerOptions
  client?: { decorator: string | symbol } & OpenIDCreateClientOptions
}

export const openIDClientPlugin: FastifyPluginAsync<
  FastifyOpenIDClientPluginOptions
> = async (
  fastify,
  { issuer: { decorator: issuerDecorator, ...createIssuerOptions }, ...options }
) => {
  const issuer = await openIDCreateIssuer.call(fastify, createIssuerOptions)
  fastify.log.debug(issuer.metadata, 'OpenID issuer metadata')
  if (issuerDecorator !== undefined) {
    fastify.log.trace(
      `decorating \`fastify[${String(issuerDecorator)}]\` with OpenID issuer`
    )
    fastify.decorate(issuerDecorator, issuer)
  }
  if (options.client !== undefined) {
    const { decorator: clientDecorator, ...createClientOptions } =
      options.client
    const client = openIDCreateClient.call(fastify, issuer, createClientOptions)
    fastify.log.debug(client.metadata, 'OpenID client metadata')
    fastify.log.trace(
      `decorating \`fastify[${String(clientDecorator)}]\` with OpenID client`
    )
    fastify.decorate(clientDecorator, client)
  }
}

export default fp(openIDClientPlugin, {
  fastify: '5.x',
  name: 'fastify-openid-client'
})
