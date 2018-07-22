
export namespace autoBind
{
    
    
    export function  autoBind(self: any) : any
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
    
    
    export function autoBind_old(self: any)
    {
        for (const key of Object.getOwnPropertyNames(self.constructor.prototype))
        {
            const val = self[key];

            if (key !== 'constructor' && typeof val === 'function')
            {
                // console.log(key);
                self[key] = val.bind(self);
            } // End if (key !== 'constructor' && typeof val === 'function') 

        } // Next key 

        return self;
    } // End Function autoBind
    
    
}
