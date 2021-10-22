
export namespace autoBind
{
    
    
    export function autoBind(self: any) : any
    {
        for (const key of Object.getOwnPropertyNames(self.constructor.prototype))
        {

            if (key !== 'constructor')
            {
                // console.log(key);
                // function has a propertyDescriptor as well, with function as value 
                let desc = Object.getOwnPropertyDescriptor(self.constructor.prototype, key);

                if (desc != null)
                {
                    // We can only redefine configurable properties !
                    if (!desc.configurable)
                    {
                        console.log("AUTOBIND-WARNING: Property \"" + key + "\" not configurable ! (" + self.constructor.name + ")");
                        continue;
                    }

                    let g = desc.get != null;
                    let s = desc.set != null;

                    if (g || s)
                    {
                        let newDescriptor: PropertyDescriptor = {};
                        newDescriptor.enumerable = desc.enumerable;
                        newDescriptor.configurable = desc.configurable

                        if (g)
                            newDescriptor.get = desc.get.bind(self);

                        if (s)
                            newDescriptor.set = desc.set.bind(self);

                        Object.defineProperty(self, key, newDescriptor);
                        continue; // if it's a property, it can't be a function 
                    } // End if (g || s) 

                }

                // const val = self[key]; // NO ! key could be a property ! 
                if (typeof(self[key]) === 'function')
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
