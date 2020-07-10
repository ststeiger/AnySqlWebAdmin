
// https://www.codeproject.com/Tips/823670/Csharp-Light-and-Fast-CSV-Parser
namespace BlueMine.Data
{

    export class ObjectDisposedException
        extends Error
    {
        constructor(message: string)
        {
            super(message);
            this.name = "ObjectDisposedException";
            // Set the prototype explicitly.
            Object.setPrototypeOf(this, ObjectDisposedException.prototype);
        }

    }


    export class ArgumentNullException
        extends Error
    {
        constructor(message: string)
        {
            super(message);
            this.name = "ArgumentNullException";
            // Set the prototype explicitly.
            Object.setPrototypeOf(this, ObjectDisposedException.prototype);
        }

    }

    


    export class StringReader
    {
        private m_source: string;
        private m_nextChar: number;
        private m_sourceLength: number;
        private m_errorMessage: string;


        constructor(source: string)
        {
            this.m_source = source;
            this.m_nextChar = 0;
            this.m_sourceLength = source.length;
            this.m_errorMessage = "Cannot read from a closed CsvReader";
        }


        public Read(): string
        {
            if (this.m_source == null)
                throw new ObjectDisposedException(this.m_errorMessage);

            if (this.m_nextChar >= this.m_sourceLength)
                return String.fromCharCode(-1);

            return this.m_source[this.m_nextChar++];
        }


        public Peek(): string
        {
            if (this.m_source == null)
                throw new ObjectDisposedException(this.m_errorMessage);

            if (this.m_nextChar >= this.m_sourceLength)
                return String.fromCharCode(-1);

            return this.m_source[this.m_nextChar];
        }


        public PeekNum(): number
        {

            if (this.m_nextChar >= this.m_sourceLength)
                return -1;

            this.m_source.charCodeAt(this.m_nextChar);
        }


        public ReadToEnd():string
        {
            let toEnd: string = this.m_source.substr(this.m_nextChar, this.m_sourceLength - this.m_nextChar);
            this.m_nextChar = this.m_sourceLength;
            return toEnd;
        }


        // https://searchcode.com/codesearch/raw/25342566/
        // The method will read up to count characters from the StringReader
        // into the buffer character array starting at position index. Returns
        // the actual number of characters read, or zero if the end of the string
        // has been reached and no characters are read.
        public Read2(buffer: string, index: number, count: number): { "charsRead": number, "buffer":string}
        {
            if (this.m_source== null) throw new ObjectDisposedException(this.m_errorMessage);

            // if (buffer == null) throw new ArgumentNullException("buffer");
            // if (buffer.length - index < count) throw new ArgumentException();
            // if (index < 0 || count < 0) throw new ArgumentOutOfRangeException();

            let charsToRead:number;

            // reordered to avoir possible integer overflow
            if (this.m_nextChar > this.m_sourceLength - count)
                charsToRead = this.m_sourceLength - this.m_nextChar;
            else
                charsToRead = count;

            // this.m_source.CopyTo(sourceIndex, destination, destinationIndex, count);
            // this.m_source.CopyTo(this.m_nextChar, buffer, index, charsToRead);

            let sub = this.m_source.substr(this.m_nextChar, charsToRead)
            let prebuffer = buffer.substr(0, index);
            let postBuffer = buffer.substr(index + sub.length);
            let newBuffer = prebuffer + sub + postBuffer;

            this.m_nextChar += charsToRead;

            // return charsToRead;
            return { "charsRead": charsToRead, "buffer": newBuffer };
        }


        public Dispose(): void
        {
            this.m_source = null;
            this.m_errorMessage = null;
        }


    }





    //public static List<List<string>> ParseSimple(System.IO.TextReader reader, char delimiter, char qualifier)
    export function ParseSimple(reader: StringReader, delimiter: string, qualifier: string): string[][]
    {
        let ls: string[][] = [];
        let inQuote: boolean = false;
        let record: string[] = [];

        let sb: string[] = [];
        while (reader.PeekNum() != -1)
        {
            var readChar = reader.Read();

            if (readChar == '\n' || (readChar == '\r' && reader.Peek() == '\n'))
            {
                // If it's a \r\n combo consume the \n part and throw it away.
                if (readChar == '\r')
                    reader.Read();

                if (inQuote)
                {
                    if (readChar == '\r')
                        sb.push('\r');
                    sb.push('\n');
                }
                else
                {
                    if (record.length > 0 || sb.length > 0)
                    {
                        record.push(sb.join(''));
                        sb = []; 
                    }

                    if (record.length > 0)
                    {
                        ls.push(record);
                    }

                    record = [];
                }
            }
            else if (sb.length == 0 && !inQuote)
            {
                if (readChar == qualifier)
                    inQuote = true;
                else if (readChar == delimiter)
                {
                    record.push(sb.join(''));
                    sb = []; 
                }
                else if (/\s/.test(readChar))
                {
                    // Ignore leading whitespace
                }
                else
                    sb.push(readChar);
            }
            else if (readChar == delimiter)
            {
                if (inQuote)
                    sb.push(delimiter);
                else
                {
                    record.push(sb.join(''));
                    sb = []; 
                }
            }
            else if (readChar == qualifier)
            {
                if (inQuote)
                {
                    if (reader.Peek() == qualifier)
                    {
                        reader.Read();
                        sb.push(qualifier);
                    }
                    else
                        inQuote = false;
                }
                else
                    sb.push(readChar);
            }
            else
                sb.push(readChar);
        }

        if (record.length > 0 || sb.length > 0)
        {
            record.push(sb.join(''));
        }


        if (record.length > 0)
        {
            ls.push(record);
        }

        return ls;
    }





