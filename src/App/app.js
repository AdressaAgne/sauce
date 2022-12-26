/**
 * Includes
 */
import { vNode, vFragment, mount } from '../../Sauce/libs/templates/vDom';

import Img from './Img';

const projects = [
	{
		title: 'Borgian and Burkes',
		desc: `From the Harry Potter Universe, an extension to Diagon Alley (75978). Borgin and burkes the famus store Lord Voldemort worked at for a few years after Hogwarts.
		This build features the Vanishing cabinet with an Green apple inside.
		A glass cabinet with a diadem on top, also containing some goblets and skeletons.`,
		url: 'https://www.bricklink.com/v3/studio/design.page?idModel=231879',
		urls: [
			{ name: 'Stud.io file', url: 'https://lego.agne.no/download/borgian_and_burkes.io' },
			{ name: 'pdf', url: 'https://lego.agne.no/download/borgian_and_burkes.pdf' },
		],
		image: 'borgian_and_burkes',
		publication: 'Harry Potter',
	},
];

/**
 * Components
 */

const Article = ({ attrs: { $item: item } }) => (
	<article class={'publication' + (item.image ? '' : ' no-image')}>
		<a href={item.url || '#'}>
			<header if={item.image}>
				<Img $src={item.image} alt='image of publication' />
			</header>
			<main>
				<h3 class='title'>{item.title}</h3>
				<p class='kicker' if={item.publication || item.firm || item.date || item.date_from}>
					<strong if={item.publication || item.firm}>{item.publication || item.firm}</strong>
					<strong if={item.date || item.date_from}>{item.date || item.date_from}</strong>
				</p>
				<p if={item.location} class='location'>
					{item.location}
				</p>
				{item.desc.split('\n').map((p) => (
					<p if={p} class='description'>
						{p}
					</p>
				))}
				<ul class='downloads' if={item.urls.length > 0}>
					{item.urls.map(({ name, url }) => (
						<li>
							<a href={url}>{name}</a>
						</li>
					))}
				</ul>
			</main>
		</a>
	</article>
);

const Projects = () => (
	<section class='grid'>
		{projects.map((item) => (
			<Article $item={item} />
		))}
	</section>
);

const App = () => (
	<article class='viewport'>
		<main>
			<h2>Lego creations</h2>
			<Projects />
		</main>
	</article>
);

mount(<App />, window.env.id);
