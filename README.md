

# Getting started:

if not already installed, install node

```
npm i
```
cypress will make any locally installed compatible browser available for testing

## running  the tests

```
npm run test
```
## running without ui or any manual input
```
npm run cy:test
```

# Linkig execution results with cypress dashboard
```
cypress run --record --key 4f85ab2a-d481-4f1c-9291-a84c43f16206
```

project id is in cypress.json

# Fixes / Workarounds
for the error:
```
Failed to deserialize the V8 snapshot blob
```
```
npx cypress install --force
```