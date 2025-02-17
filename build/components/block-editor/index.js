"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classnames = _interopRequireDefault(require("classnames"));
var _data = require("@wordpress/data");
var _components = require("@wordpress/components");
var _keycodes = require("@wordpress/keycodes");
var _compose = require("@wordpress/compose");
var _blockEditor = require("@wordpress/block-editor");
var _editor = require("@wordpress/editor");
var _interface = require("@wordpress/interface");
var _i18n = require("@wordpress/i18n");
var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");
var _element = require("@wordpress/element");
var _sidebar = _interopRequireDefault(require("./sidebar"));
var _visualEditor = _interopRequireDefault(require("./visual-editor"));
var _textEditor = _interopRequireDefault(require("./text-editor"));
require("./style.scss");
var _blockEditorToolbar = _interopRequireDefault(require("../block-editor-toolbar"));
var _inserterSidebar = _interopRequireDefault(require("./inserter-sidebar"));
var _listviewSidebar = _interopRequireDefault(require("./listview-sidebar"));
var _footer = _interopRequireDefault(require("./footer"));
var _actionArea = _interopRequireDefault(require("../action-area"));
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

/** @typedef {import('../../store/editor/reducer').EditorMode} EditorMode */
/** @typedef {import('../../index').BlockEditorSettings} BlockEditorSettings */
/** @typedef {import('../../index').OnMore} OnMore */

/**
 * Undo/redo
 *
 * @callback OnHistory
 */var interfaceLabels = {
  secondarySidebar: (0, _i18n.__)('Block library'),
  /* translators: accessibility text for the editor top bar landmark region. */
  header: (0, _i18n.__)('Editor top bar'),
  /* translators: accessibility text for the editor content landmark region. */
  body: (0, _i18n.__)('Editor content'),
  /* translators: accessibility text for the editor settings landmark region. */
  sidebar: (0, _i18n.__)('Editor settings'),
  /* translators: accessibility text for the editor publish landmark region. */
  actions: (0, _i18n.__)('Editor publish'),
  /* translators: accessibility text for the editor footer landmark region. */
  footer: (0, _i18n.__)('Editor footer')
};

/**
 * The editor component. Contains the visual or text editor, along with keyboard handling.
 *
 * Note: the keyboard handling is specific to this editor and *not* global
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isEditing - Are we editing in this editor?
 * @param {EditorMode} props.editorMode - Visual or code?
 * @param {BlockEditorSettings} props.settings - Settings
 * @param {Object} props.children - Child components
 * @param {OnHistory} props.undo
 * @param {OnHistory} props.redo
 * @param {OnMore} props.renderMoreMenu - Callback to render additional items in the more menu
 */
