set100vh()
window.onresize = function(){
  set100vh()
}

function set100vh(){
  document.documentElement.style.setProperty('--100vh', window.innerHeight + 'px' )
}

function isEmpty(input){
  if ( typeof input === 'boolean' ) {
    if (input === false) return true;
  }
  if ( input === null ) return true;
  if ( typeof input === 'undefined' ) return true;
  if ( typeof input === 'number' ){
    if (input === 0) return true;
  }
  if ( typeof input === 'string' ){
    if (input.length === 0) return true;
  }
  if ( typeof input === 'object' ){
    if ( Array.isArray(input) ){
      if (input.length == 0) return true;
    } else {
      let arr = Object.keys(input);
      if (arr.length == 0) return true;
    }
  }
  return false;
}

function isLocalhost(){
  return /(127.0.0.1)|(localhost)|(comebuy-pc)/.test( window.location.host )
}