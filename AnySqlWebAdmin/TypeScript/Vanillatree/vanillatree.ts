
// https://stackoverflow.com/questions/14486241/how-can-i-export-the-schema-of-a-database-in-postgresql
namespace Tree
{
    "use strict";

    interface TreeClickEvent extends MouseEvent 
    {
        target: HTMLElement;
    }


    export interface ITreeEventDetailData 
    {
        id: string;
    }

    export interface ITreeEvent extends CustomEvent
    {
        detail: ITreeEventDetailData;
    }

    /*
      event = new CustomEvent('vtree-' + name, {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        id: id
                    }
                });
    */

    interface IOptions
    {
        url:string,
        id: string,
        parent: string, // id
        text: string,
        opened: boolean,
        hasChildren:boolean,
        
        // TODO: 
        selected(id: string):any,
        
        placeholder: string,
        contextmenu: IContextMenuEntry[]
    }


    interface ITreeData
    {

        Rows:IOptions[]
    }



    interface IVanillaTreeOptions
    {
        url: string,
        id: string,
        e: Element,
        options: IOptions

    }


    interface IContextMenuEntry
    {
        label: string,
        // TODO: 
        action(id: string):any 
    }


    export class VanillaTree
    {
        private m_container: HTMLElement;
        private m_tree: HTMLUListElement;
        private m_placeholder: string;
        private m_leafs: { [id: string]: IOptions; };
        private m_url: string;
        private m_refetch:boolean = false;

        // https://ponyfoo.com/articles/binding-methods-to-class-instance-objects
        // https://github.com/sindresorhus/auto-bind/blob/master/index.js
        private autoBind(self: any)
        {
            for (const key of Object.getOwnPropertyNames(self.constructor.prototype))
            {
                const val = self[key];

                if (key !== 'constructor' && typeof val === 'function')
                {
                    // console.log(key);
                    self[key] = val.bind(self);
                }
            } // Next key 

            return self;
        } // End Function autoBind 


        constructor(options: IOptions)
        {
            this.autoBind(this);
            this.m_refetch = false;
            this.m_url = options.url;

            this.m_container = (typeof options.id === 'string' || (<any>options.id) instanceof String) ?
                <HTMLElement>document.querySelector(<string>options.id) : <HTMLElement>options.id;

            this.m_tree = this.m_container.appendChild(<HTMLUListElement>this.create('ul', {
                className: 'vtree'
            }));

            this.m_placeholder = options && options.placeholder;
            this._placeholder();
            this.m_leafs = {};
            this.m_tree.addEventListener('click', function (evt:TreeClickEvent)
            {
                if (evt.target.classList.contains("vtree-leaf-label"))
                {
                    this.select(evt.target.parentElement.getAttribute('data-vtree-id'));
                }
                else if (evt.target.classList.contains("vtree-toggle"))
                {
                    this.toggle(evt.target.parentElement.getAttribute('data-vtree-id'));
                }
            }.bind(this));

            if (options && options.contextmenu)
            {
                this.m_tree.addEventListener('contextmenu', function (evt: MouseEvent)
                {
                    let menu: HTMLElement
                        , contextMenus: NodeListOf<Element> = this.m_tree.querySelectorAll('.vtree-contextmenu');

                    [].forEach.call(contextMenus, function (contextMenu: Element)
                    {
                        contextMenu.parentElement.removeChild(contextMenu);
                    });

                    if ((<HTMLElement>evt.target).classList.contains("vtree-leaf-label"))
                    {
                        evt.preventDefault();
                        evt.stopPropagation();

                        menu = this.create('menu', {
                            className: 'vtree-contextmenu'
                        });

                        let rect: ClientRect = (<Element>evt.target).getBoundingClientRect();

                        this.setProperties(menu.style, {
                            // top: evt.offsetY,
                            // left: evt.offsetX + 18,
                            // top: rect.top + rect.height,
                            // left: rect.left,

                            // important: measurement "absolute" is relative to the 
                            // nearest position-relative or position-absolute element 
                            // not relative to window.x0 window.y0
                            top: ((<HTMLElement>evt.target).offsetTop + rect.height)
                                .toString() + "px", // important, otherwise bs 
                            left: (<HTMLElement>evt.target).offsetLeft
                                .toString() + "px", // important, otherwise bs
                            display: 'block'
                        });


                        options.contextmenu.forEach(function (item: IContextMenuEntry)
                        {
                            menu.appendChild(
                                this.create('li', {
                                    className: 'vtree-contextmenu-item',
                                    innerHTML: item.label
                                })
                            )
                                .addEventListener('click'
                                    , item.action.bind(
                                        item
                                        , (<HTMLElement>evt.target).parentElement.getAttribute('data-vtree-id')
                                    )
                                );
                        }.bind(this));

                        (<HTMLElement>evt.target).parentElement.appendChild(menu);
                    }
                }.bind(this));

                document.addEventListener('click', function (evt:MouseEvent)
                {
                    let contextMenus: NodeListOf<Element> = this.m_tree.querySelectorAll('.vtree-contextmenu');

                    [].forEach.call(contextMenus, function (menu: Element)
                    {
                        menu.parentElement.removeChild(menu);
                    });

                }.bind(this));

            } // End if (options && options.contextmenu) 

        } // End Constructor
        
