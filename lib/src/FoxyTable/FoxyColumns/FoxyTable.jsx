import React, {Component} from 'react';
import styles from '../styles/tableMedia.module.css';
import '../styles/base.css';

export default class FoxyTable extends Component {
  getArrLength(){
      return this.props.items.length
  }
  render() {
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
        return <th key={i}>{column.colTitle}</th>
    });
const tableHeadersRef = tOg.map((column,i)=> {

    return  <td key={i} style={{borderBottom: `19px solid black`}}>
        {

            getDataFromDataset(column.id, this.props.items)
        }
        </td>
    });

function getDataFromDataset(id, dataset){
return dataset.map((column,i)=> {
    return <div key={i} style={{  borderTop: `19px solid #E3F1D5`, borderBottom: `19px solid #E3F1D5`}}>{column[id]}</div>
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
              </table> :
              <div>
                  Table No Custom
              </div>
          }
      </div>
    );
  }
}
