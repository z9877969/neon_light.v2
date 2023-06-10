import Container from "./Container/Container";
import FormInscription from "./FormInscription/FormInscription";
import Tabs from "./Tabs/Tabs";
import { useState } from "react";
import OwnDesign from "./OwnDesign/OwnDesign";
import ScreenComponent from "./Screen/Screen";

const App = () => {
  const [formInscription, setFormInscription] = useState(true);
  const [text, setText] = useState("");

  const onFormInscription = () => {
    setFormInscription(false);
  };

  const onOwnDesign = () => {
    setFormInscription(true);
  };

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <Container>
      <Tabs onFormInscription={onFormInscription} onOwnDesign={onOwnDesign} />
      {formInscription ? (
        <FormInscription text={text} onTextChange={handleTextChange} />
      ) : (
        <OwnDesign />
      )}
      <ScreenComponent text={text} />
    </Container>
  );
};

export default App;