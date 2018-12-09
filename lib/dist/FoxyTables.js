'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tableMediaModule = require('./styles/tableMedia.module.css');

var _tableMediaModule2 = _interopRequireDefault(_tableMediaModule);

require('./styles/base.css');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    items: _propTypes2.default.array.isRequired,
    tableCustomPaginate: _propTypes2.default.bool,
    headerStyle: _propTypes2.default.object,
    makePaginate: _propTypes2.default.bool,
    initialPage: _propTypes2.default.number,
    bottomTableStyle: _propTypes2.default.object,
    rowStyle: _propTypes2.default.object
};

var defaultProps = {
    initialPage: 1
};

var FoxyTables = function (_Component) {
    _inherits(FoxyTables, _Component);

    function FoxyTables(props) {
        _classCallCheck(this, FoxyTables);

        var _this = _possibleConstructorReturn(this, (FoxyTables.__proto__ || Object.getPrototypeOf(FoxyTables)).call(this, props));

        _this.state = { pager: {}, pageOfItems: [], tempData: [] };
        _this.onChangePage = _this.onChangePage.bind(_this);
        _this.compareBy = _this.compareBy.bind(_this);
        _this.sortBy = _this.sortBy.bind(_this);
        return _this;
    }

    _createClass(FoxyTables, [{
        key: 'compareBy',
        value: function compareBy(key) {
            console.log("compare by", key);
            return function (a, b) {
                console.log("compare", a, b);
                console.log("c", a[key] < b[key]);
                if (a[key] < b[key]) return -1;

                if (a[key] > b[key]) return 1;
                return 0;
            };
        }
    }, {
        key: 'sortBy',
        value: function sortBy(key, stateData) {
            var arrayCopy = [].concat(_toConsumableArray(stateData));
            arrayCopy.sort(this.compareBy(key));
            console.log(arrayCopy);
            if (this.props.makePaginate) {
                return this.setState({ pageOfItems: arrayCopy });
            }
            if (!this.props.makePaginate) {
                return this.setState({ tempData: arrayCopy });
            }
        }
    }, {
        key: 'onChangePage',
        value: function onChangePage(pageOfItems) {
            // update state with new page of items
            this.setState({ pageOfItems: pageOfItems });
            this.setState({ tempData: this.props.items });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            // set page if items array isn't empty
            if (this.props.items && this.props.items.length) {
                this.setPage(this.props.initialPage);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // reset page if items array has changed
            if (this.props.items !== prevProps.items) {
                this.setPage(this.props.initialPage);
            }
        }
    }, {
        key: 'setPage',
        value: function setPage(page) {
            var items = this.props.items;
            var pager = this.state.pager;

            if (page < 1 || page > pager.totalPages) {
                return;
            }

            // get new pager object for specified page
            pager = this.getPager(items.length, page);

            // get new page of items from items array
            var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

            // update state
            this.setState({ pager: pager });

            // call change page function in parent component
            this.onChangePage(pageOfItems);
        }
    }, {
        key: 'getPager',
        value: function getPager(totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;
            // default page size is
            pageSize = pageSize || 10;
            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage = void 0,
                endPage = void 0;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            var pages = [].concat(_toConsumableArray(Array(endPage + 1 - startPage).keys())).map(function (i) {
                return startPage + i;
            });

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    }, {
        key: 'getArrLength',
        value: function getArrLength() {
            return this.state.pageOfItems.length;
        }
    }, {
        key: 'renderPagination',
        value: function renderPagination() {
            var _this2 = this;

            var tOg = _react2.default.Children.map(this.props.children, function (child, safek) {
                return {
                    'safek': safek,
                    'id': child.props.id,
                    'colTitle': child.props.colTitle,
                    'hidden': child.props.hidden,
                    'clicker': child.props.clicker,
                    'canSort': child.props.canSort
                };
            });
            var tableHeaders = tOg.map(function (column, i) {
                if (!column.hidden) {
                    if (column.canSort) {
                        return _react2.default.createElement(
                            'th',
                            { onClick: function onClick() {
                                    return _this2.sortBy(column.id, _this2.state.pageOfItems);
                                }, key: i },
                            column.colTitle,
                            ' ',
                            _react2.default.createElement(
                                'svg',
                                { width: '10', height: '10', role: 'img', viewBox: '0 0 24 24' },
                                _react2.default.createElement(
                                    'title',
                                    null,
                                    'Strava icon'
                                ),
                                _react2.default.createElement('path', { d: 'M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169' })
                            )
                        );
                    }
                    if (!column.canSort) {
                        return _react2.default.createElement(
                            'th',
                            { key: i },
                            column.colTitle
                        );
                    }
                }
            });
            var tableHeadersRef = tOg.map(function (column, i) {
                if (!column.hidden) {
                    return _react2.default.createElement(
                        'td',
                        { key: i, style: _this2.props.bottomTableStyle },
                        getDataFromDataset(column.id, _this2.state.pageOfItems, _this2.props.rowStyle)
                    );
                }
            });
            function getDataFromDataset(id, dataset, stz) {
                return dataset.map(function (column, i) {
                    return _react2.default.createElement(
                        'div',
                        { key: i, style: stz },
                        column[id]
                    );
                });
            }

            var pager = this.state.pager;

            if (!pager.pages || pager.pages.length <= 1) {
                // don't display pager if there is only 1 page
                return null;
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
                _react2.default.createElement(
                    'table',
                    null,
                    _react2.default.createElement(
                        'tbody',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'td',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'pagination' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: pager.currentPage === 1 ? 'disabled' : '' },
                                        _react2.default.createElement(
                                            'button',
                                            { onClick: function onClick() {
                                                    return _this2.setPage(1);
                                                } },
                                            'First'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: pager.currentPage === 1 ? 'disabled' : '' },
                                        _react2.default.createElement(
                                            'button',
                                            { onClick: function onClick() {
                                                    return _this2.setPage(pager.currentPage - 1);
                                                } },
                                            'Previous'
                                        )
                                    ),
                                    pager.pages.map(function (page, index) {
                                        return _react2.default.createElement(
                                            'div',
                                            { key: index, className: pager.currentPage === page ? 'active' : '' },
                                            _react2.default.createElement(
                                                'button',
                                                { onClick: function onClick() {
                                                        return _this2.setPage(page);
                                                    } },
                                                page
                                            )
                                        );
                                    }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: pager.currentPage === pager.totalPages ? 'disabled' : '' },
                                        _react2.default.createElement(
                                            'button',
                                            { onClick: function onClick() {
                                                    return _this2.setPage(pager.currentPage + 1);
                                                } },
                                            'Next'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: pager.currentPage === pager.totalPages ? 'disabled' : '' },
                                        _react2.default.createElement(
                                            'button',
                                            { onClick: function onClick() {
                                                    return _this2.setPage(pager.totalPages);
                                                } },
                                            'Last'
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                this.props.tableCustomPaginate === true ? _react2.default.createElement(
                    'table',
                    { className: _tableMediaModule2.default.table },
                    _react2.default.createElement(
                        'tbody',
                        null,
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
                    )
                ) : _react2.default.createElement('div', null)
            );
        }
    }, {
        key: 'renderNoPagination',
        value: function renderNoPagination() {
            var _this3 = this;

            var tOg = _react2.default.Children.map(this.props.children, function (child, safek) {
                return {
                    'safek': safek,
                    'id': child.props.id,
                    'colTitle': child.props.colTitle,
                    'hidden': child.props.hidden,
                    'clicker': child.props.clicker,
                    'canSort': child.props.canSort
                };
            });
            var tableHeaders = tOg.map(function (column, i) {
                if (!column.hidden) {
                    if (column.canSort) {
                        return _react2.default.createElement(
                            'th',
                            { onClick: function onClick() {
                                    return _this3.sortBy(column.id, _this3.state.tempData);
                                }, key: i },
                            column.colTitle,
                            ' ',
                            _react2.default.createElement(
                                'svg',
                                { width: '10', height: '10', role: 'img', viewBox: '0 0 24 24' },
                                _react2.default.createElement(
                                    'title',
                                    null,
                                    'Strava icon'
                                ),
                                _react2.default.createElement('path', { d: 'M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169' })
                            )
                        );
                    }
                    if (!column.canSort) {
                        return _react2.default.createElement(
                            'th',
                            { key: i },
                            column.colTitle
                        );
                    }
                }
            });
            var tableHeadersRef = tOg.map(function (column, i) {
                if (!column.hidden) {
                    return _react2.default.createElement(
                        'td',
                        { key: i, style: _this3.props.bottomTableStyle },
                        getDataFromDataset(column.id, _this3.state.tempData, _this3.props.rowStyle)
                    );
                }
            });

            function getDataFromDataset(id, dataset, stz) {
                return dataset.map(function (column, i) {
                    return _react2.default.createElement(
                        'div',
                        { key: i, style: stz },
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
                        'tbody',
                        null,
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
                    )
                ) : _react2.default.createElement('div', null)
            );
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                null,
                this.props.makePaginate === true && this.props.items.length > 10 ? this.renderPagination() : this.renderNoPagination()
            );
        }
    }]);

    return FoxyTables;
}(_react.Component);

exports.default = FoxyTables;

FoxyTables.propTypes = propTypes;
FoxyTables.defaultProps = defaultProps;