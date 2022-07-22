export const render = (vNode, $parent) => {
    if(typeof vNode == 'function') return render(vNode(), $parent);

    if (!(vNode instanceof Object)) return document.createTextNode(String(vNode));

    vNode.render = () => reMountChild(vNode);

    if (vNode.callback && typeof vNode.callback == 'function') {
        const {attrs} = vNode;
        vNode = vNode.callback({ state: {}, ...vNode, onMount(callback) {
            vNode.mounted = callback;
        } });

        vNode.attrs = {...attrs, ...vNode.attrs};
        vNode.$element = render(vNode, $parent);
        return vNode.$element || vNode;
    }


    // Create the tag
    const $node = document.createElement(vNode.tagName);
    vNode.$element = $node;


    // set attributes
    if (vNode.attrs) {
        for (const key in vNode.attrs) {
            const value = vNode.attrs[key];

            if (key.slice(0, 2) == 'on') {
                $node.addEventListener(key.slice(2).toLowerCase(), (e) => value.call($node, e, vNode));
                continue;
            }

            if(key == 'if') {
                if(!value) return false;
                continue;
            } 

            if(key.slice(0, 1) == '$') {
                continue;
            } 

            $node.setAttribute(key, value);
        }
    }

    // Append children
    for (let i = 0; i < vNode.children.length; i++) {
        const vChild = vNode.children[i];
        const $vChild = render(vChild, $node);
        if($vChild) {
            $node.appendChild($vChild);
            if(vChild.mounted) vChild.mounted.call(vChild, $vChild);
        }
    }

    return $node;
}

const reMountChild = (vNode) => {
    const $oldNode = vNode.$element;
    const $parent = $oldNode.parentElement;
    const $node = render(vNode, $parent);
    if($node) {
        $parent.replaceChild($node, $oldNode);
        if(vNode.mounted) vNode.mounted.call(vNode, $node);
    }
}


export const mount = (vNode, selector) => {
    const $parent = selector instanceof HTMLElement ? selector : document.querySelector(selector);
    const $node = render(vNode, $parent);
    if(vNode && $node){
        $parent.parentElement.replaceChild($node, $parent);
        if(vNode.mounted) vNode.mounted.call(vNode, $node);
    }
    return $node;
}