function BlockEditor(props) {
  var _settings$iso, _settings$iso2, _settings$iso$header, _settings$iso3, _settings$iso4, _settings$iso$sidebar, _settings$iso5, _settings$iso$toolbar, _settings$iso6;
  var isEditing = props.isEditing,
    editorMode = props.editorMode,
    children = props.children,
    undo = props.undo,
    redo = props.redo,
    settings = props.settings,
    renderMoreMenu = props.renderMoreMenu;
  var styles = []; // TODO: do we need hasThemeStyles support here?
  var isMobileViewport = (0, _compose.useViewportMatch)('medium', '<');
  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
  var inspectorInSidebar = (settings === null || settings === void 0 || (_settings$iso = settings.iso) === null || _settings$iso === void 0 || (_settings$iso = _settings$iso.sidebar) === null || _settings$iso === void 0 ? void 0 : _settings$iso.inspector) || false;
  var inserterInSidebar = (settings === null || settings === void 0 || (_settings$iso2 = settings.iso) === null || _settings$iso2 === void 0 || (_settings$iso2 = _settings$iso2.sidebar) === null || _settings$iso2 === void 0 ? void 0 : _settings$iso2.inserter) || false;
  var showHeader = (_settings$iso$header = settings === null || settings === void 0 || (_settings$iso3 = settings.iso) === null || _settings$iso3 === void 0 ? void 0 : _settings$iso3.header) !== null && _settings$iso$header !== void 0 ? _settings$iso$header : true;
  var showFooter = (settings === null || settings === void 0 || (_settings$iso4 = settings.iso) === null || _settings$iso4 === void 0 ? void 0 : _settings$iso4.footer) || false;
  var _useSelect = (0, _data.useSelect)(function (select) {
      var _select = select('isolated/editor'),
        isFeatureActive = _select.isFeatureActive,
        isInserterOpened = _select.isInserterOpened,
        isListViewOpened = _select.isListViewOpened,
        isOptionActive = _select.isOptionActive;
      return {
        sidebarIsOpened: !!select(_interface.store).getActiveComplementaryArea('isolated/editor'),
        fixedToolbar: isFeatureActive('fixedToolbar', settings === null || settings === void 0 ? void 0 : settings.editor.hasFixedToolbar),
        isInserterOpened: isInserterOpened(),
        isListViewOpened: isListViewOpened(),
        isFullscreenActive: isOptionActive('fullscreenMode'),
        showIconLabels: isFeatureActive('showIconLabels'),
        previousShortcut: select(_keyboardShortcuts.store).getAllShortcutKeyCombinations('core/edit-post/previous-region'),
        nextShortcut: select(_keyboardShortcuts.store).getAllShortcutKeyCombinations('core/edit-post/next-region')
      };
    }, []),
    sidebarIsOpened = _useSelect.sidebarIsOpened,
    fixedToolbar = _useSelect.fixedToolbar,
    isInserterOpened = _useSelect.isInserterOpened,
    isListViewOpened = _useSelect.isListViewOpened,
    showIconLabels = _useSelect.showIconLabels,
    isFullscreenActive = _useSelect.isFullscreenActive,
    previousShortcut = _useSelect.previousShortcut,
    nextShortcut = _useSelect.nextShortcut;
  var className = (0, _classnames["default"])('edit-post-layout', 'is-mode-' + editorMode, {
    'is-sidebar-opened': sidebarIsOpened,
    'is-inserter-opened': isInserterOpened,
    'has-fixed-toolbar': fixedToolbar,
    'show-icon-labels': showIconLabels
  });
  var secondarySidebar = function secondarySidebar() {
    if (!inserterInSidebar) {
      return null;
    }
    if (editorMode === 'visual' && isInserterOpened) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_inserterSidebar["default"], {});
    }
    if (editorMode === 'visual' && isListViewOpened) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_listviewSidebar["default"], {});
    }
    return null;
  };

  // For back-compat with older iso-editor
  (0, _element.useEffect)(function () {
    var html = document.querySelector('html');
    if (isFullscreenActive) {
      // @ts-ignore
      html.classList.add('is-fullscreen-mode');
    } else {
      // @ts-ignore
      html.classList.remove('is-fullscreen-mode');
    }
    return function () {
      if (html) {
        html.classList.remove('is-fullscreen-mode');
      }
    };
  }, [isFullscreenActive]);
  var header = showHeader ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditorToolbar["default"], {
    editorMode: editorMode,
    settings: settings,
    renderMoreMenu: renderMoreMenu
  }) : null;
  var CustomSettingsSidebar = (_settings$iso$sidebar = settings === null || settings === void 0 || (_settings$iso5 = settings.iso) === null || _settings$iso5 === void 0 || (_settings$iso5 = _settings$iso5.sidebar) === null || _settings$iso5 === void 0 ? void 0 : _settings$iso5.customComponent) !== null && _settings$iso$sidebar !== void 0 ? _settings$iso$sidebar : _sidebar["default"];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(CustomSettingsSidebar, {
      documentInspector: (_settings$iso$toolbar = settings === null || settings === void 0 || (_settings$iso6 = settings.iso) === null || _settings$iso6 === void 0 || (_settings$iso6 = _settings$iso6.toolbar) === null || _settings$iso6 === void 0 ? void 0 : _settings$iso6.documentInspector) !== null && _settings$iso$toolbar !== void 0 ? _settings$iso$toolbar : false
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_interface.FullscreenMode, {
      isActive: isFullscreenActive
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_interface.InterfaceSkeleton, {
      className: className,
      labels: interfaceLabels,
      header: header,
      secondarySidebar: secondarySidebar(),
      sidebar: (!isMobileViewport || sidebarIsOpened) && inspectorInSidebar && /*#__PURE__*/(0, _jsxRuntime.jsx)(_interface.ComplementaryArea.Slot, {
        scope: "isolated/editor"
      }),
      notices: /*#__PURE__*/(0, _jsxRuntime.jsx)(_editor.EditorSnackbars, {}),
      content: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_editor.EditorNotices, {}), isEditing && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockEditorKeyboardShortcuts, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockEditorKeyboardShortcuts.Register, {})]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_components.KeyboardShortcuts, {
          bindGlobal: false,
          shortcuts: (0, _defineProperty2["default"])((0, _defineProperty2["default"])({}, _keycodes.rawShortcut.primary('z'), undo), _keycodes.rawShortcut.primaryShift('z'), redo),
          children: [editorMode === 'visual' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
            children: [!isLargeViewport && /*#__PURE__*/(0, _jsxRuntime.jsx)(_blockEditor.BlockToolbar, {
              hideDragHandle: true
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_visualEditor["default"], {
              styles: styles
            })]
          }), editorMode === 'text' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_textEditor["default"], {})]
        }), children]
      }),
      footer: showFooter && /*#__PURE__*/(0, _jsxRuntime.jsx)(_footer["default"], {
        editorMode: editorMode
      }),
      actions: /*#__PURE__*/(0, _jsxRuntime.jsx)(_actionArea["default"].Slot, {}),
      shortcuts: {
        previous: previousShortcut,
        next: nextShortcut
      }
    })]
  });
}
var _default = exports["default"] = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('isolated/editor'),
    redo = _dispatch.redo,
    undo = _dispatch.undo;
  return {
    redo: redo,
    undo: undo
  };
})(BlockEditor);
//# sourceMappingURL=index.js.map