import {vNode, vFragment, mount} from '../../Sauce/libs/templates/vDom';

export const Canvas = ({on}) => {
    let time = null;
    let ctx = null;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const loop = (delta) => {
        const fps = 1000 / (delta - time || 0);
        ctx.clearRect(0, 0, w, h);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(fps.toFixed(2), 10, 10);


        time = delta || 0;
        requestAnimationFrame(loop);
    } 

    on('mounted', ({$element}) => {
        ctx = $element.getContext('2d');
        requestAnimationFrame(loop);
    });

    return <canvas width={w} height={h} style="width: 100vw; height: 100vh; position: fixed; top:0;left:0;background:var(--color-background);"></canvas>
}