import { useEffect } from 'react';

export const useProductPrice = (data: any, getProductPrice: (params: any) => void) => {
  useEffect(() => {
    if (!data?.slug) return;

    const { slug, initialData } = data;
    const uuid = initialData?.content?.uuid || initialData?.uuid;

    const typeMap: Record<string, string> = {
      'api::additional-information.additional-information': 'additional-information',
      'api::internal-field.internal-field': 'internal-field',
    };

    const type = typeMap[slug] || 'product';

    getProductPrice({ uuid, type, uid: slug });
  }, [data?.initialData?.uuid, getProductPrice, data?.initialData?.content?.uuid]);
};
