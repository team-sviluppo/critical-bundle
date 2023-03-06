'use strict'

import fp from 'fastify-plugin';

export default fp(async (fastify, opts) => {
  await fastify.register(import('@fastify/compress'), { inflateIfDeflated: true });
})
