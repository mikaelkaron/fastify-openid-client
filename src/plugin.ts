import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { createClient, OpenIDCreateClientOptions } from './client';
import { createIssuer, OpenIDCreateIssuerOptions } from './issuer';

export interface FastifyOpenIDClientPluginOptions {
  issuer: { name?: string } & OpenIDCreateIssuerOptions;
  client?: { name: string } & OpenIDCreateClientOptions;
}

export const openIDClientPlugin: FastifyPluginAsync<FastifyOpenIDClientPluginOptions> =
  fp(
    async (fastify, options) => {
      const issuer = await createIssuer.call(fastify, options.issuer);
      fastify.log.debug(issuer.metadata, 'OpenID issuer metadata');
      if (options.issuer.name !== undefined) {
        fastify.log.trace(
          `decorating \`fastify[${options.issuer.name}]\` with OpenID issuer`
        );
        fastify.decorate(options.issuer.name, issuer);
      }
      if (options.client !== undefined) {
        const client = createClient.call(fastify, issuer, options.client);
        fastify.log.debug(client.metadata, 'OpenID client metadata');
        fastify.log.trace(
          `decorating \`fastify[${options.client.name}]\` with OpenID client`
        );
        fastify.decorate(options.client.name, client);
      }
    },
    {
      fastify: '3.x',
      name: 'fastify-openid-client',
    }
  );