    export function* Parse(reader: StringReader, delimiter: string, qualifier: string) 
        : Iterator<string[]>
    {
        let inQuote: boolean = false;
        let record: string[]= [];
        let sb: string[] = [];

        while (reader.PeekNum() != -1)
        {
            var readChar = reader.Read();

            if (readChar == '\n' || (readChar == '\r' && reader.Peek() == '\n'))
            {
                // If it's a \r\n combo consume the \n part and throw it away.
                if (readChar == '\r')
                    reader.Read();

                if (inQuote)
                {
                    if (readChar == '\r')
                        sb.push('\r');
                    sb.push('\n');
                }
                else
                {
                    if (record.length > 0 || sb.length > 0)
                    {
                        record.push(sb.join(''));
                        sb = [];
                    }

                    if (record.length > 0)
                        yield record;

                    record = [];
                }
            }
            else if (sb.length == 0 && !inQuote)
            {
                if (readChar == qualifier)
                    inQuote = true;
                else if (readChar == delimiter)
                {
                    record.push(sb.join(''));
                    sb = [];
                }
                // else if (char.IsWhiteSpace(readChar))
                else if (/\s/.test(readChar))
                {
                    // Ignore leading whitespace
                }
                else
                    sb.push(readChar);
            }
            else if (readChar == delimiter)
            {
                if (inQuote)
                    sb.push(delimiter);
                else
                {
                    record.push(sb.join(''));
                    sb = [];
                }
            }
            else if (readChar == qualifier)
            {
                if (inQuote)
                {
                    if (reader.Peek() == qualifier)
                    {
                        reader.Read();
                        sb.push(qualifier);
                    }
                        else
                    inQuote = false;
                }
                else
                    sb.push(readChar);
            }
            else
                sb.push(readChar);
        }

        if (record.length > 0 || sb.length > 0)
            record.push(sb.join(''));

        if (record.length > 0)
            yield record;
    }


    function* EnumerateTail(en: Iterator<string[]>)
        : Iterable<string[]>
    {
        let r = en.next();
        
        while (!r.done)
        {
            yield r.value;
            r = en.next();
        }

    }


    function HeadAndTail<T>(source: Iterator<string[]>)
        : { "head": string[], "tail": Iterable<string[]> }
    {
        if (source == null) throw new ArgumentNullException("source");
        let head: string[] = source.next().value;
        return { "head": head, "tail": EnumerateTail(source) };
    }



    export function ParseHeadAndTail(reader: StringReader, delimiter: string, qualifier: string)
    {
        return HeadAndTail(Parse(reader, delimiter, qualifier));
    }


    
    //public static System.Collections.Generic.IEnumerable<int> generateList(int index)
    //{
    //    while (index < 2)
    //    {
    //        yield return index;
    //        index++;
    //    }
    //}

    //export function* generateList(index:number): Iterator<number>
    //{
    //    while (index < 2)
    //    {
    //        yield index;
    //        index++;
    //    }
    //}


    // https://www.codeproject.com/Articles/685310/Simple-and-Fast-CSV-Library-in-Csharp
    export function test()
    {
        let foo: string = `abc	def	ghi
helloWolrd		
"Hello	World"	test1	test2
"""Hello	World"""	test3	test4
	"""Hello	Hell"""	`;

        // foo = `abc	def	ghi`;

        let reader: StringReader = new StringReader(foo);
        let delimiter: string = "\t";
        let qualifier: string = '"';

        //let result: string[][] = ParseSimple(reader, delimiter, qualifier);
        // console.log("parsed csv:", result);

        let a = ParseHeadAndTail(reader, delimiter, qualifier);

        for (let i = 0; i < a.head.length; ++i)
        {
            console.log(i, a.head[i]);
        }


        //for (let value in a.tail)
        for (let value of a.tail)
        {
            console.log("value", value);
        }

        // BlueMine.Data.test();



    }


}
