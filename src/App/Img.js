import {vNode, vFragment, mount} from '../../Sauce/libs/templates/vDom';

const assetsDir = '/assets/';

const callbackMap = new Map();
const observer = new IntersectionObserver((entries) => {
    for (let i = 0; i < entries.length; i++) {
        const {isIntersecting, target} = entries[i];
        if(isIntersecting && callbackMap.has(target)) {
            callbackMap.get(target).call(null, observer);
        }
    }
}, { rootMargin: '100%' });

const devicePixelRatio = window.devicePixelRatio || 1;

const getClosestSize = (size, sizes = [480, 680, 1080, 1280, 1680, 1920]) => sizes.sort((a, b) => a - b).find((value) => value >= size);

export default ({attrs : {$src}, onMount}) => {
    const src = (size = 1080) => assetsDir + $src + '-' + size + '.webp';
    
    onMount($elm => {
        callbackMap.set($elm, (observer) => {
            const rect = $elm.parentElement.getBoundingClientRect();
            const width = rect.width * devicePixelRatio;
            $elm.src = src(getClosestSize(width));
            observer.unobserve($elm);
        });
        observer.observe($elm);
    });

    return <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></img>
}