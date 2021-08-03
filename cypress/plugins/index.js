// this allows multi config file structure
// reff: https://ahmed-alsaab.medium.com/configuring-cypress-to-run-on-different-environments-7ae323bb3c86

/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('.', '\cypress/env', `${file}.json`);

  return fs.readJson(pathToConfigFile);
}

module.exports = (on, config) => {
  const file = config.env.fileConfig || 'stg';

  return getConfigurationByFile(file);
};