        // TODO:
        private setProperties(obj: any // HTMLElement
            , props: object & { [propertyName: string]: string }): HTMLElement
        {
            if (props)
            {
                for (let i = 0, keys = Object.keys(props); i < keys.length; i++)
                {
                    obj[keys[i]] = props[keys[i]];
                }
            }

            return obj;
        } // End Function setProperties


        public create(tagName: string, props: { [propertyName: string]: string }): HTMLElement
        {
            return this.setProperties(document.createElement(tagName), props);
        } // End Function create 


        private async dispatchEvent(name: string, id: string): Promise<VanillaTree>
        {
            let event: CustomEvent;

            try
            {
                event = new CustomEvent('vtree-' + name, {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        id: id
                    }
                });
            } catch (e)
            {
                event = document.createEvent('CustomEvent');
                event.initCustomEvent('vtree-' + name, true, true, {id: id});
            }

            (this.getLeaf(id, true) || this.m_tree)
                .dispatchEvent(event);
            
            return new Promise<VanillaTree>(
                function (  resolve:(value?:PromiseLike<VanillaTree> | VanillaTree) => void
                          //, reject: (reason?:any)=> void  
                )
                {
                    resolve(this);
                }.bind(this)
            );
        } // End Function dispatchEvent 


        private _placeholder(): VanillaTree
        {
            let p: Element;
            // if no children & placeholder
            if (!this.m_tree.children.length && this.m_placeholder)
            {
                this.m_tree.innerHTML = '<li class="vtree-placeholder">' + this.m_placeholder + '</li>'
            }
            else if (p = this.m_tree.querySelector('.vtree-placeholder'))
            {
                this.m_tree.removeChild(p);
            }

            return this;
        } // End Function _placeholder 


        // notThrow: optional...
        private getLeaf(id: string, notThrow?: boolean): Element
        {
            let leaf: Element = this.m_tree.querySelector('[data-vtree-id="' + id + '"]');

            if (!notThrow && !leaf)
                throw Error('No VanillaTree leaf with id "' + id + '"');

            return leaf;
        } // End Function getLeaf 


        private getChildList(id: string): HTMLUListElement
        {
            let list: HTMLUListElement, parent: Element;

            if (id)
            {
                parent = this.getLeaf(id);

                if (!(list = parent.querySelector('ul')))
                {
                    list = parent.appendChild(<HTMLUListElement>this.create('ul', {
                        className: 'vtree-subtree'
                    }));
                }
            }
            else
            {
                list = this.m_tree;
            }

            return list;
        } // End Function getChildList 


        public async add(options: IOptions): Promise<VanillaTree>
        {
            let id: string,
                leaf: HTMLLIElement = <HTMLLIElement>this.create('li', {
                    className: options.hasChildren ? 'vtree-leaf vtree-has-children' : 'vtree-leaf'
                }),
                parentList: HTMLUListElement = this.getChildList(options.parent);

            leaf.setAttribute('data-vtree-id', id = options.id || Math.random().toString());

            leaf.appendChild(this.create('span', {
                className: 'vtree-toggle'
            }));


            let a = document.createElement("a");
            a.className = "vtree-leaf-label";
            a.appendChild(document.createTextNode(options.text));
            leaf.appendChild(a);

            parentList.appendChild(leaf);

            if (parentList !== this.m_tree)
            {
                parentList.parentElement.classList.add('vtree-has-children');
            }

            this.m_leafs[id] = options;

            if (!options.opened)
            {
                this.close(id);
            }

            if (options.selected)
            {
                this.select(id);
            }

            return this._placeholder().dispatchEvent('add', id);
        } // End Function add


