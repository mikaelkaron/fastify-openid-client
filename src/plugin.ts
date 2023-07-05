import { type FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { openIDCreateClient, type OpenIDCreateClientOptions } from './client.js'
import { openIDCreateIssuer, type OpenIDCreateIssuerOptions } from './issuer.js'

export interface FastifyOpenIDClientPluginOptions {
  issuer: { decorator?: string | symbol } & OpenIDCreateIssuerOptions
  client?: { decorator: string | symbol } & OpenIDCreateClientOptions
}

export const openIDClientPlugin: FastifyPluginAsync<FastifyOpenIDClientPluginOptions> =
  fp(
    async (fastify, options) => {
      const issuer = await openIDCreateIssuer.call(fastify, options.issuer)
      fastify.log.debug(issuer.metadata, 'OpenID issuer metadata')
      if (options.issuer.decorator !== undefined) {
        fastify.log.trace(
          `decorating \`fastify[${String(options.issuer.decorator)}]\` with OpenID issuer`
        )
        fastify.decorate(options.issuer.decorator, issuer)
      }
      if (options.client !== undefined) {
        const client = openIDCreateClient.call(fastify, issuer, options.client)
        fastify.log.debug(client.metadata, 'OpenID client metadata')
        fastify.log.trace(
          `decorating \`fastify[${String(options.client.decorator)}]\` with OpenID client`
        )
        fastify.decorate(options.client.decorator, client)
      }
    },
    {
      fastify: '4.x',
      name: 'fastify-openid-client'
    }
  )

export default openIDClientPlugin
