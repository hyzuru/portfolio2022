const fs = require("fs/promises");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets/images');

  eleventyConfig.addNunjucksAsyncShortcode("viteScriptTag", viteScriptTag);
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLinkStylesheetTags",
    viteLinkStylesheetTags
  );

  async function viteScriptTag(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    return `<script src="/${entryChunk.file}"></script>`;
  }
  async function viteLinkStylesheetTags(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    if (!entryChunk.css || entryChunk.css.length === 0) {
      console.warn(`No css found for ${entryFilename} entry. Is that correct?`);
      return "";
    }
    return entryChunk.css
      .map(
        (cssFile) =>
          `<link rel="stylesheet" href="/${cssFile}">`
      )
      .join("\n");
  }

  async function getChunkInformationFor(entryFilename) {
    if (!entryFilename) {
      throw new Error(
        "You must specify an entryFilename, so that vite-script can find the correct file."
      );
    }

    const manifest = await fs.readFile(
      path.resolve(process.cwd(), "dist", "manifest.json")
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
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
  }
}
  