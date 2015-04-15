/**
 * @name onSelect/addons/jquery.js
 * @author Gidi Meir Morris, 2015
 * @version 0.0.1
 *
 * onSelect extension to turn it to a jQuery addon and remove it from the global scope
 *
 */
(function (window, document, undefined) {
	'use strict';

	// Check for onSelect and jQuery
	_onSelect = (_onSelect || window._onSelect);
	if(!_onSelect){
		throw new Error("The global onSelect utility was not found");
	}
	var _$ = (window.jQuery || window.$);
	if(!(_$ || _$.fn)){
		throw new Error("The jQuery library couldn't be found");
	}
	// remove _onSelect from the global object
	var _onSelect = _onSelect.noConflict();
	
	_$.fn.onSelect = function(handler,suppressEvents) {
	    return this.each(function() {
	        _onSelect(this,handler,suppressEvents);
	    });
	};
})(window, document);