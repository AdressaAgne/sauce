export const vFragment = Symbol('vFragment');

export const vNode = (tag, attrs = [], ...children) => {
    // Is component
    if(typeof tag == 'function') {
        const vComponent = tag({attrs, children});

        return vComponent;
    }

    // is fragment
    if(tag == vFragment) {
        const vFragment = children;
        return vFragment;
    }

    const node = {
        tagName : tag,
        attrs,
        children
    }

    console.log('vNode', tag, attrs, children);

    return node
}



export * from './mount.js';