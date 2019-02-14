# chat room

This small app implments a Chat server making use of _WebSockets_, and it incldes both server and client implementation.

> This project is based on the content of the Book _"Note.js in Action"_, chapter 2 _"Web application development with Node"_.

The project is NOT exactly the same as the one described in the book above though. Some notes need to be made:

* The original project is develop using standard Javascript. In order to use more _state-of-the-art_ featres, here we are using _ES06 Javascript_, which includes the use of _CLasses_, _imports_, etc.
* _ES06 Javascript_ is not fully supported by _Node_, so we had to install and configure _babel_ for this project. More details below:
* In this project we are configuring and using _babel_ from the commnandline, or through a npm script. We have configured _babel_ (is it's described further down) to generate the output files in the _/dist_ folder, so we need to add that folder to the _.gitignore_ file:

```
dist/
```

_NOTE: we are using a .gitignore file as a template, deonwloaded from the Internet, and it is already configured for working with Node.js. However, the /dist fodler is NOT exluced by default, so we have to add it manually._


## installing and configuring _babel_ from scratch.

Here are the steps that we need to follow:

1. Go to the project folder.
2. Installing _babel_: `npm install --save-dev @babel/cli @babel/core @babel/node @babel/preset-env`
4. Add a _.babelrc_ file in the root folder with thi content:
```
{
    "presets": ["@babel/preset-env"]
}
```
3. Add a _build_ script in the _package.json_ file:
```
"scripts": {
    ...
    "build": "babel src --out-dir dist"
  },
```
The previous script will take all the sources under the _/src_ folder, and it will use babel to generate the output in the _/dist_ folder.

If we want to translate the original files into ES05 standard Javascrit, we need to use this command:
```
npm run build
```

After that we can see the translated files in the _/dist_ directy, we can ven run them like we run the ones in _/src_ folder.

## configuring nodemon to re-start the aplication when a file changes.

1. first we install the module: `npm install --save-dev nodemon``
2. We add a _start_ script in the _package.json_ file:
```
  "scripts": {
    ...
    "start": "nodemon --exec babel-node src/server/index.js",
  },
```

This way, if we start the application by using `npm start`, the application (in this case, our HttpServer) will re´start everytime any fiche is changed