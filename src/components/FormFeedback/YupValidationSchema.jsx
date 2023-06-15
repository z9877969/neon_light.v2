import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[\p{L}\s]+$/u, `*Введіть дійсне ім'я!`)
    .min(2, `*Ваше ім'я занадто коротке!`)
    .max(40, `*Ваше ім'я занадто довге!`)
    .required("*Введіть ваше ім'я!"),
  phone: Yup.string()
    .matches(
      /^\+\d{1,3}\(\d{1,4}\)\d{3}[\s.-]\d{2}[\s.-]\d{2}$/,
      `*Введіть дійсний номер телефону в форматі +38(0XX)XXX-XX-XX`
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
