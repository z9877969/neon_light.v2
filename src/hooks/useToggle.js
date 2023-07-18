import { useState } from "react";

const useToggle = () => {
  const [isModalOpen, setModalStatus] = useState(false);

  const handleToggleModal = () => {
    setModalStatus((prev) => !prev);
  };

  return { isModalOpen, handleToggleModal };
};

export default useToggle;
