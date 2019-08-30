# Contributing

First of all, Pull Requests, suggestions or comments about RiotGear are all welcome and valued. To start contributing follow these steps:

## Step 1 - Fork the repo and install

```
git clone https://github.com/riotgear/rg/
cd rg
yarn install
yarn demo
```

A local copy of the riotgear demo should now be running on http://localhost:1234 (port may vary if port is already in use)

## Step 2 - Write some code

* You can modify existing tags or add a new tag in the `tags/rg-TAGNAME/rg-TAGNAME.tag` folder (where TAGNAME can be whatever you want). Then edit `all.js` to `import './tags/rg-TAGNAME/rg-TAGNAME`.

* OPTIONAL - Modify `demo/demo.tag` to include a demo of your tag. This isn't required, but will help you develop and help whoever us understand your contribution.

* OPTIONAL - Add a test file like `tags/rg-TAGNAME/rg-TAGNAME.spec.js`. You can look at the other tests for ideas for what to write. If you can't get the test runner working (we use puppeteer, which may not work on every machine), feel free to contact us. Tests are run with `yarn test` and an individual test can be run by modifying the spec file with `describe.only` or `it.only`.

## Step 3

**Submit your Pull Request to our DEV branch** so that we can review the code before merging into master.

## Sit back

At some point your changes will get merged in and we'll publish a new version of RiotGear! Yay!

### Code Conduct

We're all friends! This project adheres to the [Contriubtor Covenant](./code-of-conduct.md). By participating, you are expected to honor this code.
