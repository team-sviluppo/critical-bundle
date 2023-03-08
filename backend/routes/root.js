'use strict'

import fjs from 'fluent-json-schema';
const { object, string, array } = fjs;
import generateCSS, { createZip } from '../lib/index.js';
import { createReadStream } from 'node:fs';

/**
 * The Validation and Serialization documentation outlines all parameters accepted by Fastify to set up 
 * JSON Schema Validation to validate the input, and JSON Schema Serialization to optimize the output.
 * 
 * fluent-json-schema can be used to simplify this task while allowing the reuse of constants.
 * 
 * Info:
 * - https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization
 * - https://github.com/fastify/fluent-json-schema
 */
const bodyJsonSchema = object()
  .prop('host', string().required())
  .prop('urls', array().required())
  .prop('rules', array().default([]))
  .prop('screen', array().default([]));

const schemaPost = {
  body: bodyJsonSchema
}

export default async function (fastify, opts) {

  let pathZip = null;

  fastify.addHook('preHandler', async (request, reply) => {
    if (request.method == 'POST') {
      try {
        /** generate css */
        const result = await generateCSS(fastify.output, request.body);
        /** create zip file to send client */
        if (result) {
          pathZip = createZip(result, fastify.output);
          if (!pathZip)
            return reply.header('Content-Type', 'application/json')
                        .status(500)
                        .send('ERRORE: Non sono riuscito a creare i file ZIP.');
        }
        else
          return reply.header('Content-Type', 'application/json')
                      .status(500)
                      .send('ERRORE: Non sono riuscito a creare i files CSS.');
      } catch (err) {
        return reply.header('Content-Type', 'application/json')
                    .status(500)
                    .send(err);
      }
    }
  });

  /** generate css files */
  fastify.post('/generate', { schemaPost }, async (request, reply) => {
    const readStream = createReadStream(pathZip);
    reply.header('Content-Disposition', `attachment; filename=${pathZip}`); //imposta l'header di risposta per il download
    reply.header('Content-Type', 'application/zip');
    // When using async-await with stream you will need to return or await the reply object:
    return reply.status(201).send(readStream);
  });

}
