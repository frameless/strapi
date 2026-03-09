import { hydrateRoot } from 'react-dom/client';

import { PreviewPage } from '../components/PreviewPage';

hydrateRoot(document.getElementById('root')!, <PreviewPage />);
