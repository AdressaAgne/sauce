export const render = (vNode, $parent) => {
    if(typeof vNode == 'function') {
        return render(vNode(), $parent);
    }

    if (!(vNode instanceof Object)) return document.createTextNode(String(vNode));

    vNode.render = () => reMountChild(vNode);

    if (vNode.callback && typeof vNode.callback == 'function') {
        const {attrs} = vNode;
        const vComponentNode = vNode.callback({ 
            state: {}, 
            ...vNode
        });

        vNode.dispatch('created', vNode);
        
        vComponentNode.attrs = {...attrs, ...vComponentNode.attrs};
        vComponentNode.$element = render(vComponentNode, $parent);
        vNode._evt.merge(vComponentNode._evt);

        return vComponentNode.$element || vComponentNode;
    }


    // Create the tag
    const $vNode = document.createElement(vNode.tagName);
    vNode.$element = $vNode;

    vNode.dispatch('created', vNode);


    // set attributes
    if (vNode.attrs) {
        for (const key in vNode.attrs) {
            const value = vNode.attrs[key];

            if (key.slice(0, 2) == 'on') {
                $vNode.addEventListener(key.slice(2).toLowerCase(), (e) => {
                    value.call($vNode, e, $vNode, vNode);
                });
                
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
    if(!vNode._evt) return;
    vNode.$element = $vNode;
    vNode._evt.dispatch('mounted', vNode);
}

const reMountChild = (vNode) => {
    const $oldNode = vNode.$element;
    const $parent = $oldNode.parentElement;
    const $vNode = render(vNode, $parent);
    if($vNode) {
        $parent.replaceChild($vNode, $oldNode);
        dispatchMounted(vNode, $vNode);
    }
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