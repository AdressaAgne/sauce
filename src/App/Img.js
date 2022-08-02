import {vNode, vFragment, mount} from '../../Sauce/libs/templates/vDom';
import Evt from '../../Sauce/libs/templates/Event';

const visible = new Evt();
const observer = new IntersectionObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
        const {isIntersecting, target, boundingClientRect} = entries[i];
        if(isIntersecting) visible.dispatch(target, {observer, boundingClientRect});
    }
}, { rootMargin: '100%' });

const devicePixelRatio = window.devicePixelRatio || 1;
const getClosestSize = (size, sizes = [480, 680, 1080, 1280, 1680, 1920]) => sizes.sort((a, b) => a - b).find((value) => value >= size);

export default ({attrs : {$src}, on, dispatch}) => {
    const src = (size = 1080) => '/assets/' + $src + '-' + size + '.webp';

    on('mounted', ({$element, state}) => {
        visible.on($element, ({observer}) => {
            const rect = $element.parentElement.getBoundingClientRect();
            const width = rect.width * devicePixelRatio;
            $element.src = src(getClosestSize(width));
            observer.unobserve($element);
            dispatch('loaded');
        });

        observer.observe($element);
    });

    return <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></img>
}