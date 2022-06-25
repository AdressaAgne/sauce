

const App = () => 
<article>
    <h1>Agne.no</h1>
    <ul>
        {new Array(100).fill(null).map((_, i) => <li>{i+1}</li>)}
    </ul>
</article>




/**
 * Includes
 */
import {vNode, vFragment, mount} from '../../Sauce/libs/templates/vDom';
mount(<App />, window.env.id);