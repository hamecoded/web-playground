# Web Playground
This is a simple boilerplate helper for your everyday web experiments.
It uses the not yet supported ES6 module loading via Babel experimental module.
You create a new js file under the `js/tests` dir, and import it's exports to `index.js`.
In `index.js` you add your test as string in the top level array, and your js file need to export a function which would define your test and return an Object in the form:
```Javascript
export function someFunc () {
	...
	return {
		value: yourTestOutcomeToBePrinted,
		description: "description of what the test performed"
	}
}
```

## Prerequisites
- compass
- npm
- [local web server](https://www.npmjs.com/package/local-web-server)

## Run
- run `npm install`
- run `npm start` (*which actually executes `compass watch & ws`*)
