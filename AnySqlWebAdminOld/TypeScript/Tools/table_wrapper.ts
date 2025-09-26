
export module table_wrapper 
{

    interface SomeTable
    {
        col1: string;
        col2: number;
        col3: Date;
    }

    export class TableWrapper<T>
    {
        protected m_i: number;
        protected m_accessor: ProxyConstructor;

        public data: T[];
        //public columns: map<string, number>;
        public columns: { [key: string]: number };
        
        public rows: T[];

        //get bar(): boolean
        //{
        //    return null; // this._bar;
        //}
        //set bar(theBar: boolean)
        //{
        //    //this._bar = theBar;
        //}

        protected row(index:number): T
        {
            this.m_i = index;
            return <T><any>this.m_accessor;
        }


        constructor(rows: any[][], columnNames:string[])
        {
            this.data = <any>rows;
            this.m_i = 0;
            
            // this.columns = columnNames;
            this.columns = {}; // "associative array" or Object
            for (let i = 0; i < columnNames.length; ++i)
            {
                this.columns[columnNames[i]] = i;
            }


            this.row = this.row.bind(this);

            let handlerPropertyAccess: ProxyHandler<any> = {
                get: function (obj:any, prop:any, receiver:any)
                {
                    return this.obj[this.i][this.columns[prop]];
                }
            };
            handlerPropertyAccess.get = handlerPropertyAccess.get.bind(this);
            this.m_accessor = new Proxy(this.data, handlerPropertyAccess);


            let handlerIndex: ProxyHandler<any> = {
                get: function (obj:any, prop:any, receiver:any)
                {
                    return this.row(prop);
                }
            };
            handlerIndex.get = handlerIndex.get.bind(this);
            this.rows = <any>new Proxy(this.data, handlerIndex);
        }

    }


    export function testTable()
    {
        let columns = ["col1", "col2", "col3"];
        let rows = [
            ["row 1 col 1", "row 1 col 2", "row 1 col 3"]
            , ["row 2 col 1", "row 2 col 2", "row 2 col 3"]
            , ["row 3 col 1", "row 3 col 2", "row 3 col 3"]
            , ["row 4 col 1", "row 4 col 2", "row 4 col 3"]
            , ["row 5 col 1", "row 5 col 2", "row 5 col 3"]
        ];

        let x: TableWrapper<SomeTable> = new TableWrapper<SomeTable>(rows, columns);
        console.log(x.rows[0].col1);


        // console.log(x.row(1).col1);
        //console.log(x.obj[0][0]);
    }

    export function proxy()
    {
        let columns = ["col1", "col2", "col3"];
        let rows = [
              ["row 1 col 1", "row 1 col 2", "row 1 col 3"]
            , ["row 2 col 1", "row 2 col 2", "row 2 col 3"]
            , ["row 3 col 1", "row 3 col 2", "row 3 col 3"]
            , ["row 4 col 1", "row 4 col 2", "row 4 col 3"]
            , ["row 5 col 1", "row 5 col 2", "row 5 col 3"]
        ];

        let cols:any = {}; // "associative array" or Object

        for (let i = 0; i < columns.length; ++i)
        {
            cols[columns[i]] = i;
        }


        let handler2 = {
            get: function (obj:any, prop:any, receiver:any)
            {
                return obj[cols[prop]];
            }
        };

        // https://www.sitepoint.com/es6-proxies/
        let handler: ProxyHandler<any>= {
            get: function (obj:any, prop:any, receiver:any) : any 
            {
                console.log("obj:", obj, "prop:", prop, "receiver :", receiver);
                //return obj[prop];
                //return obj[cols[prop]];
                return new Proxy(obj[prop], handler2);
            }

            , set: function (obj: any, key: any, value: any) : boolean
            {
                console.log(obj, key, value);
                return true;
            }

        };

        let p = new Proxy(rows, handler);
        // p[0].col1
        // p[0].col2
        // p[1].col2
    }

