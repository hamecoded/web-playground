# Web Playground
This is a simple boilerplate helper for your everyday web experiments.
To add a test:
- create a new js file under the `js/tests` dir
- import it's exports to `index.js`.
- In `index.js` add your test as string in the top level array. *You can use select optgroup and assign them a name by prepending to the array their name along with the | sign.*
```Javascript
//index.js
let tests = [
"|Some Group Title", "someFunc",
...
];

import {someFunc} from 'js/tests/testfile.js';

```

- your test js file will need to export a function defining your test and which returns an Object in the form:
```Javascript
//js/tests/testfile.js
export function someFunc () {
	...
	return {
		value: yourTestOutcomeToBePrinted,
		description: "description of what the test performed",
		code: "..someString", //would get syntax highlighted and executed if 'value' wasn't provided
		link: "some info url", //would get opened on a seperate window
		type: "string" //incase you'd like to print it out on the screen otherwize console log would do the job
	}
}
```

- Incase you also need some initial markup add to your `index.html` a template block with id `someFuncTemplate`

```html
<!--index.html-->
<template id="someFuncTemplate">
	<div class='a' id="e1">
	    ...
	</div>
</template>

```

- In addition, you can operate against the return value using devtool by accessing `window.o`.

*(The project uses the not yet supported ES6 module loading via Babel experimental module.)*

*(console.log is customized to print out to the browser, you can silent it by passing `false` to a 3rd argument.)

## Prerequisites
- compass
- npm
- [local web server](https://www.npmjs.com/package/local-web-server) - though installed locally through npm it is recommended to be installed globally as a cli command.

## Run
- run `npm install`
- run `npm start` (*which actually executes `compass watch & ws`*)

## Utilizing
[highlightjs.org](https://highlightjs.org/)
[jjsonviewer](https://github.com/Shridhad/jjsonviewer)
[browser-es-module-loader](https://github.com/ModuleLoader/browser-es-module-loader)
