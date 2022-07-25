import {vNode, vFragment, mount} from '../../Sauce/libs/templates/vDom';
import Img from './Img';


export default ({attrs : {$src}, on}) => {
    const zoom = (_, elm) => {
        elm.classList.toggle('zoom');
        console.log(e);
    }

    on('created', (e) => {
        console.log('created zoomable', $src);
    });
    on('mounted', (e) => {
        console.log('mounted zoomable', $src);
    });

    return <div class="image" onClick={zoom}>
        <Img $src={$src} $ref="img" />  
    </div>
};