    // https://caniuse.com/#feat=proxy
    // Sorry, your browser is no longer supported. 
    // If you want this program to support IE11, develop a proxy-polyfill for IE11. 
    // Hint from Babel-docs: ES2015-Proxies requires support on the engine level; it is thus not possible to polyfill Proxy on ES5.
    export function tableTest1()
    {
        let columns = ["col1", "col2", "col3"];
        let rows = [
              ["row 1 col 1", "row 1 col 2", "row 1 col 3"]
            , ["row 2 col 1", "row 2 col 2", "row 2 col 3"]
            , ["row 3 col 1", "row 3 col 2", "row 3 col 3"]
            , ["row 4 col 1", "row 4 col 2", "row 4 col 3"]
            , ["row 5 col 1", "row 5 col 2", "row 5 col 3"]
        ];

        let cols:any = {}; // "associative array" or Object

        for (let i = 0; i < columns.length; ++i)
        {
            cols[columns[i]] = i;
        }

        let index_col1 = cols["col1"];
        let index_col2 = cols["col2"];
        let index_col3 = cols["col3"];


        for (let i = 0; i < rows.length; ++i)
        {
            console.log("col1:", rows[i][index_col1], "col2:", rows[i][index_col2], "col3:", rows[i][index_col3]);
        }

    }


    export function tableTest()
    {
        let columns = ["col1", "col2", "col3"];

        let data = [
              ["row 1 col 1", "row 1 col 2", "row 1 col 3"]
            , ["row 2 col 1", "row 2 col 2", "row 2 col 3"]
            , ["row 3 col 1", "row 3 col 2", "row 3 col 3"]
            , ["row 4 col 1", "row 4 col 2", "row 4 col 3"]
            , ["row 5 col 1", "row 5 col 2", "row 5 col 3"]
        ];



        let arr = [];


        for (let j = 0; j < data.length; ++j)
        {
            let obj:any = {}; // "associative array" or Object

            for (let i = 0; i < columns.length; ++i)
            {
                obj[columns[i]] = data[j][i];
            }
            arr.push(obj);
        }



        let b = [
              { "col1": "row 1 col 1", "col2": "row 1 col 2", "col3": "row 1 col 3" }
            , { "col1": "row 2 col 1", "col2": "row 2 col 2", "col3": "row 2 col 3" }
            , { "col1": "row 3 col 1", "col2": "row 3 col 2", "col3": "row 3 col 3" }
            , { "col1": "row 4 col 1", "col2": "row 4 col 2", "col3": "row 4 col 3" }
            , { "col1": "row 5 col 1", "col2": "row 5 col 2", "col3": "row 5 col 3" }
        ];



        // JSON.stringify(data, null, 2)
        let dataJSON = `[
            [
                "row 1 col 1",
                "row 1 col 2",
                "row 1 col 3"
            ],
            [
                "row 2 col 1",
                "row 2 col 2",
                "row 2 col 3"
            ],
            [
                "row 3 col 1",
                "row 3 col 2",
                "row 3 col 3"
            ],
            [
                "row 4 col 1",
                "row 4 col 2",
                "row 4 col 3"
            ],
            [
                "row 5 col 1",
                "row 5 col 2",
                "row 5 col 3"
            ]
]`;


        // JSON.stringify(b, null, 2)

        let bb = `[
  {
    "col1": "row 1 col 1",
    "col2": "row 1 col 2",
    "col3": "row 1 col 3"
  },
  {
    "col1": "row 2 col 1",
    "col2": "row 2 col 2",
    "col3": "row 2 col 3"
  },
  {
    "col1": "row 3 col 1",
    "col2": "row 3 col 2",
    "col3": "row 3 col 3"
  },
  {
    "col1": "row 4 col 1",
    "col2": "row 4 col 2",
    "col3": "row 4 col 3"
  },
  {
    "col1": "row 5 col 1",
    "col2": "row 5 col 2",
    "col3": "row 5 col 3"
  }
]`;

    }


}
