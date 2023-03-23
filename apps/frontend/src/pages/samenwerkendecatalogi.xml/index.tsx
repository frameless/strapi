import { client } from '@/client';
import { GET_SAMENWERKENDECATALOGI } from '@/query';
import { convertJsonToXML } from '@frameless/samenwerkende-catalogi/src/index';
import { GetServerSideProps } from 'next';
import React from 'react';

const Samenwerkendecatalogi: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res, locale }) => {
  const { data } = await client.query({
    query: GET_SAMENWERKENDECATALOGI,
    variables: {
      locale,
    },
  });

  const xml = convertJsonToXML(data?.products?.data, process.env.STRAPI_FRONTEND_URL);

  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
  }
  return {
    props: {},
  };
};

export default Samenwerkendecatalogi;
