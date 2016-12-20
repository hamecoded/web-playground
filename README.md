# Web Playground
This is a simple boilerplate helper for your everyday web experiments.
To add a test:
- create a new js file under the `js/tests` dir
- import it's exports to `index.js`.
- In `index.js` add your test as string in the top level array. *You can use select groups and asign them a name by prepending to the array their name along with the | sign.*
- your js file will need to export a function defining your test and which returns an Object in the form:
```Javascript
export function someFunc () {
	...
	return {
		value: yourTestOutcomeToBePrinted,
		description: "description of what the test performed"
	}
}
```

*(It uses the not yet supported ES6 module loading via Babel experimental module.)*


## Prerequisites
- compass
- npm
- [local web server](https://www.npmjs.com/package/local-web-server)

## Run
- run `npm install`
- run `npm start` (*which actually executes `compass watch & ws`*)
