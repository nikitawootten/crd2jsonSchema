import { K8sCrd } from './crd';
import type { JSONSchema7Definition } from 'json-schema';

export default function convert(crd: K8sCrd): JSONSchema7Definition {
    // version -> schema
    const schemaVersions = crd.spec.versions.reduce<Record<string, JSONSchema7Definition>>((acc, version) => {
        if (typeof version.schema.openAPIV3Schema === 'boolean') {
            throw new Error('Cannot operate on an openAPIV3Schema that contains a single root boolean element');
        }
        const spec = version.schema.openAPIV3Schema.properties?.spec;
        if (spec === undefined) {
            throw new Error('Property "spec" must be defined on the openAPIV3Schema');
        }
        acc[`${crd.spec.group}/${version.name}`] = spec;
        return acc;
    }, {});

    return {
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: crd.metadata.name,
        description: `Generated JSON schema for ${crd.spec.group}'s ${crd.spec.names.kind} CRD`,
        type: 'object',
        properties: {
            apiVersion: {
                type: 'string',
                enum: Object.keys(schemaVersions),
                description:
                    'a string that identifies the version of the schema the object should have. For CRDs this is the crdGroup/version',
            },
            kind: {
                type: 'string',
                const: crd.spec.names.kind,
                description: 'a string the identifies the kind of resource that this document represents',
            },
            metadata: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'a string that uniquely identifies this object within the current namespace',
                    },
                    labels: {
                        type: 'object',
                        description:
                            'a map of string keys and values that can be used to organize and categorize objects, for more details see https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/',
                    },
                    annotations: {
                        type: 'object',
                        description:
                            'a map of string keys and values that can be used by external tooling to store and retrieve arbitrary metadata about this object, for more details see https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/',
                    },
                },
                required: ['name'],
            },
            spec: {},
        },
        required: ['apiVersion', 'kind', 'metadata', 'spec'],
        allOf: Object.entries(schemaVersions).map(([apiVersion, schema]) => {
            return {
                if: {
                    properties: {
                        apiVersion: {
                            const: apiVersion,
                        },
                    },
                },
                then: {
                    properties: {
                        spec: schema,
                    },
                },
            };
        }),
    };
}
