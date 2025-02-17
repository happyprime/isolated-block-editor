"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ComplementaryArea;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _interface = require("@wordpress/interface");
var _components = require("@wordpress/components");
var _i18n = require("@wordpress/i18n");
var _data = require("@wordpress/data");
var _complementaryAreaHeader = _interopRequireDefault(require("./complementary-area-header"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["className", "children", "header", "headerClassName", "toggleShortcut", "closeLabel", "title", "identifier"];
/**
 * WordPress dependencies
 */
/**
 * Internal dependencies
 */
function isActiveArea(area) {
  return ['edit-post/document', 'edit-post/block'].includes(area);
}
function ComplementaryAreaFill(_ref) {
  var scope = _ref.scope,
    children = _ref.children,
    className = _ref.className;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Fill, {
    name: "ComplementaryArea/".concat(scope),
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: className,
      children: children
    })
  });
}
function ComplementaryArea(_ref2) {
  var className = _ref2.className,
    children = _ref2.children,
    header = _ref2.header,
    headerClassName = _ref2.headerClassName,
    toggleShortcut = _ref2.toggleShortcut,
    closeLabel = _ref2.closeLabel,
    title = _ref2.title,
    identifier = _ref2.identifier,
    props = (0, _objectWithoutProperties2["default"])(_ref2, _excluded);
  var scope = "isolated/editor";
  var _useSelect = (0, _data.useSelect)(function (select) {
      // @ts-ignore
      var _select = select(_interface.store),
        getActiveComplementaryArea = _select.getActiveComplementaryArea;
      var _activeArea = getActiveComplementaryArea('isolated/editor');
      return {
        postTitle: '',
        // @ts-ignore
        showIconLabels: select('isolated/editor').isFeatureActive('showIconLabels'),
        isActive: isActiveArea(_activeArea)
      };
    }, []),
    postTitle = _useSelect.postTitle,
    isActive = _useSelect.isActive;
  if (!isActive) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(ComplementaryAreaFill, {
    className: "interface-complementary-area",
    scope: "isolated/editor",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_complementaryAreaHeader["default"], {
      className: headerClassName,
      smallScreenTitle: postTitle || (0, _i18n.__)('(no title)'),
      toggleButtonProps: {
        label: closeLabel,
        shortcut: toggleShortcut,
        scope: scope,
        identifier: identifier
      },
      children: header
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.Panel, {
      className: "edit-post-sidebar",
      children: children
    })]
  });
}
//# sourceMappingURL=index.js.map