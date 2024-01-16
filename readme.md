# Markdown to Triples

> Extract rich, relational data structures directly from Markdown content. An exploration in octothorpes.

## Spec ?

- Ingest all files in a source folder full of markdown.
- Transform the markdown to html, save in an output directory.
- Use [JSON-LD CLI](https://github.com/digitalbazaar/jsonld-cli) to convert all the generated html into RDF triples.
- Diff the previous output dir with the current output dir.
- Post the resulting diff to a triplestore.

## How To Do

```
  node ./index.js
  cd html
  jsonld canonize ./resource-two.html
```

