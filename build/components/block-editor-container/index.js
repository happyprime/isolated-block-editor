"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _compose = require("@wordpress/compose");
var _editor = require("@wordpress/editor");
var _data = require("@wordpress/data");
var _clickOutside = _interopRequireDefault(require("./click-outside"));
var _blockEditorContents = _interopRequireDefault(require("../block-editor-contents"));
var _hotSwapper = _interopRequireDefault(require("./hot-swapper"));
require("./style.scss");
var _jsxRuntime = require("react/jsx-runtime");
// @ts-nocheck
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../index').OnError} OnError */
/** @typedef {import('../../index').OnMore} OnMore */
/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */
/** @typedef {import('../../index').OnLoad} OnLoad */
/** @typedef {import('../block-editor-contents/index').OnUpdate} OnUpdate */

/**
 * Set editing callback
 *
 * @callback OnSetEditing
 * @param {boolean} isEditing
 */var SIZE_LARGE = 720;
var SIZE_MEDIUM = 480;

/**
 * Contains the block contents. Handles the hot-swapping of the redux stores, as well as applying the root CSS classes
 *
 * @param {Object} props - Component props
 * @param {Object} props.children - Child components
 * @param {boolean} props.isEditorReady - The editor is ready for editing
 * @param {boolean} props.isEditing - This editor is being edited in
 * @param {boolean} props.isPreview - Whether preview mode is enabled
 * @param {boolean} props.fixedToolbar - Has fixed toolbar
 * @param {EditorMode} props.editorMode - 'text' or 'visual'
 * @param {string} props.className - additional class names
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {OnError} props.onError - Error callback
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 * @param {OnSetEditing} props.setEditing - Set the mode to editing
 * @param {OnLoad} props.onLoad - Load initial blocks
 * @param {OnUpdate} [props.onInput] - Gutenberg's onInput callback
 * @param {OnUpdate} [props.onChange] - Gutenberg's onChange callback
 * @param {object[]} [props.blocks] - Gutenberg's blocks
 */
function BlockEditorContainer(props) {
  var children = props.children,
    settings = props.settings,
    className = props.className,
    onError = props.onError,
    renderMoreMenu = props.renderMoreMenu,
    onLoad = props.onLoad,
    onInput = props.onInput,
    onChange = props.onChange,
    blocks = props.blocks;
  var isEditorReady = props.isEditorReady,
    editorMode = props.editorMode,
    isEditing = props.isEditing,
    setEditing = props.setEditing,
    fixedToolbar = props.fixedToolbar,
    isPreview = props.isPreview;
  var _useResizeObserver = (0, _compose.useResizeObserver)(),
    _useResizeObserver2 = (0, _slicedToArray2["default"])(_useResizeObserver, 2),
    resizeListener = _useResizeObserver2[0],
    width = _useResizeObserver2[1].width;
  var classes = (0, _classnames2["default"])(className, (0, _defineProperty2["default"])((0, _defineProperty2["default"])({
    'iso-editor': true,
    'is-large': width ? width >= SIZE_LARGE : false,
    'is-medium': width ? width >= SIZE_MEDIUM && width < SIZE_LARGE : true,
    'is-small': width ? width < SIZE_MEDIUM : false,
    'iso-editor__loading': !isEditorReady,
    'iso-editor__selected': isEditing,
    // Match Gutenberg
    'block-editor': true,
    'edit-post-layout': true,
    'has-fixed-toolbar': fixedToolbar
  }, 'is-mode-' + editorMode, true), 'is-preview-mode', isPreview));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: classes,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_editor.ErrorBoundary, {
      onError: onError,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_hotSwapper["default"], {}), resizeListener, /*#__PURE__*/(0, _jsxRuntime.jsx)(_clickOutside["default"], {
        onOutside: function onOutside() {
          return setEditing(false);
        },
        onFocus: function onFocus() {
          return !isEditing && setEditing(true);
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditorContents["default"], {
          blocks: blocks,
          settings: settings,
          renderMoreMenu: renderMoreMenu,
          onLoad: onLoad,
          onInput: onInput,
          onChange: onChange,
          children: children
        })
      })]
    })
  });
}
var _default = exports["default"] = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref) {
  var settings = _ref.settings;
  var _select = select('isolated/editor'),
    isEditorReady = _select.isEditorReady,
    getEditorMode = _select.getEditorMode,
    isEditing = _select.isEditing,
    isFeatureActive = _select.isFeatureActive,
    isOptionActive = _select.isOptionActive;
  return {
    isEditorReady: isEditorReady(),
    editorMode: getEditorMode(),
    isEditing: isEditing(),
    fixedToolbar: isFeatureActive('fixedToolbar', settings === null || settings === void 0 ? void 0 : settings.editor.hasFixedToolbar),
    isPreview: isOptionActive('preview')
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
    setEditing = _dispatch.setEditing;
  return {
    setEditing: setEditing
  };
})])(BlockEditorContainer);
//# sourceMappingURL=index.js.map