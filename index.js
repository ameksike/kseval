const path = require('path');

/**
 * @description Factory method to get a certain processor by name
 * @param {String} name 
 * @param {Array} params 
 * @returns {Object} instance
 */
function get(name, params = []) {
    try {
        const Cls = require(path.join(__dirname, 'src/', name));
        const obj = new Cls(...params);
        obj.Cls = Cls;
        return obj;
    }
    catch (error) {
        return null;
    }
}

module.exports = new Proxy({ get }, {
    get(target, prop) {
        return target.hasOwnProperty(prop) ? Reflect.get(...arguments) : get(prop);
    }
});