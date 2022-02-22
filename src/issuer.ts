import retry, { Options } from 'async-retry';
import { FastifyInstance } from 'fastify';
import { Issuer, IssuerMetadata } from 'openid-client';

export type OpenIDCreateIssuerOptions =
  | {
      method: 'discover' | 'webfinger';
      issuer: string;
      retry?: Options;
    }
  | {
      method: 'static';
      metadata: IssuerMetadata;
    }
  | {
      method: 'factory';
      issuer: (this: FastifyInstance) => Promise<Issuer>;
    };

export const createIssuer = async function (
  this: FastifyInstance,
  options: OpenIDCreateIssuerOptions
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

    case 'factory':
      return await options.issuer.call(this);
  }
};
