import fs from 'fs';
import YAML from 'yaml';
import convertCrd from './convert';

describe('convertCrd', () => {
    it('should generate a single document schema', () => {
        const crdString = fs.readFileSync('./test_data/simpleCrd.yaml', 'utf-8');
        const crd = YAML.parse(crdString);
        const schema = convertCrd(crd);

        if (typeof schema === 'boolean') {
            fail('Schema should not be of type boolean (this is just a type assertion)');
        }

        expect(schema.title).toBe('crontabs.stable.example.com');
        expect(schema.type).toBe('object');

        // Test generated crd properties

        if (typeof schema.properties?.apiVersion === 'boolean') {
            fail('Schema should not be of type boolean (this is just a type assertion)');
        }
        expect(schema.properties?.apiVersion?.['enum']).toStrictEqual(['stable.example.com/v1']);

        if (typeof schema.properties?.kind === 'boolean') {
            fail('Schema should not be of type boolean (this is just a type assertion)');
        }
        expect(schema.properties?.kind?.['const']).toBe('CronTab');

        // Test schema inclusion

        if (schema.allOf?.length !== 1 || typeof schema.allOf[0] === 'boolean') {
            fail('Schema should have exactly one generated version that is not of type boolean');
        }

        expect(schema.allOf[0].if).toStrictEqual({
            properties: {
                apiVersion: {
                    const: 'stable.example.com/v1',
                },
            },
        });
    });
});
