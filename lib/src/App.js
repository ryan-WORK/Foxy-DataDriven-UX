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
            'id': 'Szabi0',
            'lastname':'title',
            'jobt':'0 body inspector',
            'twitter': '@something0'
            },
             {
            'pk':3,
            'id': 'Szabi2',
            'lastname':'title',
            'jobt':'3 body inspector',
            'twitter': '@something3'
            },
            {
            'pk':2,
            'id': 'Szabi2',
            'lastname':'title',
            'jobt':'2 body inspector',
            'twitter': '@something2'
            },
                        {
            'pk':4,
            'id': 'Szabi4',
            'lastname':'title',
            'jobt':'4 body inspector',
            'twitter': '@something4'
            },
             {
            'pk':5,
            'id': 'Szabi5',
            'lastname':'title',
            'jobt':'5 body inspector',
            'twitter': '@something5'
            },
            {
            'pk':7,
            'id': 'Szabi7',
            'lastname':'title',
            'jobt':'7 body inspector',
            'twitter': '@something7'
            },
                        {
            'pk':6,
            'id': 'Szabi6',
            'lastname':'title',
            'jobt':'6 body inspector',
            'twitter': '@something6'
            },
             {
            'pk':9,
            'id': 'Szabi9',
            'lastname':'title',
            'jobt':'9 body inspector',
            'twitter': '@something9'
            },
            {
            'pk':8,
            'id': 'Szabi8',
            'lastname':'title',
            'jobt':'8 body inspector',
            'twitter': '@something8'
            },
            {
            'pk':10,
            'id': 'Szabi10',
            'lastname':'title',
            'jobt':'10 body inspector',
            'twitter': '@something10'
            },
             {
            'pk':11,
            'id': 'Szabi11',
            'lastname':'title',
            'jobt':'11 body inspector',
            'twitter': '@something11'
            },
            {
            'pk':12,
            'id': 'Szabi12',
            'lastname':'title',
            'jobt':'12 body inspector',
            'twitter': '@something12'
            },
            {
            'pk':1,
            'id': 'Szabi1',
            'lastname':'title',
            'jobt':'1 body inspector',
            'twitter': '@something1'
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
                <FoxyTables items={dataProps}
                    // tableCustomPaginate={true}
                    // makePaginate={true}
                           // bottomTableStyle={sb}
                           // rowStyle={rs}
                           // headerStyle={styles}
                   >
              <FoxyColumn id={'jobt'}
                          canSort={true}
                          colTitle={'Job Title'}
                          hidden={false}/>
              <FoxyColumn id={'id'}
                          colTitle={'Name'}
                          hidden={false}/>
              <FoxyColumn id={'pk'}
                          canSort={true}
                          colTitle={'PK'}
                          hidden={false}/>
</FoxyTables>

      </div>
    );
  }
}

export default App;
