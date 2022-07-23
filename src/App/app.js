/**
 * Includes
 */
import {vNode, vFragment, mount} from '../../Sauce/libs/templates/vDom';

import experience from './data/experience.json';
import projects from './data/publication_img.json';
import tech from './data/tech.json';
import Img from './Img';

/**
 * Components
 */

const Article = ({attrs : {$item : item}}) => 
<article class={'publication' + (item.image ? '' : ' no-image')}>
    <a href={item.url || '#'}>
        <header if={item.image}>
            <Img $src={'images/'+item.image} alt="image of publication" />
        </header>
        <main>
            <h3 class="title">{item.title}</h3>
            <p class="kicker" if={item.publication || item.firm || item.date || item.date_from}>
                <strong if={item.publication || item.firm}>{item.publication || item.firm}</strong>
                <strong if={item.date || item.date_from}>{item.date || item.date_from}</strong>
            </p>
            <p if={item.location} class="location">{item.location}</p>
            
            {item.desc.split("\n").map(p => <p if={p} class="description">{p}</p>)}
        </main>
    </a>
</article>

const Contact = () => 
<section class="contant">
    <h2>Contact</h2>
    <ul class="links">
        <li><a href="mailto:agne+web@agne.no">agne@agne.no</a></li>
        <li><a href="https://github.com/OrangeeWeb">github.com/OrangeeWeb</a></li>
        <li><a href="https://www.linkedin.com/in/agneode/">linkedin.com/in/agneode/</a></li>
    </ul>
</section>

const About = () => 
<section class="about">
    <h1 class="title">Curriculum Vitae</h1>
    <section class="profile">
        <Img $src="me" alt="image of me" />
    </section>
    <section class="content">
        <p class="name">Agne Ødegaard</p>
        <p class="title">Full stack web developer</p>
        <p class="location">Trondheim, Norway</p>
    </section>
</section>

const App = () => 
<article class="viewport">
    <header>
        <About />
    </header>
    <main>
        <h2>Experience & Education</h2>
        <section class="grid">
            {experience.map(item => <Article $item={item} />)}
        </section>
        <h2>Publications</h2>
        <section class="grid">
            {projects.map(item => <Article $item={item} />)}
        </section>
        <h2>Buzzwords</h2>
        <ul class="buzzwords">
            {tech.map(item => <li><span>{item}</span></li>)}
        </ul>
    </main>
    <footer>
        <Contact />
    </footer>
</article>



mount(<App />, window.env.id);