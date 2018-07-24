
class TableWrapper<T>
{
    public rows:any[][];
    protected m_accessor:object;
    protected m_i:number;
    
    protected m_columnMap: { [columnName: string]: number; };
    protected m_columns: string[];
    protected m_columnLength:number;
    
    
    public get rowCount(): number
    {
        return this.rows.length;
    }
    
    
    public get columnCount(): number
    {
        return this.m_columns.length;
    }
    
    
    get columns(): string[]
    {
        return this.m_columns;
    }
    
    
    protected setColumns(cols: string[])
    {
        this.m_columnLength = cols.length;
        
        this.m_columnMap = null;
        this.m_columnMap = {};
        
        for (let i = 0; i < this.m_columnLength; ++i)
        {
            this.m_columnMap[cols[i]] = i;
        }
        
        this.m_columns = cols;
    } // End Sub setColumns 


    public row(i:number):T
    {
        this.m_i = i;
        return <T><any>this.m_accessor;
    }
    
    
    public getIndex(name:string):number
    {
        return this.m_columnMap[name];
    }
    
    
    public addRow(dat:any[])
    {
        this.rows.push(dat);
        return this;
    }
    
    
    public removeRow(i:number)
    {
        this.rows.splice(i, 1);
        return this;
    }
    
    
    constructor(columns: string[], data: Array<any[]>, ignoreCase?:boolean)
    {
        if (ignoreCase == null)
            ignoreCase = true;
        
        for (let i = 0; i< columns.length; ++i)
        {
            columns[i] = columns[i].toLowerCase();
        } // Next i 
        
        
        let that = this;
        this.getIndex.bind(this);
        this.setColumns.bind(this);
        this.row.bind(this);
        this.addRow.bind(this);
        this.removeRow.bind(this);
        
        this.rows = data;
        this.setColumns(columns);
        this.m_accessor = { }; // Creates a new object
        
        
        for (let i = 0; i < columns.length; ++i)
        {
            let propName = columns[i];
            
            Object.defineProperty(this.m_accessor, propName, {
                // Using shorthand method names (ES2015 feature). 
                // get() { return bValue;}, 
                // set(value) { bValue = value;}, 
                // This is equivalent to: 
                // get: function() { return bValue; }, 
                // set: function(value) { bValue = value; }, 
                // And could be written as (getter = getter.bind(this)) 
                // get: getter, 
                // set: setter, 
                get: function ()
                { 
                    let currentRow =  <any> that.rows[that.m_i];
                    return currentRow == null ? currentRow : currentRow[i]; 
                },
                set: function(value:any) 
                { 
                    let currentRow =  <any> that.rows[that.m_i];
                    if (currentRow!= null )
                        currentRow[i] = value; 
                },
                enumerable: true,
                configurable: true
            });
        } // Next i 
        
    } // End Constructor 
    
}


/*

interface ITestTable1
{
    col1:number;
    col2:number;
}


interface ITestTable2
{
    a:number;
    b:number;
    c:number;
}


let tab: TableWrapper<ITestTable1> = new TableWrapper<ITestTable1>(["col1","col2"], [[1,2], [3,4]]);
// tab.columns=["col1","col2", "col3"];

let hi :TableWrapper<ITestTable2>= new TableWrapper<ITestTable2>(["a","b","c"], [[1,2,3],[4,5,6] ]);


console.log(tab.row(0).col1);
console.log(hi.row(0).a);
console.log(hi.row(1).b);
console.log(hi.row(0).c);

hi.row(0).a = 123;


for (let i = 0; i< hi.rowCount; ++i)
{
    for (let j=0; j < hi.columnCount; ++j)
    {
        console.log(hi.rows[i][j]);
        
        console.log(hi.row(i).a);
        console.log(hi.row(i).b);
        console.log(hi.row(i).c);
        
        console.log((<any>hi.row(i))[hi.columns[j]]);
        console.log((<any>hi.row(i))[hi.columns[j]]);
        console.log((<any>hi.row(i))[hi.columns[j]]);
    }
    
}

*/


// https://stackoverflow.com/questions/11955298/use-sudo-with-password-as-parameter
// let setScriptSudo:string = "sudo chmod +s myscript";

// http://fiyazhasan.me/npm-bower-nuget-gulp-the-four-horsemen-of-asp-net-core-apps/
// https://github.com/Microsoft/TypeScript/issues/17332
// https://github.com/Microsoft/TypeScript/issues/5134



// https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript

var a = ["a", "b", "c"];
for (let val of a)
{
    console.log(val);
}



//let it = a.values();
//var entry;
//while (!(entry = it.next()).done)
//{
//    console.log(entry.value);
//}

// var divs = Array.from(document.querySelectorAll("div"));


// https://stackoverflow.com/questions/5101948/javascript-checking-for-null-vs-undefined-and-difference-between-and/5101991#5101991
// https://stackoverflow.com/questions/13341698/javascript-plus-sign-in-front-of-function-name/13341710#13341710
// https://stackoverflow.com/questions/5786851/define-global-variable-in-a-javascript-function/5786899#5786899
// https://stackoverflow.com/users/157247/t-j-crowder


// https://hashnode.com/post/the-one-thing-that-no-one-properly-explains-about-react-why-virtual-dom-cisczhfj41bmssp53mvfwmgrq
// https://medium.com/@hayavuk/why-virtual-dom-is-slower-2d9b964b4c9e


