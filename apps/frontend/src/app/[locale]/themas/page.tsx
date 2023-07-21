import { VegaVisualisation } from '@/components/VegaVisualisation';
import { GET_THEMAS } from '@/query';
import { fetchData } from '@/util/fetchData';
import { VisualizationSpec } from "react-vega";

const Themas = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { data } = await fetchData({
    url: process.env.STRAPI_BACKEND_URL as string,
    query: GET_THEMAS,
    variables: { locale: locale },
  });

  const visualisations = data.themas.data[0].attributes.Visualisatie;

  return (
    <>
      {visualisations.map((visualisation: { id: string, specification: VisualizationSpec }) => (
        <VegaVisualisation spec={visualisation.specification} key={visualisation.id} />
      ))}
    </>
  );
};

export default Themas;
