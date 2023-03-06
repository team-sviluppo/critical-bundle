'use strict'

import fp from 'fastify-plugin';

const screenSizes = [
    {width: 320, height: 640},
    {width: 320, height: 750},
    {width: 767, height: 640},
    {width: 767, height: 850},
    {width: 991, height: 640},
    {width: 1199, height: 900},
    {width: 1199, height: 1200},
    {width: 1920, height: 1080},
    {width: 1920, height: 1440},
    {width: 2560, height: 2300},
];

export default fp(async function (fastify, opts) {
  fastify.decorate('screenSizes', screenSizes)
});