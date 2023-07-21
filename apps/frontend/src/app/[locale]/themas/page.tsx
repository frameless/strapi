import { VegaVisualisation } from "@/components/VegaVisualisation";
import exampleSpec1 from "./exampleSpec1";


const Themas = async () => {

  return (
    <>
      <VegaVisualisation spec={exampleSpec1} />
    </>
  );
};

export default Themas;
