import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Gebruiksvriendelijk voor de redactie',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        De redactie is de belangrijkste gebruiker van het CMS. Daarom hebben we veel dingen aangepast en makkelijker
        gemaakt, naar aanleiding van gebruikerstesten voor de beheerinterface.
      </>
    ),
  },
  {
    title: 'Headless met NL Design System',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        De website van Strapi is losgekoppeld van de backend, volgens het Common Ground principe. De websites zijn
        gebouwd met NL Design System, waardoor je profiteert van de community die continue verbeteringen doet.
      </>
    ),
  },
  {
    title: 'Roadmap waar je blij van wordt',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>We hebben veel mooie plannen waardoor Strapi nog handiger wordt om een gemeentewebsite mee te maken.</>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
