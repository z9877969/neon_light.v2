import s from "./BtnOpenModal.module.scss";

const BtnOpenModal = ({ type, text }) => {
  return (
    <button className={s.btnOpenModal} type={type}>
      {text}
    </button>
  );
};

export default BtnOpenModal;
