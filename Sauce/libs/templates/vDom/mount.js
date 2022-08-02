import Evt from '../Event';
import {differ} from './diff';

export const render = (vNode, $parent, update = false) => {
    if(typeof vNode == 'function') {
        return render(vNode.call(null), $parent);
    }

    if (!(vNode instanceof Object)) return document.createTextNode(String(vNode));

    
    if(!vNode._evt.has('update')) vNode.on('update', e => {
        const $oldElement = vNode.$element;
        const $parent = $oldElement.parentElement
        if(!$parent) return;

        differ($oldElement, vNode);

        vNode._isUpdating = false;
    });

    /**
     * Component
     */
    if (vNode.callback && typeof vNode.callback == 'function') {
        const vComponentNode = vNode.callback.call(null, vNode);
        vNode.dispatch('created');
        vComponentNode.$element = render(vComponentNode, $parent);


        return vComponentNode.$element || vComponentNode;
    }


    // Create the tag
    const $vNode = document.createElement(vNode.tagName);
    vNode.$element = $vNode;

    // set attributes
    if (vNode.attrs) {
        for (const key in vNode.attrs) {
            const value = vNode.attrs[key];

            if (key.slice(0, 2) == 'on') {
                const event = key.slice(2).toLowerCase();
                if(Evt.types.indexOf(event) > -1) {
                    $vNode.addEventListener(event, e => value.call(null, e, $vNode));
                } else {
                    vNode.on(event, value);
                }
                continue;
            }

            if(key == 'if') {
                if(!value) return false;
                continue;
            } 

            if(key.slice(0, 1) == '$') {
                continue;
            } 

            $vNode.setAttribute(key, value);
        }
    }

    vNode.dispatch('created');

    // Append children
    for (let i = 0; i < vNode.children.length; i++) {
        const vChild = vNode.children[i];
        const $vChild = render(vChild, $vNode);
        if($vChild) {
            $vNode.appendChild($vChild);
            dispatchMounted(vChild, $vChild);
        }
    }

    return $vNode;
}

const dispatchMounted = (vNode, $vNode) => {
    if(!vNode || !vNode.dispatch) return;
    vNode.$element = $vNode;
    vNode.dispatch('mounted');
}

export const mount = (vNode, selector) => {
    const $parent = selector instanceof HTMLElement ? selector : document.querySelector(selector);
    const $vNode = render(vNode, $parent);
    if(vNode && $vNode){
        $parent.parentElement.replaceChild($vNode, $parent);
        dispatchMounted(vNode, $vNode);
    }
    return $vNode;
}