
async function main() 
{
    let main = document.querySelector('main');
    let info = document.querySelector('footer');

    let tree = new Tree.VanillaTree(
        {
            id: "main",
            parent: null,
            text: "",
            opened: false,
            hasChildren: true,
            selected: null,
            placeholder: null,
            url: "jsonp",
            contextmenu: [
                {
                    label: 'Additional data',
                    action: function (id: string)
                    {
                        let leafData :Tree.IOptions = tree.getLeafData(id);
                        alert('Data: ' + JSON.stringify(leafData, null, 2));
                    }
                },
                {
                    label: 'Remove node',
                    action: async function (id: string)
                    {
                        // alert('Blah ' + id);
                        await tree.remove(id);
                        
                    }
                }
            ]
        });


    tree.addBranch(null);
    /*
    let childNodes = await new Http.PostJSON("treedata", { "id": null }).sendAsync();
    for (var i = 0; i < childNodes.Rows.length; ++i)
    {
        tree.add({
            id: childNodes.Rows[i].uid, // this.newId(),
            label: childNodes.Rows[i].text, // 'Node ' + (i+1).toString(),
            parent: null,
            opened: false,
            hasChildren: childNodes.Rows[i].hasChildren
        });
    } // Next i 
    */



    /*
    tree.add({
        label: 'Label A',
        id: 'a',
        opened: true
    });
 
 
    tree.add({
        label: 'DB',
        id: 'BEB6CD1D-5ACB-4FB1-93F4-A3F07A053DB7',
        opened: true
    });
 
 
    tree.add({
        label: 'DB.1',
        parent: 'BEB6CD1D-5ACB-4FB1-93F4-A3F07A053DB7',
        id: null,
        opened: true,
        selected: true
    });
 
 
 
    tree.add({
        label: 'DB.2',
        parent: null,
        id: "omg",
        opened: true,
        selected: true
    });
 
 
 
 
    tree.add({
        label: 'Label B',
        id: 'b'
    });
 
    tree.add({
        label: 'Label A.A',
        parent: 'a',
        id: 'a.a',
        opened: true,
        selected: true
    });
 
    tree.add({
        label: 'Label A.A.A',
        parent: 'a.a'
    });
 
    tree.add({
        label: 'Label A.A.B',
        parent: 'a.a'
    });
 
    tree.add({
        label: 'Label B.A',
        parent: 'b'
    });
    */


    main.addEventListener('vtree-open', function (evt: Tree.ITreeEvent)
    {
        info.innerHTML = evt.detail.id + ' is opened';
    });

    main.addEventListener('vtree-close', function (evt: Tree.ITreeEvent)
    {
        info.innerHTML = evt.detail.id + ' is closed';
    });

    main.addEventListener('vtree-select', function (evt: Tree.ITreeEvent)
    {
        info.innerHTML = evt.detail.id + ' is selected';
    });

}

main();
