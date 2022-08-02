import {vNode, vFragment, mount} from '../../Sauce/libs/templates/vDom';
import Img from './Img';


export default ({attrs : {$src}, state}) => {
    const zoom = (e, elm) => elm.classList.toggle('zoom');

    return <div class={state.class} onClick={zoom}>
        <Img $src={$src} $ref="img" />  
    </div>
};