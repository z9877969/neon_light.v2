import s from "./Tabs.module.scss";
import clsx from "clsx";

const Tabs = ({ onOwnDesign, onFormInscription, activeBtn }) => {
  return (
    <div className={s.tabsWrapper}>
      <button
        onClick={onOwnDesign}
        className={clsx(s.tabsButton, activeBtn && s.active)}
        type="button"
      >
        <b>Створити напис</b>
      </button>
      <button
        onClick={onFormInscription}
        className={clsx(s.tabsButton, !activeBtn && s.active)}
        type="button"
      >
        <b>У мене свій дизайн</b>
      </button>
    </div>
  );
};

export default Tabs;
