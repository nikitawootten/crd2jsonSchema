# ![Logo](./dist/logo.png) CRD2JsonSchema

Keep the Kubernetes `CustomResourceDefinitions` that you rely on day-to-day from driving you mad by generating schemas for them!

This simple library and CLI application transforms a [`CustomResourceDefinition`](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) into a [JSON Schema](https://json-schema.org/) for easier editing.

## Usage

### As a standalone CLI application

```bash
$ npx crd2jsonschema crd.yaml > schema.json
```

### In your project

Add `CRD2JsonSchema` to your JavaScript/Typescript application:

```bash
$ npm i crd2jsonschema
```

Call the converter within your project:

```typescript
...
import convertCrd, { K8sCrd } from 'crd2jsonschema';

// Load the file
const file = fs.readFileSync('crd.yaml', 'utf-8');
// For Typescript users, validate your CRDs against K8sCrd
const crd = YAML.parse<K8sCrd>(file);

const schema = convertCrd(crd);
```

## How does it work?

Kubernetes CRDs currently use [OpenAPIv3](https://swagger.io/specification/) to define [the shape of custom objects](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#create-a-customresourcedefinition).
Thankfully OpenAPIv3 gets us 95% the way there, as it uses JSON Schema to define the shape of objects.

## Road-map

-   [x] Transform simple `CustomResourceDefinitions`
-   [ ] Handle YAML files that contain multiple documents
-   [ ] Create a GitHub page to store schemas for common CRDs
