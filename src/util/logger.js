'use strict'

let isDev = process.env.NODE_ENV === 'development'

function log(s) {
  if(isDev){
    console.log(s);
  }
}

export default log
