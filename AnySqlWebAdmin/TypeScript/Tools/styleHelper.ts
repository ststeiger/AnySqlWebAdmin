
namespace Css
{
    
    
    export class StyleHelper
    {
        
        protected m_dict:object & {[key: string]: string};
        
        
        constructor(style:string)
        {
            this.fromStyle(style);
        }
        
        
        
        public removeStyle(key: string): StyleHelper
        {
            if ( this.m_dict.hasOwnProperty(key))
                delete this.m_dict[key];
            
            return this;
        }
        
        
        
        public addStyle(key: string, value:string): StyleHelper
        {
            this.m_dict[key] = value;
            return this;
        }


        public fromStyle(style:string): StyleHelper
        {
            this.m_dict = null;
            this.m_dict = {};
            
            if (style == null)
                return this;
            
            let kvps:string[] = style.split(";");
            
            for (let i:number = 0; i < kvps.length; i++)
            {
                let kvp:string[] = kvps[i].split(':');
                let key = kvp[0].trim();
                if (key === "") 
                    continue;
                
                this.m_dict[key] = kvp[i].trim();
            }

            return this;
        }


        public toStyle(): string
        {
            let style="";
            let key:string;
            
            
            for (key in this.m_dict)
            {
                if (this.m_dict.hasOwnProperty(key)) 
                {
                    style = style + key + ": " + this.m_dict[key] + "; ";
                }
            }
            
            return style;
        }
        
        
    } // End static class StyleHelper
	
    
} // End Namespace Html 
