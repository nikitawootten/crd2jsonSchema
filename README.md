# ![Logo](./dist/logo.png) CRD2JsonSchema

Keep the Kubernetes `CustomResourceDefinitions` that you rely on day-to-day from driving you mad by generating schemas for them!

This simple library and CLI application transforms a [`CustomResourceDefinition`](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) into a [JSON Schema](https://json-schema.org/) for easier editing.

## How does it work?

Kubernetes CRDs currently use [OpenAPIv3](https://swagger.io/specification/) to define [the shape of custom objects](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#create-a-customresourcedefinition).
Thankfully OpenAPIv3 gets us 95% the way there, as it uses JSON Schema to define the shape of objects.

## Road-map

-   [x] Transform simple `CustomResourceDefinitions`
-   [ ] Handle YAML files that contain multiple documents
-   [ ] Create a GitHub page to store schemas for common CRDs
