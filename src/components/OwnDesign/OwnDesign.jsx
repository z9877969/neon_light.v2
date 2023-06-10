import BtnOpenModal from "../BtnOpenModal/BtnOpenMoadl";
import s from "./OwnDesign.module.scss";

const OwnDesign = () => {
  return (
    <section className="ownDesign">
      <p className={s.text}>
        Якщо у вас є макет (ескіз, приклад, фото), вам потрібно зображення,
        логотип або інший шрифт, залиште нам ваші побажання у заявці та, за
        потреби, додайте файл. Ми зв'яжемося з вами протягом 1 робочого дня.
      </p>
      <BtnOpenModal type="button" text="Отримати заказ" />
    </section>
  );
};

export default OwnDesign;
