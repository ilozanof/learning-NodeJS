# chat room

This small app implments a Chat server making use of _WebSockets_, and it incldes both server and client implementation.

> This project is based on the content of the Book _"Note.js in Action"_, chapter 2 _"Web application development with Node"_.

The project is NOT exactly the same as the one described in the book above though. Some changes have been made:

* This app does NOT support creating or joining _rooms_. All the messages sent by a User are boradcast to the rest of users.
* The original project mentioned above was developed using standard Javascript Here, we've used _Javascript ES06_, making use of _classes_, and also integrating _babel_ and _webpack_ for the development.

## Guides about the development.

The project has been initially created using the default skeleton for a _Node_ app:

```
npm init
```

All the _Javascrit_ and _css_ is stored in the _/src_ folder, following a similar approach to the _React_ projects. Insde _/src_, the code is broken down into _/server_ or _/client_.

The _/public/ folder stores the Client point-of-entry, which is a basic HTML page

> _NOTE: Maybe the CSS files should be placed in the /public folder too?_


## Configuring babel and webpack

These are the dependencies in the _package.json_:

```
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/node": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "babel-loader": "^8.0.5",
    "css-loader": "^2.1.0",
    "nodemon": "^1.18.10",
    "style-loader": "^0.23.1",
    "webpack": "^4.29.5",
    "webpack-cli": "^3.2.3"
  }
```

And this is the configuration for _webpack_ in _webpack.config.js_:

```
const path = require('path');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/client/')
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:['style-loader', "css-loader"]
            },
            {
                test:/\.js/,
                use:['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};
```

And we've defined the following scripts in _package.json_:


```
"build-server": "babel src/server --out-dir dist/server",
"build-client": "webpack",
"build": "npm run build-server && npm run build-client",
```

This is what _babel_ and _webpack_ do:

 * in the _build-server_ script, _babel_ will take the source code fromm the _/server_ folder and will put it into the _/dist/server_ folder, afer applying some conversion, which translates the ES06 Javascript code into ES05 code.

* in the _build-client_ script, _webpack_ will make a "build" with all the Javsacrit files contained in the _/src/client_ folder. The configuration for _webpack_ is defined in _webpack.config.js_ , and it specifies that:
  * The entry point is the _index.js_ file in the "client" part of the code.
  * The _Css_ files qwill also be imported and packed withing the bundle, using the _style-loader_ and _css-loader_ loaders.
  * The javascrit code will be packed using the _babel-loader_ loader, which means that _before_ being packed, the code will be translated to ES05 as well.

  
> NOTE: The code has been developed using JAvascript ES06, to make use of the "Class" syntax and check that _babel_ is working fine. But we've also developed another version in ES05. These other files are named uwing "_ES05" as a suffix, and they are in the code only for documentation purposes, and to compare the old-ES06 vs new-Es06 code.


# How to run the App


We have defined several _scripts_ to run the App:

```
"start": "nodemon --exec babel-node src/server/index.js",
...
"start-server": "node dist/server/index.js"
```

* The _start_ script, executes the server from the _source_ code (which is developed in Javascript ES06 syntax). Since _Node.js_ does NOT have full support for ES06, here we use first _babel_ to translate "on the fly" the code into ES05 before running it.

* The _start-server_ executes the Server directly from the _/dist_ folder, wher ethe code id suposed to have been transalted into ES06 by _babel_. So beorerunning this script, make sure you have executed _build-server_ or _build_ (which builds both server and client side).


> NOTE: The _start_ script makes use of _nodemon_ to detect changes in the source files and automatically re-start the server. But It works on the _/src_ folder, and everytime some code changes, it restart the server. The problme is that, if we change something, we are not going to see the changes inmediatly in the Client side, since the client side is using the soruce code already bundled and pacakged in the _/dist_ distribution folder.
> **WE NEED A WAY TO CHANGE THIS. HOW IS IT DONE IN THE create-react-a PLUGIN?**
