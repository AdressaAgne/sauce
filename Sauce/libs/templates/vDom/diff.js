import {render} from './mount';

const replace = (o, n) => {
    const $parent = o.parentElement;
    $parent.replaceChild(n, o);
    return n;
}

export const differ = ($vNode, vNode) => {
    
    if(vNode.callback) {
        vNode.dispatch('dismount');
        return differ($vNode, vNode.callback.call(null, vNode));
    }

    // if tagName changed or its a textNode, rerender.
    if($vNode.nodeType == 3 || $vNode.tagName != vNode.tagName.toUpperCase()) {
        return replace($vNode, render(vNode));
    }

    // attributes
    //if()
    // new attr
    // remove attr
    // update attr

    const attrs = $vNode.attributes;
    const l = $vNode.attributes.length;
    for (let i = 0; i < l; i++) {
        const {nodeName, nodeValue} = attrs[i];
        const vAttr = vNode.attrs[nodeName].toString();
        if(!vAttr) {
            // does not exist on vNode
            $vNode.removeAttribute(nodeName);
        }

        if(vAttr !== nodeValue) {
            $vNode.setAttribute(nodeName, vAttr);
        }

    }


    // children
    for (let i = 0; i < $vNode.childNodes.length; i++) {
        const $vChild = $vNode.childNodes[i];
        const vChild = vNode.children[i];
        
        differ($vChild, vChild);
    }
}