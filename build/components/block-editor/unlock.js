"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unlock = void 0;
var _privateApis = require("@wordpress/private-apis");
/**
 * WordPress dependencies
 */

var latest = 'I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.';
var old = 'I know using unstable features means my theme or plugin will inevitably break in the next version of WordPress.';
var _dangerousOptInToUns = (0, _privateApis.__dangerousOptInToUnstableAPIsOnlyForCoreModules)(latest, '@wordpress/edit-post'),
  unlock = exports.unlock = _dangerousOptInToUns.unlock;
//# sourceMappingURL=unlock.js.map