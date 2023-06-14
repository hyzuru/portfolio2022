const fs = require('fs/promises');
const path = require('path');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const dateFilter = require('nunjucks-date-filter');

const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets/images');

  eleventyConfig.addNunjucksAsyncShortcode('viteScriptTag', viteScriptTag);
  eleventyConfig.addNunjucksAsyncShortcode(
    'viteLinkStylesheetTags',
    viteLinkStylesheetTags
  );

  eleventyConfig.addFilter('renderRichTextAsHtml', (value) =>
    documentToHtmlString(value)
  );
  eleventyConfig.addNunjucksFilter('date', dateFilter);

  eleventyConfig.addShortcode('documentToHtmlString', documentToHtmlString);
  // eleventyConfig.addShortcode("contentBlock", function(contentBlock) {
  //   return `
  //     <section id="${contentBlock.fields.sectionLink}">
  //       <div>
  //         <h3>${contentBlock.fields.sectionTitle}</h3>
  //         ${ documentToHtmlString(contentBlock.fields.content) }
  //       </div>
  //     </section>`;
  // });

  // eleventyConfig.addPlugin(syntaxHighlight);
  // eleventyConfig.addPlugin(syntaxHighlight, {

  //   // Change which Eleventy template formats use syntax highlighters
  //   templateFormats: ["*"], // default

  //   // Use only a subset of template types (11ty.js added in v4.0.0)
  //   // templateFormats: ["liquid", "njk", "md", "11ty.js"],

  //   // init callback lets you customize Prism
  //   init: function({ Prism }) {
  //     Prism.languages.myCustomLanguage = /* */;
  //   },

  //   // Added in 3.1.1, add HTML attributes to the <pre> or <code> tags
  //   preAttributes: {
  //     tabindex: 0,

  //     // Added in 4.1.0 you can use callback functions too
  //     "data-language": function({ language, content, options }) {
  //       return language;
  //     }
  //   },
  //   codeAttributes: {},
  // });

  async function viteScriptTag(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    return `<script src="/${entryChunk.file}"></script>`;
  }
  async function viteLinkStylesheetTags(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    if (!entryChunk.css || entryChunk.css.length === 0) {
      console.warn(`No css found for ${entryFilename} entry. Is that correct?`);
      return '';
    }
    return entryChunk.css
      .map((cssFile) => `<link rel="stylesheet" href="/${cssFile}">`)
      .join('\n');
  }

  async function getChunkInformationFor(entryFilename) {
    if (!entryFilename) {
      throw new Error(
        'You must specify an entryFilename, so that vite-script can find the correct file.'
      );
    }

    const manifest = await fs.readFile(
      path.resolve(process.cwd(), '_site', 'manifest.json')
    );
    const parsed = JSON.parse(manifest);

    let entryChunk = parsed[entryFilename];

    if (!entryChunk) {
      const possibleEntries = Object.values(parsed)
        .filter((chunk) => chunk.isEntry === true)
        .map((chunk) => `"${chunk.src}"`)
        .join(`, `);
      throw new Error(
        `No entry for ${entryFilename} found in dist/manifest.json. Valid entries in manifest: ${possibleEntries}`
      );
    }

    return entryChunk;
  }

  return {
    templateFormats: ['njk', 'html'],
    pathPrefix: '/',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
  };
};
