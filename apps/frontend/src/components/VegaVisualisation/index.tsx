'use client';

import { Vega, VisualizationSpec } from "react-vega";

interface VegaVisualisationProps {
  spec: VisualizationSpec;
}

export const VegaVisualisation = ({ spec }: VegaVisualisationProps) => (
  <Vega spec={spec} />
);
