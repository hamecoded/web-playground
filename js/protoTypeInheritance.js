//see snd and 3rd answers in
//http://stackoverflow.com/questions/4166616/understanding-the-difference-between-object-create-and-new-somefunction
function Base(){
    console.log('>>Base constructor');
};
Base.prototype.eat = function(){
   console.log(">>Base eat");
};

function Derived(){
    console.log('>>Derived constructor');
}

var solution = 2;
switch(solution){
  case 1:
    //no prototype chaining: derived will have Object as it's prototype not Base
    Derived.prototype= Base.prototype;
    break;
  case 2:
    //subclass extends superclass: 
    Derived.prototype = Object.create(Base.prototype);
    Derived.prototype.constructor = Derived;
    break;
  case 3:
    Derived.prototype = new Base();
    break;
  case 4:
    
}

var derived = new Derived ();
console.log("Derived.constructor: ", Derived.constructor);
console.log("Derived.prototype.constructor: ", Derived.prototype.constructor);
console.log("Derived.prototype: ", Derived.prototype);
console.log("Is the prototype of Base found in an instance of Derived? ", Base.prototype.isPrototypeOf(derived));
console.log('Is derived an instance of Derived?', derived instanceof Derived);// true
console.log('Is derived an instance of Base?', derived instanceof Base);// true
