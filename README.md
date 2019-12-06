# Example how to write E2E tests for a Gutenberg block in WordPress

This is a WordPress plugin which shows how to create E2E tests for a Gutenberg block in WordPress.
This blog post explains how it works: ???
Feel free to use this plugin as a starting point to create your own E2E tests in your WordPress project.

## Developer information

### Installation

1. Clone this repository

1. Install Node dependencies

    ```
    $ npm install
    ```

### Code style

Run eslint with the following command:

```
$ npm run lint
```

### Compile assets

The build process is based on the official [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/packages/packages-scripts/) package.

* `npm start`: Compiles the block in development mode. Watches for any changes and reports back any errors in your code.
* `npm run lint`: Lints JavaScript, CSS and package.json files.
* `npm run build`: Use to build production code for your block inside `build` folder.

### Puppeteer E2E Tests

The Puppeteer E2E Tests are stored in the `e2e-tests` directory.

To run the tests use the following command:

```
$ npm run test:e2e
```

or the following command to run a specific test:

```
$ npm run test:e2e -- -t 'my test'
```
