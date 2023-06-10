import s from "./BtnOpenModal.module.scss";

const BtnOpenModal = ({ type, text, onClose }) => {
  return (
    <button onClick={onClose} className={s.btnOpenModal} type={type}>
      {text}
    </button>
  );
};

export default BtnOpenModal;
