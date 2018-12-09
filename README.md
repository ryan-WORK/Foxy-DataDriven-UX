
## About

Contribute here [github](https://github.com/ryan-WORK/Foxy-DataDriven-UX)!

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install foxy-ui
```

or got to [GITHUB](https://github.com/ryan-WORK/Foxy-DataDriven-UX) for the source.

Example right [here](https://ryan-work.github.io/Foxy-DataDriven-UX/)

## example code 

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



## License

