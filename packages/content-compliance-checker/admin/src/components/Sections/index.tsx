import { AdvancedLink, LogoButton, MultiColumnsButton } from '@frameless/ui';
import {
  AccordionProvider,
  ButtonGroup,
  Image,
  SpotlightSection,
} from '@utrecht/component-library-react/dist/css-module';
import { BlockDetail } from '../../components/BlockDetail';
import { Markdown } from '../Markdown';
export const Sections = ({ sections }: any) => (
  <>
    {sections &&
      sections.map((component: any, index: number) => {
        switch (component?.__component) {
          case 'components.utrecht-rich-text':
            return (
              component.content && (
                <BlockDetail key={index} index={index} component={component.__component}>
                  <Markdown>{component.content}</Markdown>
                </BlockDetail>
              )
            );
          case 'components.utrecht-logo-button':
            if (component.openFormsEmbed) {
              const parsOpenFormsEmbedData = new URLSearchParams(component.openFormsEmbed);
              const slug = parsOpenFormsEmbedData.get('slug');
              const label = parsOpenFormsEmbedData.get('label');
              return (
                <BlockDetail key={index} index={index} component={component.__component}>
                  <LogoButton
                    label={component.label}
                    appearance={component?.appearance as string}
                    logo={component.logo}
                    href={slug ?? '#'}
                  >
                    {component.textContent || label}
                  </LogoButton>
                </BlockDetail>
              );
            }
            if (component && component.href && component.textContent) {
              return (
                <BlockDetail key={index} index={index} component={component.__component}>
                  <LogoButton
                    href={component.href}
                    appearance={component.appearance as string}
                    label={component.label}
                    logo={component.logo}
                  >
                    {component.textContent}
                  </LogoButton>
                </BlockDetail>
              );
            }
            return <></>;
          case 'components.faq':
            if (Array.isArray(component.pdc_faq?.faq)) {
              return (
                <BlockDetail key={index} index={index} component={component.__component}>
                  <AccordionProvider
                    sections={component.pdc_faq.faq.map((faqItem: any) => ({
                      id: faqItem?.id,
                      label: faqItem?.label as string,
                      headingLevel: faqItem?.headingLevel || 2,
                      body: faqItem?.body && <Markdown>{faqItem.body}</Markdown>,
                    }))}
                  />
                </BlockDetail>
              );
            }
            return <></>;
          case 'components.utrecht-accordion':
            if (component?.item && component.item.length > 0) {
              return (
                <BlockDetail key={index} index={index} component={component.__component}>
                  <AccordionProvider
                    key={index}
                    sections={component.item.map((accordionItem: any) => ({
                      id: accordionItem?.id,
                      label: accordionItem?.label as string,
                      headingLevel: accordionItem?.headingLevel || 2,
                      body: accordionItem?.body && <Markdown>{accordionItem.body}</Markdown>,
                    }))}
                  />
                </BlockDetail>
              );
            }
            return <BlockDetail key={index} index={index} component={component.__component}></BlockDetail>;
          case 'components.utrecht-image':
            if (component.imageData?.width && component.imageData?.height && component?.imageData?.url) {
              return (
                <BlockDetail key={index} index={index} component={component.__component}>
                  <Image
                    src={component?.imageData?.url}
                    width={component?.imageData?.width}
                    height={component?.imageData?.height}
                    alt={component?.imageData?.alternativeText || component?.imageData?.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </BlockDetail>
              );
            }
            return <BlockDetail key={index} index={index} component={component.__component}></BlockDetail>;
          case 'components.utrecht-spotlight':
            return (
              component.content && (
                <BlockDetail key={index} index={index} component={component.__component}>
                  <SpotlightSection type={component.type}>
                    <Markdown>{component.content}</Markdown>
                    {component?.logoButton &&
                      component?.logoButton.length > 0 &&
                      component?.logoButton?.map(
                        (button: any) =>
                          button?.href && (
                            <LogoButton
                              key={button?.id}
                              href={button?.href}
                              appearance={button?.appearance as string}
                              label={button?.label}
                              logo={button?.logo}
                            >
                              {button?.textContent}
                            </LogoButton>
                          ),
                      )}
                  </SpotlightSection>
                </BlockDetail>
              )
            );
          case 'components.utrecht-multi-columns-button':
            return <MultiColumnsButton columns={component.column as any} />;
          case 'components.utrecht-link':
            return (
              component?.href &&
              component?.textContent && (
                <BlockDetail key={index} index={index} component={component.__component}>
                  <ButtonGroup className="utrecht-link-group">
                    <AdvancedLink
                      key={component?.href}
                      href={component?.href}
                      icon={component?.icon as 'arrow'}
                      lang={component?.language ?? undefined}
                    >
                      {component?.textContent}
                    </AdvancedLink>
                  </ButtonGroup>
                </BlockDetail>
              )
            );
          default:
            return <></>;
        }
      })}
  </>
);