        public async move(id: string, parentId: string): Promise<VanillaTree>
        {
            let leaf: Element = this.getLeaf(id),
                oldParent: HTMLElement = leaf.parentElement,
                newParent: Element = this.getLeaf(parentId, true);

            if (newParent)
            {
                newParent.classList.add('vtree-has-children');
            }

            this.getChildList(parentId).appendChild(leaf);
            oldParent.parentElement.classList.toggle('vtree-has-children', !!oldParent.children.length);

            return this.dispatchEvent('move', id);
        } // End Function move 


        public async remove(id: string): Promise<VanillaTree>
        {
            let leaf: Element = this.getLeaf(id),
                oldParent: HTMLElement = leaf.parentElement;

            oldParent.removeChild(leaf);
            oldParent.parentElement.classList.toggle('vtree-has-children', !!oldParent.children.length);

            return this._placeholder().dispatchEvent('remove', id);
        } // End Function remove


        private newId():string
        {
            function s4()
            {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }


        public async addBranch(id: string): Promise<IOptions[]>
        {
            let data: IOptions[] = null;

            try
            {
                // Http.URL.Parameters["uid"];

                //data = <IOptions[]><any>await fetch("api/treedata", {
                data = <IOptions[]><any>await fetch("sql", {
                    "method": 'POST',
                    // "headers": { 'auth': '1234','content-type': 'application/json'},

                    // https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
                    "headers": new Headers({ 'content-type': 'application/json' }),

                    "body": JSON.stringify(
                        { "id": id, }
                    )
                })
                .then(function (response) { return response.json(); })
                ;

                // window["foo"] = data;

                for (let i = 0; i < data.length; ++i)
                {
                    data[i].parent = id;
                    this.add(data[i]);
                } // Next i

            }
            catch (e)
            {
                console.log(e);
                alert("error fetching branch data\n" + e);
            }

            return data;
        }


        public async open(id: string): Promise<VanillaTree>
        {
            let leaf = this.getLeaf(id);
            let children= Array.prototype.slice.call(leaf.getElementsByTagName("ul")) || [];
            
            
            /*
            TODO:
            let children :NodeListOf<HTMLUListElement> =<NodeListOf<HTMLUListElement>><any> 
                leaf.getElementsByTagName("ul") || [];
            */
            leaf.classList.remove('closed');

            // wenn kinder & refetch entfernen 

            if (children.length == 0)
            {
                await this.addBranch(id);
            }
            else
            {
                if (this.m_refetch)
                {
                    for (let i = 0; i < children.length;++i)
                    {
                        leaf.removeChild(children[i]);
                    }

                    await this.addBranch(id);
                }
            }

            return this.dispatchEvent('open', id);
        } // End Function open


        public async close(id: string): Promise<VanillaTree>
        {
            this.getLeaf(id).classList.add('closed');
            return this.dispatchEvent('close', id);
        } // End Function close 


        public async toggle(id: string): Promise<VanillaTree>
        {
            return this[this.getLeaf(id).classList.contains('closed') ? 'open' : 'close'](id);
        } // End Function toggle 


        public select(id: string): Promise<VanillaTree>
        {
            let selectedLeafs: NodeListOf<Element>
                , leaf: Element = this.getLeaf(id);

            if (!leaf.classList.contains('vtree-selected'))
            {
                selectedLeafs = this.m_tree.querySelectorAll('li.vtree-leaf');

                [].forEach.call(selectedLeafs, function (selectedLeaf: Element)
                {
                    selectedLeaf.classList.remove('vtree-selected');
                });

                leaf.classList.add('vtree-selected');
                return this.dispatchEvent('select', id);
            } // End if (!leaf.classList.contains('vtree-selected'))
            
            return new Promise<VanillaTree>(
                function (  resolve:(value?:PromiseLike<VanillaTree> | VanillaTree) => void
                    //, reject: (reason?:any)=> void  
                )
                {
                    resolve(this);
                }.bind(this)
            );
        } // End Function select


    } // End Class 


} // End Namespace 
