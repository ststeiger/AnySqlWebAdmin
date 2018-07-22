
// https://stackoverflow.com/questions/11955298/use-sudo-with-password-as-parameter
// let setScriptSudo:string = "sudo chmod +s myscript";


export class TableWrapper 
{
    public rows: Array<any[]>;
    protected m_columnMap: { [columnName: string]: number; };
    protected m_columns: string[];
    protected m_columnLength:number;
    
    
    public get columnCount(): number
    {
        return this.m_columns.length;
    }


    get columns(): string[]
    {
        return this.m_columns;
    }
    set columns(cols: string[])
    {
        this.m_columnLength = cols.length;

        this.m_columnMap = null;
        this.m_columnMap = {};

        for (let i = 0; i < this.m_columnLength; ++i)
        {
            this.m_columnMap[cols[i]] = i;
        }

        this.m_columns = cols;
    }

    
    constructor(columns: string[], data: Array<any[]>)
    {
        this.item.bind(this);
        this.getIndex.bind(this);
        
        this.rows = data;
        this.columns = columns;
    }
    
    public getIndex(name:string):number
    {
        return this.m_columnMap[name];
    }
    
    public item<T>(row:number, item: string)
    {
        return <T>(this.rows[row][this.getIndex(item)]);
    }
    
}


let tab: TableWrapper = new TableWrapper(["col1","col2"], [[1,2], [3,4]]);
tab.columns=["col1","col2", "col3"];

tab.item(0, "col1");
let aaa:number = tab.item<number>(0,"abc");
let x = tab.rows[0][1];
console.log(x);



// http://fiyazhasan.me/npm-bower-nuget-gulp-the-four-horsemen-of-asp-net-core-apps/
// https://github.com/Microsoft/TypeScript/issues/17332
// https://github.com/Microsoft/TypeScript/issues/5134
