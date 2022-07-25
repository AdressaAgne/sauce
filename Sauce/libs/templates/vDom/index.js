import Evt from '../Event';


export const vFragment = Symbol('vFragment');
export const vNode = (tag, attrs = [], ...children) => {

    children = children.flat(Infinity);

    const _evt = new Evt();
   
    // is fragment
    if (tag == vFragment) {
        tag = 'div';
    }

    const node = {
        tagName: tag,
        attrs,
        children,
        _evt,
        on: _evt.on.bind(_evt),
        off: _evt.off.bind(_evt),
        dispatch: _evt.dispatch.bind(_evt),
    }

     // Is component
     if (typeof tag == 'function') {
        node.callback = tag;
        delete node.tagName;
    }

    return node
}



export * from './mount.js';