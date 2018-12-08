'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tableMediaModule = require('../styles/tableMedia.module.css');

var _tableMediaModule2 = _interopRequireDefault(_tableMediaModule);

require('../styles/base.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FoxyTable = function (_Component) {
    _inherits(FoxyTable, _Component);

    function FoxyTable() {
        _classCallCheck(this, FoxyTable);

        return _possibleConstructorReturn(this, (FoxyTable.__proto__ || Object.getPrototypeOf(FoxyTable)).apply(this, arguments));
    }

    _createClass(FoxyTable, [{
        key: 'getArrLength',
        value: function getArrLength() {
            return this.props.items.length;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var tOg = _react2.default.Children.map(this.props.children, function (child, safek) {
                return {
                    'safek': safek,
                    'id': child.props.id,
                    'colTitle': child.props.colTitle,
                    'hidden': child.props.hidden,
                    'clicker': child.props.clicker
                };
            });
            var tableHeaders = tOg.map(function (column, i) {
                return _react2.default.createElement(
                    'th',
                    { key: i },
                    column.colTitle
                );
            });
            var tableHeadersRef = tOg.map(function (column, i) {

                return _react2.default.createElement(
                    'td',
                    { key: i, style: { borderBottom: '19px solid black' } },
                    getDataFromDataset(column.id, _this2.props.items)
                );
            });

            function getDataFromDataset(id, dataset) {
                return dataset.map(function (column, i) {
                    return _react2.default.createElement(
                        'div',
                        { key: i, style: { borderTop: '19px solid #E3F1D5', borderBottom: '19px solid #E3F1D5' } },
                        column[id]
                    );
                });
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'table',
                    { className: _tableMediaModule2.default.table },
                    _react2.default.createElement(
                        'thead',
                        { style: this.props.headerStyle },
                        _react2.default.createElement(
                            'tr',
                            null,
                            tableHeaders
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        this.getArrLength() > 0 ? _react2.default.createElement(
                            'tr',
                            null,
                            tableHeadersRef
                        ) : _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'td',
                                null,
                                'No Data'
                            )
                        )
                    )
                ),
                this.props.tableCustomPaginate === true ? _react2.default.createElement(
                    'table',
                    { className: _tableMediaModule2.default.table },
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'button',
                                null,
                                'Back'
                            ),
                            _react2.default.createElement(
                                'button',
                                null,
                                'Forward'
                            )
                        ),
                        _react2.default.createElement('td', null),
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'div',
                                null,
                                '1, 2'
                            )
                        )
                    )
                ) : _react2.default.createElement(
                    'div',
                    null,
                    'Table No Custom'
                )
            );
        }
    }]);

    return FoxyTable;
}(_react.Component);

exports.default = FoxyTable;