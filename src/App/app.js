

const style = 
<style lang="scss">
    {"ul { li {color: red;}}"}
</style>

const App = () => 
<article>
    <h1>Agne.no</h1>
    <ul>
        {new Array(100).fill(null).map((_, i) => <li>{i+1}</li>)}
    </ul>
    {style}
</article>






/**
 * Includes
 */
import {vNode, vFragment, mount} from './vDom';
mount(<App />, window.env.id);