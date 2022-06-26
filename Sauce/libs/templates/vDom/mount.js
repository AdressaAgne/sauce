export const render = (vNode, $parent) => {
    if(typeof vNode == 'function') return render(vNode(), $parent);

    if (!(vNode instanceof Object)) return document.createTextNode(String(vNode));

    vNode.render = () => reMountChild(vNode);

    if (vNode.callback && typeof vNode.callback == 'function') {
        const {attrs} = vNode;
        vNode = vNode.callback({ state: {}, ...vNode });
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

            $node.setAttribute(key, value);
        }
    }

    // Append children
    for (let i = 0; i < vNode.children.length; i++) {
        const $vChild = render(vNode.children[i], $node);
        $node.appendChild($vChild);
    }

    return $node;
}

const reMountChild = (vNode) => {
    const $oldNode = vNode.$element;
    const $parent = $oldNode.parentElement;
    const $node = render(vNode, $parent);
    $parent.replaceChild($node, $oldNode);
}


export const mount = (vNode, selector) => {
    const $parent = selector instanceof HTMLElement ? selector : document.querySelector(selector);
    const $node = render(vNode, $parent);
    if(vNode) $parent.parentElement.replaceChild($node, $parent);
    return $node;
}