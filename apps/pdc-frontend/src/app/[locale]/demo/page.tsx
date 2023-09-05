import { VisualizationSpec } from 'react-vega';
import { Heading1, Paragraph } from '@/components';
import { Markdown } from '@/components/Markdown';
import { VegaVisualisation } from '@/components/VegaVisualisation';
import { GET_VISUALISATIES } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

const Demo = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_VISUALISATIES,
    variables: { locale: locale },
  });

  return (
    <>
      <Heading1>{data.visualisatie.data.attributes.title}</Heading1>
      <Markdown>{data.visualisatie.data.attributes.body}</Markdown>
      {data.visualisatie.data.attributes.visualisatie.map(
        (visualisation: { id: string; title: string; specification: VisualizationSpec }) => (
          <div key={visualisation.id}>
            <Paragraph>{visualisation.title}</Paragraph>
            <VegaVisualisation spec={visualisation.specification} />
          </div>
        ),
      )}
    </>
  );
};

export default Demo;
