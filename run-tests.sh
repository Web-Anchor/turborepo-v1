#!/bin/bash

# ⚠️ Make sure to make this file executable
# chmod +x run-tests.sh

echo "🧑‍💻 Running Headless tests..."
cd apps/docs && cypress run --headless --spec 'cypress/e2e/*.cy.ts'
