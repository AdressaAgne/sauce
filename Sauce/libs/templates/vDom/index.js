import Evt from '../Event';

export const vFragment = Symbol('vFragment');
export const vNode = (tag, attrs = {}, ...children) => {

    children = children.flat(Infinity);

    const _evt = new Evt();
   
    // is fragment
    if (tag == vFragment) {
        tag = 'div';
    }

    const vNode = {
        tagName: tag,
        attrs,
        children,
        _evt,
        on: _evt.on.bind(_evt),
        off: _evt.off.bind(_evt),
        dispatch: (event, ...args) => _evt.dispatch.call(_evt, event, vNode, ...args),
        once : _evt.once.bind(_evt),
        _isUpdating : false,
    }

    const proxyHandler = {
        get(target, prop) {
            return target[prop];
        },
        set(target, prop, value) {
            if(vNode.$element && vNode.$element.parentElement && !vNode._isUpdating) {
                vNode._isUpdating = true;
                vNode.dispatch('update');
            }
            target[prop] = value;
        }
    };

    vNode.state = new Proxy({}, proxyHandler);

     // Is component
     if (typeof tag == 'function') {
        vNode.callback = tag;
        delete vNode.tagName;
    }

    return vNode
}



export * from './mount.js';