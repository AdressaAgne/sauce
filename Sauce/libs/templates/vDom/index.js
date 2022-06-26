export const vFragment = Symbol('vFragment');

export const vNode = (tag, attrs = [], ...children) => {

    children = children.flat(Infinity);

    // Is component
    if(typeof tag == 'function') {
        return {callback : tag, attrs, children};
    }

    // is fragment
    if(tag == vFragment) {
        tag = 'div';
    }

    const node = {
        tagName : tag,
        attrs,
        children
    }


    return node
}



export * from './mount.js';