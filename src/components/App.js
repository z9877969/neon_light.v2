import { useState } from "react";
import ModalFeedback from "./ModalFeedback/ModalFeedback";
import FormFeedback from "./FormFeedback/FormFeedback";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="App"></div>
      <button onClick={handleModalClose}>Open</button>
      {isOpen && (
        <ModalFeedback onClose={handleModalClose}>
          <FormFeedback />
        </ModalFeedback>
      )}
    </>
  );
}

export default App;
