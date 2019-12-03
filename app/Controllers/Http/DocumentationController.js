'use strict'

const Helpers = use('Helpers')
class DocumentationController {
  async index () {
    return Helpers.publicPath()
  }
}

module.exports = DocumentationController
