import * as path from 'path'
import * as fs from 'fs'

import jsonld from 'jsonld'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkDirective from 'remark-directive'
import remarkAttrs from './attrs.js'
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'

let dir = './md/'
let out = './html/'

const transform = async (string) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkAttrs)
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(string)
  return file
}

const main = async () => {
  const files = fs.readdirSync(dir)
  const mdParser = files
    .map(file => fs.readFileSync(`${dir}${file}`, {
      encoding: 'utf8',
      flag: 'r'
    }))
    .map(async string => await transform(string))
  const vFile = await Promise.all([...mdParser])
  const html = vFile.map(file => file.value)

  const rdfPromises = html
    .map((html, i) => {
      let filename = files[i].split('.')[0]
      let path = `${out}${filename}.html`
      fs.writeFileSync(path, html)
      return path
    })
    // .map(async filename => await jsonld.toRDF('file:/' + path.resolve(process.cwd(), filename), {
    //   format: 'application/n-quads'
    // }))
  // const nquads = await Promise.all([...rdfPromises])
  // console.log(nquads)
}

export default main