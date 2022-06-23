import {vNode, vFragment, mount} from './vDom';


const App = ({attrs}) => <div id="__app">
    <p onClick={e => console.log}>Awesomesauce <strong>4.0.0</strong>, {JSON.stringify(attrs)}, {1}, {undefined}, {null}</p>
</div>;


const vApp = <App id="hei" />;
const $app = mount(vApp, '#__sauce');

