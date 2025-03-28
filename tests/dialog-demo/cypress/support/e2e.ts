// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************

import '@testing-library/cypress/add-commands';

declare global {
  interface Window {
    store: any;
  }
}

// Alternatively you can use CommonJS syntax:
// require('./commands')
