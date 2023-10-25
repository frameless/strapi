import { Emphasis, Heading1, Heading2 } from '@utrecht/component-library-react';
import React from 'react';
import { AccordionProvider, Markdown } from '@/components';
import { Grid } from '@/components/Grid';
import { PrintButton } from '@/components/PrintButton';
import { GET_PRINT_PAGE } from '@/query';
import { createStrapiURL } from '@/util/createStrapiURL';
import { fetchData } from '@/util/fetchData';

type HomepageData = {
  title: string;
  content: string;
  updatedAt: string;
  bannerImage: { data: { attributes: { url: string } } };
};

type Thema = {
  title: string;
  content: any[];
  updatedAt: string;
  child_themas: ThemasResponse;
  child_contents: ContentResponse;
};

type Content = {
  title: string;
  updatedAt: string;
  content: any[];
};

type ContentResponse = {
  data: {
    attributes: Content;
  }[];
};

type ThemasResponse = {
  data: {
    attributes: Thema;
  }[];
};

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { data } = await fetchData({
    url: createStrapiURL(),
    query: GET_PRINT_PAGE,
    variables: { locale: locale },
  });

  const homepageData: HomepageData = data?.homepage?.data?.attributes;
  const themaResponse: ThemasResponse = data?.themas;

  const ThemaDisplay = (thema: Thema, indexString: string) => {
    let levelIndex = 1;
    return (
      <div>
        <Heading1>
          {indexString}. {thema.title}
        </Heading1>
        <Emphasis>Laatste wijziging: {thema.updatedAt}</Emphasis>
        <DynamicContent content={thema.content} />
        {thema.child_themas?.data[0] && (
          <Grid className={'utrecht-grid--content-padding'}>
            <div className={'utrecht-grid__full-width'}>
              {thema.child_themas.data.map(({ attributes: thema }, index) => {
                return ThemaDisplay(thema, indexString.concat('.', (levelIndex += index).toString()));
              })}
            </div>
          </Grid>
        )}
        {thema.child_contents?.data[0] && (
          <Grid className={'utrecht-grid--content-padding'}>
            <div className={'utrecht-grid__full-width'}>
              {thema.child_contents.data.map(({ attributes: content }, index) => {
                return ContentDisplay(content, indexString.concat('.', (levelIndex += index).toString()));
              })}
            </div>
          </Grid>
        )}
      </div>
    );
  };

  const ContentDisplay = (content: Content, indexString: string) => {
    return (
      <div>
        <Heading2>
          {indexString}. {content.title}
        </Heading2>
        <Emphasis>Laatste wijziging: {content.updatedAt}</Emphasis>
        <DynamicContent content={content.content} />
      </div>
    );
  };

  return (
    <div>
      <PrintButton />
      <Grid className={'utrecht-grid--content-padding'}>
        <div className={'utrecht-grid__full-width'}>
          <Heading1>{homepageData.title}</Heading1>
          <Markdown imageUrl={process.env.STRAPI_PUBLIC_URL}>{homepageData.content}</Markdown>
        </div>
      </Grid>
      {themaResponse.data[0] &&
        themaResponse.data.map(({ attributes: thema }, index) => {
          return (
            <Grid className={'utrecht-grid--content-padding'} key={index}>
              <div className={'utrecht-grid__full-width'}>{ThemaDisplay(thema, (index + 1).toString())}</div>
            </Grid>
          );
        })}
    </div>
  );
};

const DynamicContent: React.FC<{
  content: any[];
}> = ({ content }) => (
  <>
    {content &&
      content.length > 0 &&
      content.map((component, index) => {
        switch (component.__typename) {
          case 'ComponentComponentsBlockContent':
            return component.content ? (
              <Markdown imageUrl={process.env.STRAPI_PUBLIC_URL} key={index}>
                {component.content}
              </Markdown>
            ) : null;
          case 'ComponentComponentsAccordionSection':
            return (
              <AccordionProvider
                key={index}
                sections={component.item?.map(({ id, title, body }: any) => ({
                  id,
                  label: title,
                  headingLevel: 3,
                  body: <Markdown imageUrl={process.env.STRAPI_PUBLIC_URL}>{body}</Markdown>,
                }))}
              />
            );
          default:
            return null;
        }
      })}
  </>
);

export default Page;
