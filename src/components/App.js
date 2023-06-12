import Container from "./Container/Container";
import FormInscription from "./FormInscription/FormInscription";
import Tabs from "./Tabs/Tabs";
import { useState } from "react";
import OwnDesign from "./OwnDesign/OwnDesign";
import ModalFeedback from "./ModalFeedback/ModalFeedback";
import FormFeedback from "./FormFeedback/FormFeedback";

const App = () => {
  const [formInscription, setFormInscription] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(!isOpen);
  };

  const onFormInscription = () => {
    setFormInscription(false);
  };
  const onOwnDesign = () => {
    setFormInscription(true);
  };

  return (
    <Container>
      <Tabs onFormInscription={onFormInscription} onOwnDesign={onOwnDesign} />
      {formInscription ? (
        <FormInscription />
      ) : (
        <OwnDesign onClose={handleModalClose} />
      )}
      {isOpen && (
        <ModalFeedback onClose={handleModalClose}>
          <FormFeedback />
        </ModalFeedback>
      )}
    </Container>
  );
};

export default App;
