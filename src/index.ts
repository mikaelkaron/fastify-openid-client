import retry, { Options } from 'async-retry';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { JWK } from 'jose';
import {
  Client,
  ClientMetadata,
  ClientOptions,
  Issuer,
  IssuerMetadata,
} from 'openid-client';

export interface FastifyOpenIDClientPluginOptions {
  name: string;
  issuer:
    | {
        method: 'discover' | 'webfinger';
        issuer: string;
        retry?: Options;
      }
    | {
        method: 'static';
        metadata: IssuerMetadata;
      };
  client: {
    metadata: ClientMetadata;
    jwks?: {
      keys: JWK[];
    };
    options?: ClientOptions;
  };
}

const createIssuer = async function (
  this: FastifyInstance,
  options: FastifyOpenIDClientPluginOptions['issuer']
): Promise<Issuer> {
  switch (options.method) {
    case 'discover': {
      this.log.info(`OpenID discovery started for ${options.issuer}`);
      const issuer = await retry(async (_bail, attempt) => {
        try {
          return await Issuer.discover(options.issuer);
        } catch (err) {
          this.log.warn(`OpenID discovery error #${attempt} ${String(err)}`);
          throw err;
        }
      }, options.retry);
      this.log.info(`OpenID discovery completed`);
      return issuer;
    }

    case 'webfinger': {
      this.log.info(`OpenID webfinger started for ${options.issuer}`);
      const issuer = await retry(async (_bail, attempt) => {
        try {
          return await Issuer.webfinger(options.issuer);
        } catch (err) {
          this.log.warn(`OpenID webfinger error #${attempt} ${String(err)}`);
          throw err;
        }
      }, options.retry);
      this.log.info(`OpenID webfinger completed`);
      return issuer;
    }

    case 'static':
      return new Issuer(options.metadata);
  }
};

const createClient = function (
  this: FastifyInstance,
  issuer: Issuer,
  client: FastifyOpenIDClientPluginOptions['client']
): Client {
  return new issuer.Client(client.metadata, client.jwks, client.options);
};

export const openIDClientPlugin: FastifyPluginAsync<FastifyOpenIDClientPluginOptions> =
  fp(
    async (fastify, options) => {
      const { name } = options;
      const issuer = await createIssuer.call(fastify, options.issuer);
      fastify.log.debug(issuer.metadata, 'OpenID issuer metadata');
      const client = createClient.call(fastify, issuer, options.client);
      fastify.log.debug(client.metadata, 'OpenID client metadata');
      fastify.log.trace(`decorating \`fastify[${name}]\` with OpenID client`);
      fastify.decorate(name, client);
    },
    {
      fastify: '3.x',
      name: 'fastify-openid-client',
    }
  );

export default openIDClientPlugin;
