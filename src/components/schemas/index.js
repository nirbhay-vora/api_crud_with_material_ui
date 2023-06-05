import * as Yup from 'yup';

export const signupSchema = Yup.object({

    name:Yup.string().min(2).max(20).required("Name is required"),
    email:Yup.string().email().required("Email is required"),
    mobile:Yup.string()
    .matches(/^\d{10}$/, 'Mobile must be a 10-digit number')
    .required('Mobile is required'),
})