import React, {Component} from 'react';
import styles from './styles/tableMedia.module.css';
import './styles/base.css';
import PropTypes from "prop-types";

const propTypes = {
    items: PropTypes.array.isRequired,
    tableCustomPaginate: PropTypes.bool,
    headerStyle: PropTypes.object,
    makePaginate: PropTypes.bool,
    initialPage: PropTypes.number
};

const defaultProps = {
    initialPage: 1,
};

export default class FoxyTables extends Component {
    constructor(props) {
        super(props);
        this.state = { pager: {}, pageOfItems:[], tempData:[]};
        this.onChangePage = this.onChangePage.bind(this);
        // TODO: implement
        // this.compareBy = this.compareBy.bind(this);
        // this.sortBy = this.sortBy.bind(this);
    }
// TODO: implement
// compareBy(key) {
//       console.log("compare by", key);
//     return function (a, b) {
//         console.log("compare", a,b);
//         console.log("c",(a[key] < b[key]));
//       if (a[key] < b[key]) return -1;
//
//       if (a[key] > b[key]) return 1;
//       return 0;
//     };
//   }

// sortBy(key, stateData) {
//     let arrayCopy = [...stateData];
//     arrayCopy.sort(this.compareBy(key));
//     console.log(arrayCopy);
//     if(this.props.makePaginate){
//         return this.setState({pageOfItems: arrayCopy});
//     }
//     if(!this.props.makePaginate) {
//         return this.setState({tempData: arrayCopy});
//     }
//   }

       onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
        this.setState({tempData:this.props.items});

    }
    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }
      componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }



    setPage(page) {
        let items = this.props.items;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.onChangePage(pageOfItems);

    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
         // default page size is 10
         pageSize = pageSize || 10;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
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
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

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

  getArrLength(){
      return this.state.pageOfItems.length
  }

  renderPagination(){
         const tOg = React.Children.map(this.props.children, (child, safek) => {
        return ({
            'safek':safek,
            'id': child.props.id,
            'colTitle': child.props.colTitle,
            'hidden': child.props.hidden,
            'clicker': child.props.clicker
        });
    }
      );
const tableHeaders = tOg.map((column,i)=> {
        if (!column.hidden){
            return <th key={i}>{column.colTitle}</th>
        }

    });
const tableHeadersRef = tOg.map((column,i)=> {
    if (!column.hidden) {
        return <td key={i} style={this.props.bottomTableStyle}>
            {

                getDataFromDataset(column.id, this.state.pageOfItems, this.props.rowStyle)
            }
        </td>
    }
});
function getDataFromDataset(id, dataset, stz){
return dataset.map((column,i)=> {
    return <div key={i} style={stz}>{column[id]}</div>
    });
}

  let pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
    return (
      <div>
<table className={styles.table}>
  <thead style={this.props.headerStyle}>
    {/*Table Headers from props*/}
    <tr>
        {tableHeaders}
    </tr>
  </thead>
  <tbody>
    {/*Table Body from props*/}
    {this.getArrLength() > 0 ? <tr>{tableHeadersRef}</tr>: <tr><td>No Data</td></tr>}
    </tbody>
</table>
<table>
    <tbody>
   <tr>
     <td>
       <div className="pagination">
                <div className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(1)}>First</button>
                </div>
                <div className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(pager.currentPage - 1)}>Previous</button>

               </div>
                {pager.pages.map((page, index) =>
                    <div key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <button onClick={() => this.setPage(page)}>{page}</button>
                    </div>
                )}
                <div className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(pager.currentPage + 1)}>Next</button>
                </div>
                <div className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(pager.totalPages)}>Last</button>
                </div>
      </div>
     </td>
   </tr>
    </tbody>
    </table>
      </div>
    );
  }

    renderNoPagination(){
         const tOg = React.Children.map(this.props.children, (child, safek) => {
        return ({
            'safek':safek,
            'id': child.props.id,
            'colTitle': child.props.colTitle,
            'hidden': child.props.hidden,
            'clicker': child.props.clicker
        });
    }
      );
const tableHeaders = tOg.map((column,i)=> {
        if (!column.hidden){
            return <th key={i}>{column.colTitle}</th>
        }

    });
const tableHeadersRef = tOg.map((column,i)=> {
    if (!column.hidden) {
        return <td key={i} style={this.props.bottomTableStyle}>
            {

                getDataFromDataset(column.id, this.state.tempData, this.props.rowStyle)
            }
        </td>
    }
});

function getDataFromDataset(id, dataset, stz){
return dataset.map((column,i)=> {
    return <div key={i} style={stz}>{column[id]}</div>
    });
}

    return (
      <div>
<table className={styles.table}>
  <thead style={this.props.headerStyle}>
    {/*Table Headers from props*/}
    <tr>
        {tableHeaders}
    </tr>
  </thead>
  <tbody>
    {/*Table Body from props*/}
    {this.getArrLength() > 0 ? <tr>{tableHeadersRef}</tr>: <tr><td>No Data</td></tr>}
    </tbody>
</table>
          { this.props.tableCustomPaginate === true?
              <table className={styles.table}>
                  <tbody>
                  <tr>
                      <td>
                          <button>Back</button>
                          <button>Forward</button>
                      </td>
                      <td>

                      </td>
                      <td>
                          <div>
                              1,
                              2
                          </div>
                      </td>
                  </tr>
                  </tbody>
              </table> :
              <div>
                  {/*Table No Custom*/}
              </div>
          }
      </div>
    );
  }

  render() {

    return (
      <div>
          {
              this.props.makePaginate === true? this.renderPagination() : this.renderNoPagination()
          }
      </div>
    );
  }
}
FoxyTables.propTypes = propTypes;
FoxyTables.defaultProps = defaultProps;
