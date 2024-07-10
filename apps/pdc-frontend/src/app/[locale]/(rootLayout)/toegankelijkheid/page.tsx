import { Metadata } from 'next';
import { AuditRapport } from '@/components/AuditRapport';
import wcagEmJSON from '../../../../../wcag-evaluation.json';
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
