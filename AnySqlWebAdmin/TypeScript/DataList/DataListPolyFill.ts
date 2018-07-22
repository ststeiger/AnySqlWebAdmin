
'use strict';

// FU IE 11
if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
    Element.prototype.closest = function (s:string)
    {
        let el = this;
        if (!document.documentElement.contains(el)) return null;
        do
        {
            if (el.matches(s)) return el;
            el = el.parentElement;
        } while (el !== null);
        return null;
    };


document.addEventListener('DOMContentLoaded', function ()
{
    let lists: NodeListOf<Element> = document.querySelectorAll('input[data-optgroup-list]');
    // console.log("lists", lists);
    
    for (let tbi = 0; tbi < lists.length; ++tbi)
    {
        let list: HTMLInputElement = <HTMLInputElement>lists[tbi];
        console.log(list);

        let datalist = document.getElementById(list.getAttribute('data-optgroup-list'));
        // console.log("datalist", datalist);

        // // const listOptions = list.closest('optgroup-list-wrapper').querySelector('list-options');
        // let listOptions = list.nextElementSibling.nextElementSibling;
        let listOptions = list.parentElement.getElementsByClassName("list-options")[0];
        // console.log("listOptions", listOptions);

        list.addEventListener('focus', function (event:FocusEvent)
        {
            console.log('focus');
            listOptions.removeAttribute('hidden');
        });

        list.addEventListener('blur', function (event:FocusEvent)
        {
            console.log('blur');
            /*
            setTimeout(function () {
                listOptions.setAttribute('hidden', 'true');
            }, 100); // old 1200
            */

        });

        list.addEventListener('input', function (event)
        {
            let value:string = (<HTMLInputElement>event.target).value;
            if (value != null) value = value.toLowerCase();
            //console.log('input', value);

            let options = listOptions.querySelectorAll('.option');
            for (let i = 0; i < options.length; i++)
            {
                let option = options[i];
                //console.log(option);
                let optionValue: string = option.querySelector('.value').innerHTML;
                // let optionLabel: string = option.querySelector('.label').innerHTML;

                if (optionValue == null) optionValue = "";
                optionValue = optionValue.toLowerCase();

                // if (optionLabel == null) optionLabel = "";
                // optionLabel = optionLabel.toLowerCase();

                let show = (optionValue.indexOf(value) != -1) // || optionLabel.indexOf(value) != -1);
                //console.log(show);
                if (show)
                {
                    option.removeAttribute('hidden');
                } else
                {
                    option.setAttribute('hidden', 'true');
                }
            }

            let details = listOptions.querySelectorAll('details');

            for (let dti = 0; dti < details.length; ++dti)
            {
                let detail:Element = details[dti];
                let allHidden:boolean = true;
                let options = detail.querySelectorAll('.option');
                for (let j = 0; j < options.length; j++)
                {
                    let _option = options[j];
                    //console.log(option, option.hasAttribute('hidden'));
                    if (!_option.hasAttribute('hidden'))
                    {
                        allHidden = false;
                        break;
                    }
                }
                //console.log('allHidden', allHidden);
                if (allHidden)
                {
                    detail.setAttribute('hidden', 'true');
                }
                else
                {
                    detail.removeAttribute('hidden');
                }
            } 
        }); // end input listener


        listOptions.addEventListener('click', function (event:MouseEvent)
        {
            let el: HTMLElement = <HTMLElement>event.target;
            
            if (!el.classList.contains("option"))
            {
                el = <HTMLElement>el.closest('.option');
                if (el == null)
                    return;
            }

            list.value = el.dataset.value;
            listOptions.setAttribute('hidden', 'true');
        });
    }

    /*document.body.addEventListener('click', (event) => {
        console.log(event.target);
    });*/

    //document.getElementById('input-b').focus();
});

