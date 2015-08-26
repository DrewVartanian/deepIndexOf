Array.prototype.deepIndexOf = function(value,key,depth){
  var keyProvided = (key !== undefined && key !== null);
  var depthProvided = (depth !== undefined && depth !== null);
  var entries={};
  this.forEach(function(entry,index){
    entries[index]={'index': index, 'depth':0, 'value':entry};
  });
  var i=0;
  var length=this.length;
  while(i<length){
    var entry=entries[i];
    var entryValue;
    if(keyProvided){
      entryValue=entry.value[key];
    }else{
      entryValue=entry.value;
    }
    if(value===entryValue){
      return entry.index;
    }
    entryValue=entry.value;
    if(typeof entryValue==='object'){
      for(var entryKey in entryValue){
        if(entryValue.hasOwnProperty(entryKey)&&
          (!depthProvided||entry.depth<depth)){
            entries[length]={'index':entry.index,
                          'depth': entry.depth+1,
                          'value':entryValue[entryKey]};
            length++;
        }
      }
    }
    delete entries[i];
    i++;
  }
  return -1;
};