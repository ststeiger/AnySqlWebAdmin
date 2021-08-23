
interface Group {
    key: any;
    items: any[];
}

interface GroupBy {
    keys: string[];
    thenby?: GroupBy;
}

function groupBy(array: any[], grouping: GroupBy): Group[]
{
    const keys = grouping.keys;
    const groups = array.reduce((groups, item) => {
        const group = groups.find((g: { key: { [x: string]: any; }; }) => keys.every(key => item[key] === g.key[key]));
        const data = Object.getOwnPropertyNames(item)
            .filter(prop => !keys.find(key => key === prop))
            .reduce((o, key) => ({ ...o, [key]: item[key] }), {});
        return group
            ? groups.map((g: { items: any; }) => (g === group ? { ...g, items: [...g.items, data] } : g))
            : [
                ...groups,
                {
                    key: keys.reduce((o, key) => ({ ...o, [key]: item[key] }), {}),
                    items: [data]
                }
            ];
    }, []);
    return grouping.thenby ? groups.map((g: { items: any[]; }) => ({ ...g, items: groupBy(g.items, grouping.thenby) })) : groups;
}

// https://stackoverflow.com/questions/20310369/declare-a-delegate-type-in-typescript
// type Predicate<T, TKey> = (item: T) => TKey;

interface Predicate<T, TKey>  {
    (item: T): TKey;
}


function LinqGroupBy<TSource, TKey>(source: TSource[], keySelector: Predicate<TSource, TKey>)
    : { [key: string]: TSource[] }
{
    if (source == null)
        throw new Error("ArgumentNullException: Source");
    if (keySelector == null)
        throw new Error("ArgumentNullException: keySelector");

    let dict: { [key: string]: TSource[]} = {};

    for (let i = 0; i < source.length; ++i)
    {
        let key: string = keySelector(source[i]).toString();

        if (!dict.hasOwnProperty(key))
        {
            dict[key] = [];
        }

        dict[key].push(source[i]);
    }

    return dict;
}
