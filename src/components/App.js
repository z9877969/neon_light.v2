import Container from "./Container/Container";
import FormInscription from "./FormInscription/FormInscription";
import Tabs from "./Tabs/Tabs";
import { useState } from "react";
import OwnDesign from "./OwnDesign/OwnDesign";
const App = () => {
  const [formInscription, setFormInscription] = useState(true);

  const onFormInscription = () => {
    setFormInscription(false);
  };
  const onOwnDesign = () => {
    setFormInscription(true);
  };

  return (
    <Container>
      <Tabs onFormInscription={onFormInscription} onOwnDesign={onOwnDesign} />
      {formInscription ? <FormInscription /> : <OwnDesign />}
    </Container>
  );
};

export default App;
