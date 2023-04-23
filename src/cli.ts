import fs from 'fs';
import http from 'http';
import https from 'https';
import YAML from 'yaml';

import { program } from 'commander';

import { K8sCrd } from './crd';
import convert from './convert';

async function retrieveResource(ref: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(ref)) {
            // check if the ref is a file
            fs.readFile(ref, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        } else if (ref.match(/^https?:\/\//)) {
            const protocol = ref.startsWith('https') ? https : http;
            protocol
                .get(ref, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        resolve(data);
                    });
                })
                .on('error', (err) => {
                    reject(err);
                });
        } else {
            reject(new Error('ref must be a file path or a URL'));
        }
    });
}

program
    .name('crd2jsonSchema')
    .description('A simple utility that converts a Kubernetes CustomResourceDefinition to a JSON Schema')
    .version('0.2.0')
    .argument('<crd>', 'URI of the CRD to pull');
program.parse(process.argv);
// const options = program.opts<{}>();
const crdRef = program.args[0];

retrieveResource(crdRef)
    .then((crdString) => {
        const crd: K8sCrd = YAML.parse(crdString);
        const schema = convert(crd);
        console.log(JSON.stringify(schema, null, 2));
    })
    .catch((err) => {
        console.error(err);
    });
