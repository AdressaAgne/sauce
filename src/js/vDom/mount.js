export const render = (vNode) => {

    if (!(vNode instanceof Object)) {
        return document.createTextNode(String(vNode));
    }

    // Create the tag
    const $node = document.createElement(vNode.tagName);

    // set attributes
    if (vNode.attrs) {
        for (const key in vNode.attrs) {
            const value = vNode.attrs[key];
            $node.setAttribute(key, value);
        }
    }

    // Append children
    for (let i = 0; i < vNode.children.length; i++) {
        const $vChild = render(vNode.children[i]);
        $node.appendChild($vChild);
    }

    vNode.$element = $node;

    return $node;
}


export const mount = (vNode, selector) => {
    const $parent = document.querySelector(selector);
    const $node = render(vNode);
    $parent.parentElement.replaceChild($node, $parent);

    return $node;
}