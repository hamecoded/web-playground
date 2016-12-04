//see snd and 3rd answers in
//http://stackoverflow.com/questions/4166616/understanding-the-difference-between-object-create-and-new-somefunction


export function doInheritance(solution = "2"){
      function Base(){
          this.baseAttr = solution;
          console.log('>>Base constructor');
      };

      //not using the json notation will have the devtool debugger show the prototype name rather than just Object so better use it for debugging verbosity
      Base.prototype.eat = function(){
         console.log(">>Base eat");
      };

      function Derived(){
          this.derivedAttr = "melafefon";
          Base.call(this); //will bring about a cheat where baseAttr would be defined on Derived attributes rather with accordance to the prototype chain.
          console.log('>>Derived constructor');
      }

      switch(solution){
        case "1":
          //no prototype chaining: derived will have Object as it's prototype not Base
          Derived.prototype= Base.prototype;
          break;
        case "2":
          //subclass extends superclass: 
          //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
          Derived.prototype = Object.create(Base.prototype);
          Derived.prototype.constructor = Derived;
          break;
        case "3":
          Derived.prototype = new Base();
          break;
        case "4":
          console.log("With the class keyword");
          break;
        case "5":
          Derived.prototype = Object.create(Base.prototype, {
            // foo is a regular 'value property'
            foo: { writable: true, configurable: true, value: 'hello' },
            // bar is a getter-and-setter (accessor) property
            cantTouchMe: {
              configurable: false,
              get: function() { return 10; },
              set: function(value) { console.log('[Optional setter can do without]. Attempt to rewrite `cantTouchMe` to', value); }
            }
          });
          Derived.prototype.constructor = Derived;
          break;
          
      }

      var derived = new Derived ();
      console.log("Derived.constructor: ", Derived.constructor);
      console.log("Derived.prototype.constructor: ", Derived.prototype.constructor);
      console.log("Derived.prototype: ", Derived.prototype);
      console.log("Is the prototype of Base found in an instance of Derived? ", Base.prototype.isPrototypeOf(derived));
      console.log('Is derived an instance of Derived?', derived instanceof Derived);// true
      console.log('Is derived an instance of Base?', derived instanceof Base);// true
};
