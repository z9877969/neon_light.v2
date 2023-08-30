import s from "./OwnDesign.module.scss";

const OwnDesign = ({ openModal }) => {
  return (
    <section className={s.ownDesign}>
      <p className={s.text}>
        Якщо у вас є макет (ескіз, приклад, фото), вам потрібно зображення,
        логотип або інший шрифт, залиште нам ваші побажання у заявці та, за
        потреби, додайте файл. Ми зв'яжемося з вами протягом 1 робочого дня.
      </p>
      <button type="button" className={s.btnOpenModal} onClick={openModal}>
        Залишити заявку
      </button>
    </section>
  );
};

export default OwnDesign;
