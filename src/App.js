import React, { Component } from 'react';
import {FoxyTables, FoxyColumn} from "./FoxyTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }

componentDidMount() {
      this.setData();
  }


  setData(){
      this.setState( {
        data:[
            {
            'pk':0,
            'id': 'Szabi',
            'lastname':'title',
            'jobt':'1 body inspector',
            'twitter': '@something0'
            },
             {
            'pk':3,
            'id': 'Szabi2',
            'lastname':'title',
            'jobt':'2 body inspector',
            'twitter': '@something3'
            },
            {
            'pk':2,
            'id': 'Szabi3',
            'lastname':'title',
            'jobt':'3 body inspector',
            'twitter': '@something2'
            },
                        {
            'pk':4,
            'id': 'Szabi',
            'lastname':'title',
            'jobt':'1 body inspector',
            'twitter': '@something4'
            },
             {
            'pk':5,
            'id': 'Szabi2',
            'lastname':'title',
            'jobt':'2 body inspector',
            'twitter': '@something5'
            },
            {
            'pk':7,
            'id': 'Szabi3',
            'lastname':'title',
            'jobt':'3 body inspector',
            'twitter': '@something7'
            },
                        {
            'pk':6,
            'id': 'Szabi',
            'lastname':'title',
            'jobt':'1 body inspector',
            'twitter': '@something6'
            },
             {
            'pk':9,
            'id': 'Szabi9',
            'lastname':'title',
            'jobt':'2 body inspector',
            'twitter': '@something9'
            },
            {
            'pk':8,
            'id': 'Szabi8',
            'lastname':'title',
            'jobt':'3 body inspector',
            'twitter': '@something8'
            },
                        {
            'pk':10,
            'id': 'Szabi',
            'lastname':'title',
            'jobt':'1 body inspector',
            'twitter': '@something1'
            },
             {
            'pk':11,
            'id': 'Szabi2',
            'lastname':'title',
            'jobt':'2 body inspector',
            'twitter': '@something2'
            },
            {
            'pk':12,
            'id': 'Szabi3',
            'lastname':'title',
            'jobt':'3 body inspector',
            'twitter': '@something3'
            },
        ]
    })
  }

  render() {
  let styles =
      {
       background:`red`,
       borderWidth: `7px`,
       color: `black`,
       borderBottom: `4px solid #ddd`
      };
  const dataProps = this.state.data;
  let sb = {
      borderBottom: `9px solid black`
  };
  let rs = {
      borderTop: `1px solid black`,
      borderBottom: `1px solid black`
  };
    return (
      <div className="table">
               <FoxyTables tableCustomPaginate={false}
                           // makePaginate={true}
                           items={dataProps}
                           bottomTableStyle={sb}
                           rowStyle={rs}
                           headerStyle={styles}>
              <FoxyColumn id={'jobt'}
                          colTitle={'Job Title'}
                          hidden={false}/>
              <FoxyColumn id={'twitter'}
                          colTitle={'Twitter'}
                          hidden={false}/>
              <FoxyColumn id={'lastname'}
                          colTitle={'Last Name'}
                          hidden={false}/>
            </FoxyTables>
      </div>
    );
  }
}

export default App;
