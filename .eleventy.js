module.exports = function (eleventyConfig) {
  return {
    templateFormats: ['njk', 'html'],
    htmlTemplateEngine: 'njk',
    dir: {
        input: 'src',
        output: '_site'
    }
  }
}
  