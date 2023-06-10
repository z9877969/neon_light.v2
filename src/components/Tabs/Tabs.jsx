import s from "./Tabs.module.scss";

const Tabs = ({ onOwnDesign, onFormInscription }) => {
  return (
    <div className={s.tabsWrapper}>
      <button onClick={onOwnDesign} className={s.tabsButton} type="button">
        <b>Створити напис</b>
      </button>
      <button
        onClick={onFormInscription}
        className={s.tabsButton}
        type="button"
      >
        <b>У мене свій дизайн</b>
      </button>
    </div>
  );
};

export default Tabs;
