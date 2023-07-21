import { VisualizationSpec } from 'react-vega';

export default {
  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
  description: 'A simple pie chart with labels.',
  title: {text: "VTH-inzet", fontSize: 18},
  data: {
    values: [
      { Inzet: 'Uitgaan en vermaak (7%)', value: 7 },
      { Inzet: 'Leefbaarheid (11%)', value: 11 },
      { Inzet: 'Veiligheid (28%)', value: 28 },
      { Inzet: 'Bouwen en slopen (9%)', value: 9 },
      { Inzet: 'Gebouwen: kwaliteit en gebruik (12%)', value: 12 },
      { Inzet: 'Verkeer (29%)', value: 29 },
      { Inzet: 'Milieu en energie (4%)', value: 4 },
    ],
  },
  encoding: {
    theta: { field: 'value', type: 'quantitative', stack: true },
    color: { field: 'Inzet', type: 'nominal' },
  },
  layer: [{ mark: { type: 'arc', outerRadius: 100, innerRadius: 60, tooltip: true } }],
} as VisualizationSpec;
