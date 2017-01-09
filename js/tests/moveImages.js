
export function transferUniqueImages(){
  
  return {
    description: 'get all IMG elements off a given root node and transfer all uniques by soft attribute color-average and otherwize a more consty hash function off the binary image data.',
    code: ` 
function getImageHash(img) {
  return "798e6d533e870cefd1f04ea39f80d93d";
}

function transferUniqueImages(offscreen, target){  
  var softMap = {};           // key: average color value:el
  var pkMap = {};             // key: imageHash value:el
  var softMapProcessed =  {}; // key:softKey value:boolean
  var imgs = offscreen.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; i++) {
    var el = imgs[i];
    var softKey = el.dataset.avgcolor;
    
    var elInMap = softMap[softKey];
    if (elInMap) {
      var elPk = getImageHash(el);
      if(!pkMap[elPk]){
        // avoid upon third and more occurances
        if( !softMapProcessed[softKey] ){
           var elPk_orig = getImageHash(elInMap);
           pkMap[elPk_orig] = elInMap;
        }
        softMapProcessed[softKey] = true;
        
        // introduce new image
        pkMap[elPk] = el;
        target.appendChild(el);
      }
    }else{
      softMap[softKey] = el;
      target.appendChild(el);
    }
  };  
}
  
transferUniqueImages( document.getElementById('root'), 
                      document.getElementById('target') );  
  `
  };
}
  