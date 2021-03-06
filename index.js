module.exports = isCircular

/**
 * is circular utility
 * @param  {object}  obj object or array to be checked for circular references
 * @return {Boolean} true if obj is circular, false if it is not
 */
function isCircular (obj) {
  return new CircularChecker(obj).isCircular()
}

/**
 * Circular checker helper class
 * @param  {object}  obj object or array to be checked for circular references
 */
function CircularChecker (obj) {
  this.obj = obj
}
/**
 * checks whether this.obj is circular
 * @param  {object}  _obj do not pass. this param is used for recursive calls. defaults to this.obj
 * @param  {array}   a list of descendants from the root object to _obj
 * @return {Boolean} true if obj is circular, false if it is not
 */
CircularChecker.prototype.isCircular = function (_obj, seen) {
  _obj = _obj || this.obj
  seen = seen || []
  if (!(_obj instanceof Object)) {
    throw new TypeError('"obj" must be an object (or inherit from it)')
  }
  var self = this
  seen.push(_obj)

  for (var key in _obj) {
    var val = _obj[key]
    if (val instanceof Object) {
      if (~seen.indexOf(val) || self.isCircular(val, seen.slice()) ){
        return true;
      }
    }
  }

  return false
}
