import { Metadata } from 'next';

import wcagEmJSON from '../../../../../wcag-evaluation.json';

import { AuditRapport } from '@/components/AuditRapport';
import './index.scss';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Toegankelijkheid',
  };
}

const Toegankelijkheid = async () => {
  return <AuditRapport evaluation={wcagEmJSON} />;
};

export default Toegankelijkheid;
