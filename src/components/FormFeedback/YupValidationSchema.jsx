import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[\p{L}\s]+$/u, `*Введіть дійсне ім'я!`)
    .min(2, `*Ваше ім'я занадто коротке!`)
    .max(40, `*Ваше ім'я занадто довге!`)
    .required("*Введіть ваше ім'я!"),
  phone: Yup.string()
    .matches(
      /^\+380\d{9}$/,
      `*Введіть дійсний номер телефону, починаючи з +380!`
    )
    .required("*Введіть номер телефону!"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      `*Введіть дійсну електронну пошту`
    )
    .email("*Введіть дійсну електронну пошту!")
    .required("*Введіть електронну пошту!"),
  comment: Yup.string(),
  communicateBy: Yup.array()
    .min(1, "*Виберіть хоча б один метод спілкування!")
    .of(
      Yup.string().oneOf(
        ["email", "viber", "telegram"],
        "Недійсний метод спілкування"
      )
    ),
});
