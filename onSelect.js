/**
 * @name onSelect.js
 * @author Gidi Meir Morris, 2015
 * @version 0.0.1
 *
 * onSelect A utility for listening for selection of text within different types of elements
 *
 */
(function (window, document, undefined) {
	'use strict';

	// Save the previous value of the `_onSelect` variable.
	var conflictedOnSelect = window._onSelect;

	/**
	 * The top-level namespace
	 * @namespace _onSelect
	 */
	var _onSelect = function(element,handler){
	    //make sure the element is an HTML node and that the handler is a function
	    if(!(element && element.nodeType === 1 && element.tagName)){
	        throw new Error("onSelect: The supplied element argument is not an HTML element node");
	    }
	    if(typeof handler !== typeof _onSelect){
	        throw new Error("onSelect: The supplied handler is not a valid function");
	    }
    
	    // For notetypes which support the native oSelect event we simply plug into that.
	    // For other elements we use the old trick of listening for a mouseup event and plugging into that
	    if(isElementWithOnSelectSupport(element)){
	        element.addEventListener("select", handler);
	    } else {
	        if(document.getSelection){
	            // support for modern browsers
	            element.addEventListener ("mouseup", function () {
	                var selection = document.getSelection();
	                if(selection && selection.rangeCount){
	                    handler(element,selection);
	                }
	            });
	        } else if(document.all) {
	            // if document.getSelection isn't defined, this might be an older version of IE
	            // check for that
	            document.onmouseup = function(){
	                // call handler, sending the selected content and element
	                var selection = (document.selection? document.selection.createRange() : false);
	                selection = (selection? selection.text : false);
	                if(selection){
	                    handler(element,selection);
	                }
	            };
	        } else {
	            // FUBAR
	            throw new Error("onSelect: The current browser doesn't support the required features");
	        }
	    }
	};

	/**
	* Check if the element is one of the element we know to support the native "on select" event
	*/
	function isElementWithOnSelectSupport(element){
		// get tagname in lowercase as they are returned in different cases in HTML and XHTML docs
	    var tagName = element.tagName.toLowerCase(), 
			type = element.getAttribute('type');
	    if(tagName === "textarea" || tagName === "keygen" || (tagName === "input" && (type === "text" || type === "password" || type === "file"))){
	        return true;
	    }
	    return false;
	};

	/**
	 * Revert the global window._onSelect variable to it's original value and return this _onSelect function.
	 * @example
	 <code><pre>
	 var myOnSelect = _onSelect.noConflict();
	 </pre></code>
	 */
	_onSelect.noConflict = function () {
		window._onSelect = conflictedOnSelect;
		return _onSelect;
	};

	/***
	 * Externalise
	 */
	window._onSelect = _onSelect;
})(window, document);