(function(global, undefined) {
	'use strict';

	var document = global.document;
	var IC = global.IC;
	var key;
	if (IC.any(IC.asArray(document.getElementsByTagName('script')), function(script) {
		var securityKey = script.getAttribute('data-security-key');
		if (securityKey) {
			key = securityKey;
			return true;
		}
	})) {
		IC.CSRF.key = key;
		IC.CSRF.enhanceWindow(global, key);
		IC.CSRF.enhanceXMLHttpRequest(global, key);
		var domEnhanced = false;
		IC.CSRF.enhanceDOM = function() {
			if (!domEnhanced) {
				domEnhanced = true;
				// IC.CSRF.enhanceFrames(global, key);
				IC.CSRF.appendKeyToForms(document, key);
				IC.CSRF.appendKeyToAnchors(document, key);
			}
		};
		IC.ready(global, IC.CSRF.enhanceDOM);
	} else {
		IC.CSRF.enhanceDOM = IC.noop;
	}
}(this));
