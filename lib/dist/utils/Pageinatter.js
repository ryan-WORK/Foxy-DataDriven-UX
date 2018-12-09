'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Pagination Component
-------------------------------------------------*/

var propTypes = {
    items: React.PropTypes.array.isRequired,
    onChangePage: React.PropTypes.func.isRequired,
    initialPage: React.PropTypes.number
};

var defaultProps = {
    initialPage: 1
};

var Pagination = function (_React$Component) {
    _inherits(Pagination, _React$Component);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

        _this.state = { pager: {} };
        return _this;
    }

    _createClass(Pagination, [{
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
            this.props.onChangePage(pageOfItems);
        }
    }, {
        key: 'getPager',
        value: function getPager(totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is 10
            pageSize = pageSize || 10;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
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
        key: 'render',
        value: function render() {
            var _this2 = this;

            var pager = this.state.pager;

            if (!pager.pages || pager.pages.length <= 1) {
                // don't display pager if there is only 1 page
                return null;
            }

            return React.createElement(
                'ul',
                { className: 'pagination' },
                React.createElement(
                    'li',
                    { className: pager.currentPage === 1 ? 'disabled' : '' },
                    React.createElement(
                        'a',
                        { onClick: function onClick() {
                                return _this2.setPage(1);
                            } },
                        'First'
                    )
                ),
                React.createElement(
                    'li',
                    { className: pager.currentPage === 1 ? 'disabled' : '' },
                    React.createElement(
                        'a',
                        { onClick: function onClick() {
                                return _this2.setPage(pager.currentPage - 1);
                            } },
                        'Previous'
                    )
                ),
                pager.pages.map(function (page, index) {
                    return React.createElement(
                        'li',
                        { key: index, className: pager.currentPage === page ? 'active' : '' },
                        React.createElement(
                            'a',
                            { onClick: function onClick() {
                                    return _this2.setPage(page);
                                } },
                            page
                        )
                    );
                }),
                React.createElement(
                    'li',
                    { className: pager.currentPage === pager.totalPages ? 'disabled' : '' },
                    React.createElement(
                        'a',
                        { onClick: function onClick() {
                                return _this2.setPage(pager.currentPage + 1);
                            } },
                        'Next'
                    )
                ),
                React.createElement(
                    'li',
                    { className: pager.currentPage === pager.totalPages ? 'disabled' : '' },
                    React.createElement(
                        'a',
                        { onClick: function onClick() {
                                return _this2.setPage(pager.totalPages);
                            } },
                        'Last'
                    )
                )
            );
        }
    }]);

    return Pagination;
}(React.Component);

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

/* App Component
-------------------------------------------------*/

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App() {
        _classCallCheck(this, App);

        // an example array of items to be paged
        var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        var exampleItems = [].concat(_toConsumableArray(Array(150).keys())).map(function (i) {
            return { id: i + 1, name: 'Item ' + (i + 1) };
        });

        _this3.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        _this3.onChangePage = _this3.onChangePage.bind(_this3);
        return _this3;
    }

    _createClass(App, [{
        key: 'onChangePage',
        value: function onChangePage(pageOfItems) {
            // update state with new page of items
            this.setState({ pageOfItems: pageOfItems });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'container' },
                    React.createElement(
                        'div',
                        { className: 'text-center' },
                        React.createElement(
                            'h1',
                            null,
                            'React - Pagination Example with logic like Google'
                        ),
                        this.state.pageOfItems.map(function (item) {
                            return React.createElement(
                                'div',
                                { key: item.id },
                                item.name
                            );
                        }),
                        React.createElement(Pagination, { items: this.state.exampleItems, onChangePage: this.onChangePage })
                    )
                ),
                React.createElement('hr', null),
                React.createElement(
                    'div',
                    { className: 'credits text-center' },
                    React.createElement('p', null),
                    React.createElement('p', null)
                )
            );
        }
    }]);

    return App;
}(React.Component);

/* Render Call
-------------------------------------------------*/


ReactDOM.render(React.createElement(App, null), document.getElementById('app'));