
import { generate } from 'critical';
import { sep } from 'path';
import AdmZip from 'adm-zip';

export default async function generateCSS (outputDir, host, urls, rules, screenSizes) {

  let promises = [];
  let files = []

  urls.forEach(u => {
    let url = `${host}${u}`;
    if(url === '' || url === '/') url = 'home';
    const filename = (url.replace(/\//g, '-')) + '.css';
    const pathFile = `${outputDir}${sep}${filename}`;

    files.push({
        fileName: filename,
        pathFile: pathFile
    })

    promises.push(generate({
      src: url,
      dimensions: screenSizes,
      ignore: {
          atrule: ['@font-face'],
          rule: [/url\(/,]
      },
      include: rules,
      // Output results to file
      target: {
          css: pathFile,
      }
    }))

  });

  const result = await Promise.all(promises);

  files.forEach((file, index) => {
    result[index] = {
        ...result[index],
        ...file
    }
  });

  return result;

};

export function createZip (content, pathZip) {
    let zip = new AdmZip();
    const path = `${pathZip}\cssGenerate.zip`;
    content.forEach(item => {
        zip.addFile(`${item.fileName}`, Buffer.from(item.css, "utf8"), `${item.fileName}`);
    });
    zip.writeZip(path);
    return path;
} 
