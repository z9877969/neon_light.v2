import s from "./Tabs.module.scss";
import clsx from "clsx";

const Tabs = ({ onOwnDesign, onFormInscription, activeBtn }) => {
  return (
    <div className={s.tabsWrapper}>
      <button
        onClick={onOwnDesign}
        className={clsx(s.tabsButton, activeBtn && s.active)}
        type="button"
        aria-label="Create Inscription"
      >
        <b>Створити напис</b>
      </button>
      <button
        onClick={onFormInscription}
        className={clsx(s.tabsButton, !activeBtn && s.active)}
        type="button"
        aria-label="Own Design"
      >
        <b>У мене свій дизайн</b>
      </button>
    </div>
  );
};

export default Tabs;
