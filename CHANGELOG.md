# [7.0.0](https://github.com/mikaelkaron/fastify-openid-client/compare/v6.0.0...v7.0.0) (2024-02-20)


### Bug Fixes

* **package:** make `fastify` a development dependency ([5358d5f](https://github.com/mikaelkaron/fastify-openid-client/commit/5358d5f0742333c7eabd255cd5aa72ed35fba311))


### Features

* export `openIDClientPlugin` and `fp(openIDClientPlugin)` separately for `fastify-plugin@4.5.1` compatibility. ([7ee7cd5](https://github.com/mikaelkaron/fastify-openid-client/commit/7ee7cd59208c4e67ec3a240fee7204e04446bd4c))


### BREAKING CHANGES

* This changes the default export for the plugin. Should be safe to upgrade for most users that use the `default` export.

# [6.0.0](https://github.com/mikaelkaron/fastify-openid-client/compare/v5.0.0...v6.0.0) (2023-07-05)


### Bug Fixes

* don't leak `decorator` outside plugin ([169cc31](https://github.com/mikaelkaron/fastify-openid-client/commit/169cc319df44a9c2efccd9f967e5b1112da3246e))
* remove unused `name` from `OpenIDCreateClientOptions` ([b90180f](https://github.com/mikaelkaron/fastify-openid-client/commit/b90180f788ba31bba5406dfd16ce7a362e8c0b8b))


### Features

* **package:** package as `ESM` ([d157865](https://github.com/mikaelkaron/fastify-openid-client/commit/d15786594433e453262f5ba63086f8b064ad2d2f))


### BREAKING CHANGES

* exported `OpenIDCreateClientOptions` no longer has the `name` property
* **package:** This package is now `ESM` only

# [5.0.0](https://github.com/mikaelkaron/fastify-openid-client/compare/v4.0.0...v5.0.0) (2023-07-05)


### Features

* revamp types and options ([78a7bf2](https://github.com/mikaelkaron/fastify-openid-client/commit/78a7bf23d17ab95c29d489057c5210eaa9583bbd))


### BREAKING CHANGES

* `name` is now called `decorator` and accepts `string | symbol`

# [4.0.0](https://github.com/mikaelkaron/fastify-openid-client/compare/v3.0.1...v4.0.0) (2023-07-04)


### Build System

* **package:** bump deps ([dfec18d](https://github.com/mikaelkaron/fastify-openid-client/commit/dfec18d6cf9de928a8256b450f2968b7f3fd8216))


### BREAKING CHANGES

* **package:** A lot of deps had major version updates, bump accordingly

## [3.0.1](https://github.com/mikaelkaron/fastify-openid-client/compare/v3.0.0...v3.0.1) (2022-09-26)


### Bug Fixes

* move `@types/async-retry` from `devDependencies` to `dependencies` ([6998b8b](https://github.com/mikaelkaron/fastify-openid-client/commit/6998b8beb482c857ac38b50d66cc8c70c37e8a6c))

# [3.0.0](https://github.com/mikaelkaron/fastify-openid-client/compare/v2.1.0...v3.0.0) (2022-09-25)


### Bug Fixes

* auto-fix eslint ([399876d](https://github.com/mikaelkaron/fastify-openid-client/commit/399876de1f49835a5104de56a70c5dbb9f83603c))


### Features

* bump deps ([39d9d54](https://github.com/mikaelkaron/fastify-openid-client/commit/39d9d5428171754952c0a5d7ba2ae833ac002ace))


### BREAKING CHANGES

* This bumps `fastify@4`

# [2.1.0](https://github.com/mikaelkaron/fastify-openid-client/compare/v2.0.0...v2.1.0) (2022-02-22)


### Features

* separate plugin from index ([3f5855b](https://github.com/mikaelkaron/fastify-openid-client/commit/3f5855bd6ad1dddf35659fec48124f1c14813711))

# [2.0.0](https://github.com/mikaelkaron/fastify-openid-client/compare/v1.0.0...v2.0.0) (2022-02-22)


### Features

* add `factory` method to issuer ([1d0883f](https://github.com/mikaelkaron/fastify-openid-client/commit/1d0883fee88f505fce5a31a9cc41cfe3ce44170b))
* make client creation optional ([ef4fc7e](https://github.com/mikaelkaron/fastify-openid-client/commit/ef4fc7e522942458ff38ad7ebf71474e8acaa0f3))


### BREAKING CHANGES

* the `name` option is moved and repeated in the `issuer` and `client` options.

# 1.0.0 (2022-02-10)


### Features

* initial code ([81e1301](https://github.com/mikaelkaron/fastify-openid-client/commit/81e130164eb3ef5b31bc2a23201dfe13f608050f))
