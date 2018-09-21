
'use strict';


namespace SimpleTable
{

    export interface IIndexable
    {
        [key: string]: string | boolean | number | Date | any;
    }


    export interface ColumnInfo
    {
        Key?: string;
        Label?: string;
        Formatter?: (cellData:any) => any;

        [key: string]: string | boolean | number | Date | any;
    }


    export class NonVirtual<T>
    {
        protected m_data: T[] & IIndexable[];
        protected m_columnInfo: ColumnInfo[];
        protected m_table: HTMLTableElement;


        public get data(): T[] & IIndexable[]
        {
            return this.m_data;
        }

        public set data(value: T[] & IIndexable[])
        {
            this.m_data = value;
        }



        constructor(data: T[], columnInfo: ColumnInfo[])
        {
            this.m_data = data;
            this.m_columnInfo = columnInfo;

            this.defaultFormatter = this.defaultFormatter.bind(this);
            this.reRender = this.reRender.bind(this);
            this.appendTo = this.appendTo.bind(this);
        }

        
        protected defaultFormatter(cellData: any): any
        {
            return document.createTextNode(cellData);
        }


        public reRender()
        {
            let rowCount = this.m_data.length;
            let columnCount = this.m_columnInfo.length;

            if (this.m_table != null)
                this.m_table.innerHTML = "";
            else
                this.m_table = document.createElement("table");

            let thead = document.createElement("thead");
            let tr = document.createElement("tr");

            for (let c = 0; c < columnCount; ++c)
            {
                let th = document.createElement("th");
                th.appendChild(document.createTextNode(this.m_columnInfo[c].Label));
                tr.appendChild(th);
            }
            thead.appendChild(tr);
            this.m_table.appendChild(thead);


            let tBody = document.createElement("tbody");


            for (let i = 0; i < rowCount; ++i)
            {
                tr = document.createElement("tr");

                for (let j = 0; j < columnCount; ++j)
                {
                    let data = this.m_data[i][this.m_columnInfo[j].Key];

                    let td = document.createElement("td");

                    let formatter = this.m_columnInfo[j].Formatter || this.defaultFormatter;
                    let cell = formatter(data);
                    td.appendChild(cell);

                    tr.appendChild(td);
                }

                tBody.appendChild(tr);
            }

            this.m_table.appendChild(tBody);

            let tFoot = document.createElement("tfoot");
            this.m_table.appendChild(tFoot);
        }


        public appendTo(parent:Node)
        {
            this.reRender();
            parent.appendChild(this.m_table);
        }


    }


}
