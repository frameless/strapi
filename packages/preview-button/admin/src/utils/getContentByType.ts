import type { JSX } from 'react';

interface GetContentByTypeProps {
  vac: { content: JSX.Element; id: string };
  internalField: { content: JSX.Element; id: string };
  additionalInformation: { content: JSX.Element; id: string };
  products: { content: JSX.Element; id: string };
  type: string;
}

interface ContentData {
  data: JSX.Element;
  id: string;
}

export const getContentByType = ({
  vac,
  internalField,
  additionalInformation,
  products,
  type,
}: GetContentByTypeProps): ContentData | null => {
  const dataMap = {
    vac,
    'internal-field': internalField,
    'additional-information': additionalInformation,
    products,
  };

  const contentData = dataMap[type as keyof typeof dataMap];
  return contentData ? { data: contentData.content, id: contentData.id } : null;
};
