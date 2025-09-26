
interface ITestTable1
{
    col1: string;
    col2: string;
    col3: string;
}


let associativeTable2 = [
      { "col1": "value", "col2": "value", "col3": "value3" }
    , { "col1": "value", "col2": "value", "col3": "value3" }
    , { "col1": "value", "col2": "value", "col3": "value3" }
];


let associativeTable: ITestTable1[] = [
      { "col1": "value", "col2": "value", "col3": "value3" }
    , { "col1": "value", "col2": "value", "col3": "value3" }
    , { "col1": "value", "col2": "value", "col3": "value3" }
];


// associativeTable[0].col1
class AssociativeTableWrapper1
{

    public static GetTable<T>():T[]
    {
        let obj:any[] = [];

        return <T[]>obj;
    }
}


AssociativeTableWrapper1.GetTable<ITestTable1>();
