import { Heading2 } from "@utrecht/component-library-react";
import { Markdown } from "../Markdown";
import classnames from "classnames/bind";

import { Accordion } from "../Accordion";

import styles from "./index.module.css";

type AccordionType = {
  id: string;
  title: string;
  body: string;
};

export interface FAQSectionProps {
  sectionTitle?: string;
  accordion?: AccordionType[];
  locale?: string;
}
const cx = classnames.bind(styles);

export const FAQSection: React.FC<FAQSectionProps> = ({ sectionTitle, accordion, locale }) => (
  <section className={cx("utrecht-faq-section")}>
    <Heading2>{sectionTitle}</Heading2>
    {accordion &&
      accordion.length > 0 &&
      accordion.map(({ id, title, body }: any) => (
        <Accordion locale={locale} key={id} label={title} body={<Markdown>{body}</Markdown>} />
      ))}
  </section>
);
