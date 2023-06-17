import s from "./BtnOpenModal.module.scss";

const BtnOpenModal = ({ type, text, openModal }) => {
  return (
    <button onClick={openModal} className={s.btnOpenModal} type={type}>
      {text}
    </button>
  );
};

export default BtnOpenModal;
