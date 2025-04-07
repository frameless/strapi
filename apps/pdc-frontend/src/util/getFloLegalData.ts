import { ErrorHandler, fetchData } from '@frameless/utils';
import { FloLegalContent, FloLegalFormData } from '@/types/floLegalForm';

type GetFloLegalConfig = {
  api_url?: string;
  api_token?: string;
};
export interface GetFloLegalDataProps {
  config?: GetFloLegalConfig;
  selector?: string;
}

export interface GetFloLegalDataResult {
  name?: string;
  content?: FloLegalContent;
  error?: string;
  errorCode?: 'timeout' | 'unknown';
}

export const getFloLegalData = async ({ config, selector }: GetFloLegalDataProps): Promise<GetFloLegalDataResult> => {
  try {
    const parsFloLegalEmbedData = new URLSearchParams(selector ?? '');
    const identifier = parsFloLegalEmbedData.get('identifier');
    const url = `${config?.api_url}/block-publication/${identifier}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // Set a 3-second timeout

    const checkedData = await fetchData<FloLegalFormData>({
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config?.api_token ?? '',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);
    return {
      name: checkedData?.name,
      content: checkedData?.content,
    };
  } catch (error) {
    if ((error as ErrorHandler).errorType === 'abort') {
      return {
        error: 'Oeps! Het laden duurde te lang. Probeer het alsjeblieft opnieuw.',
        errorCode: 'timeout',
      };
    } else {
      // eslint-disable-next-line no-console
      console.error('PDC Frontend getFloLegalData: Failed to fetch Flo Legal data.', {
        message: (error as Error)?.message,
        stack: (error as Error)?.stack,
      });
    }
    return {};
  }
};
