import type { JSONSchema7Definition } from 'json-schema';

export interface K8sResource {
    apiVersion: string;
    kind: string;
    metadata: K8sMetadata;
}

export interface K8sMetadata {
    name: string;
}

export interface K8sCrd extends K8sResource {
    kind: 'CustomResourceDefinition';
    spec: {
        group: string;
        versions: K8sCrdSpecVersion[];
        scope: 'Namespaced' | 'Cluster';
        names: {
            plural: string;
            singular: string;
            kind: string;
            shortNames: string[];
        };
    };
}

export interface K8sCrdSpecVersion {
    name: string;
    served: boolean;
    storage: boolean;
    schema: {
        openAPIV3Schema: JSONSchema7Definition;
    };
}
