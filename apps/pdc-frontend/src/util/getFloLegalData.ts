import { fetchData } from '@frameless/utils';
import { FloLegalFormData } from '@/types/floLegalForm';
import { encodeHtmlEntities } from './encodeHtmlEntities';

type GetFloLegalConfig = {
  api_url?: string;
  api_token?: string;
};
export interface GetFloLegalDataProps {
  config?: GetFloLegalConfig;
  selector?: string;
}

export const getFloLegalData = async ({ config, selector }: GetFloLegalDataProps) => {
  try {
    const parsFloLegalEmbedData = new URLSearchParams(selector ?? '');
    const identifier = parsFloLegalEmbedData.get('identifier');
    const url = `${config?.api_url}/block-publication/${identifier}`;
    const checkedData = await fetchData<FloLegalFormData>({
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config?.api_token ?? '',
      },
    });

    return {
      title: checkedData?.name,
      encodedData: encodeHtmlEntities(JSON.stringify(checkedData?.content)),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('PDC Frontend getFloLegalData: Failed to fetch Flo Legal data.', {
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
    });
    return {
      title: '',
      encodedData: '',
    };
  }
};
