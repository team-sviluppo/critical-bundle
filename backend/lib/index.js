
import { generate } from 'critical';
import { sep } from 'path';
import AdmZip from 'adm-zip';

/**
 * Generate CSS
 * @param {*} reply 
 * @param {*} outputDir 
 * @param {*} payload 
 * @returns 
 */
export default async function generateCSS (outputDir, payload) {

  let result = [];
  let files = [];

  await payload.urls.reduce(async (a, u) => {

    try {

      let url = `${payload.host}${u.trim()}`;
      if(url === '' || url === '/') url = 'home';
      const filename = (url.replace(/\//g, '-')) + '.css';
      const pathFile = `${outputDir}${sep}${filename}`;

      files.push({
          fileName: filename,
          pathFile: pathFile
      })

      // Wait for the previous item to finish processing
      await a;

      let options = {
        src: url,
        dimensions: payload.screenSizes,
        ignore: {
            atrule: ['@font-face'],
            rule: [/url\(/,]
        },
        // Output results to file
        target: {
            css: pathFile,
        }
      }

      if (payload.rules)
        options["include"] = payload.rules

      // Process this item
      const response = await generate(options);
      result.push(response);
    } catch (e) {
      return null;
    }

  }, Promise.resolve());

  files.forEach((file, index) => {
    result[index] = {
        ...result[index],
        ...file
    }
  });

  return result;

};

/**
 * create ZIP file
 * @param {*} content 
 * @param {*} pathZip 
 * @returns 
 */
export function createZip (content, pathZip) {
    let zip = new AdmZip();

  try {

    const path = `${pathZip}\cssGenerate.zip`;
    content.forEach(item => {
        zip.addFile(`${item.fileName}`, Buffer.from(item.css, "utf8"), `${item.fileName}`);
    });
    zip.writeZip(path);
    return path;
  } catch (e) {
    return null;
  }
} 
