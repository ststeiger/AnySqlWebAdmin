
namespace Tools 
{

    interface Dictionary<T>
    {
        [key: string]: T;
    }
    
    
    export class UrlModifier
    {
        public url: string;
        public hash: string;
        
        public keys: string[];
        public values: Dictionary<string>;
        protected m_caseSensitive:boolean;


        get queryString(): string
        {
            let qs = "";

            for (let i = 0; i < this.keys.length; ++i)
            {
                qs += (i === 0 ? "?" : "&") 
                    + encodeURIComponent(this.keys[i])
                     + "=" + encodeURIComponent(this.values[this.keys[i]]);
            } // Next i
            
            return qs;
        } // End Property queryString 


        constructor(url:string, caseSensitive?: boolean)
        {
            this.autoBind(this);

            if (caseSensitive == null)
                caseSensitive = false;

            this.hash = null;
            this.keys = [];
            this.values = {};
            this.m_caseSensitive = caseSensitive;
            
            let hashStart = url.indexOf('#');
            let paramStart = url.indexOf('?');

            // Remove and save hash, if exists
            if (hashStart !== -1)
            {
                this.hash = url.substr(hashStart + 1);
                url = url.substr(0, hashStart);
            } // End if (hashStart !== -1) 

            if (paramStart < 0)
                return;

            this.url = url.substr(0, paramStart);
            let queryString = url.substr(paramStart + 1);

            let kvps = queryString.split('&');
            for (let i = 0; i < kvps.length; i++)
            {
                let kvp = kvps[i].split('=');
                
                kvp[0] = decodeURIComponent(kvp[0]);
                kvp[1] = decodeURIComponent(kvp[1]);
                
                let key = this.m_caseSensitive ? kvp[0] : kvp[0].toLowerCase();
                this.keys.push(key);
                this.values[key] = kvp[1];
            } // Next i 

        } // End Constructor 


        private autoBind(self: any) : any
        {
            for (const key of Object.getOwnPropertyNames(self.constructor.prototype))
            {
                
                if (key !== 'constructor')
                {
                    // console.log(key);

                    let isFunction = true;
                    let desc = Object.getOwnPropertyDescriptor(self.constructor.prototype, key);

                    if (desc.get != null)
                    {
                        
                        desc.get = desc.get.bind(self);
                        isFunction = false;
                    }

                    if (desc.set != null)
                    {
                        desc.set = desc.set.bind(self);
                        isFunction = false;
                    }

                    // const val = self[key]; // NO ! key could be a property ! 
                    if (isFunction && typeof(self[key]) === 'function')
                    {
                        let val = self[key];
                        self[key] = val.bind(self);
                    }
                    
                } // End if (key !== 'constructor' && typeof val === 'function') 

            } // Next key 

            return self;
        } // End Function autoBind


        public containsKey(key: string):boolean
        {
            let caseKey = this.m_caseSensitive ? key : key.toLowerCase();

            let index = this.keys.indexOf(caseKey);
            return (index > -1);
        } // End Function containsKey 


        public get(key: string): string
        {
            let caseKey = this.m_caseSensitive ? key : key.toLowerCase();
            return this.values[caseKey];
        } // End Function get 


        public set(key: string, value: string): UrlModifier
        {
            let caseKey = this.m_caseSensitive ? key : key.toLowerCase();

            let index = this.keys.indexOf(caseKey);
            if (index == -1)
            {
                this.keys.push(caseKey);
            }

            this.values[caseKey] = value;

            return this;
        } // End Function set 


        public add(key: string, value: string): UrlModifier
        {
            return this.set(key, value);
        } // End Function add 


        public remove(key: string): UrlModifier 
        {
            let caseKey = this.m_caseSensitive ? key : key.toLowerCase();

            let index = this.keys.indexOf(caseKey);
            if (index > -1)
            {
                this.keys.splice(index, 1);
            }

            delete this.values[caseKey];
            return this;
        } // End Function remove
        
        
        public encode(pd:object & {[key: string]: string}):UrlModifier
        {
            let k:string;
            for (k in pd)
                this.add(k, pd[k]);
            
            return this;
        }
        
        
        public toUrl()
        {
            let newUrl = this.url + this.queryString;
            
            if(this.hash != null)
                newUrl += "#" + this.hash;

            return newUrl;
        } // End Function toUrl 


    } // End Class UrlModifier 


} // End Namespace Tools 


// let a = new Tools.UrlModifier("https://www.youtube.com/watch?v=RkVJNOQ7B74&list=LLqYvX1BFZVm3txSbXfLfQcA&index=67#foobar");
