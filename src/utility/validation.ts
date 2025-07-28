import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Course title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a whole number")
    .min(0, "Price cannot be less than 0")
    .integer("Price must be an integer")
    .required("Price is required"),
  duration: Yup.string().required("Duration is required"),
  lessons_in_a_week: Yup.number()
    .typeError("Lessons per week must be a whole number")
    .min(1, "Lessons per week must be at least 1")
    .integer("Lessons per week must be an integer")
    .required("Lessons per week is required"),
  lesson_duration: Yup.string().required("Lesson duration is required"),
});

export const groupValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  course_id: Yup.number().required("Course is required"),
  status: Yup.string().required("Status is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
});

export const studentValidationSchema = (isEdit: boolean) =>
  Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
    lidId: Yup.number().required("Lid ID is required"),
    ...(isEdit
      ? {}
      : {
          password_hash: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("password_hash")], "Passwords do not match")
            .required("Confirm password is required"),
        }),
  });

export const teacherValidationSchema = (isEdit: boolean) =>
  Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    role: Yup.string().required("Role is required"),
    branchId: Yup.array()
      .min(1, "At least one branch must be selected")
      .required(),
    ...(isEdit
      ? {}
      : {
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        }),
  });

export const branchValidationSchema = Yup.object({
  name: Yup.string().required("Branch name is required"),
  address: Yup.string().required("Address is required"),
  call_number: Yup.string().required("Phone number is required"),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("Please input your email!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .required("Please input your password!"),
  role: Yup.string().required("Please select your role!"),
});

export const RoomValidation = Yup.object({
  branchId: Yup.number()
    .typeError("Filial ID raqam bo'lishi kerak")
    .required("Filial ID majburiy"),
  name: Yup.string()
    .required("Xona nomi majburiy")
    .min(2, "Xona nomi kamida 2 ta belgidan iborat bo'lishi kerak"),
  capacity: Yup.number()
    .typeError("Sigim raqam bolishi kerak")
    .required("Sigim majburiy")
    .positive("Sigim musbat son bolishi kerak")
    .integer("Sigim butun son bolishi kerak"),
});
