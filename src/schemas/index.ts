import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    restaurantNameEn: yup
        .string()
        .required('Name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only English letters are allowed'),
    restaurantNameAr: yup
        .string()
        .required('Name is required')
        .matches(/^[\u0600-\u06FF\s]+$/, 'Only Arabic letters are allowed'),
    email: yup
        .string()
        .required('Email is required')
        .email('Email is not valid'),
    bankAccountIBAN: yup
        .string()
        .required('IBAN is required'),
    password: yup
        .string()
        .required('Password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password'), ''], 'Passwords must match'),
    restaurantType: yup
        .string(),
    commercialRegistrationNumber: yup
        .string()
        .required('Commercial registration number is required'),
        operationRepresentativeEmail: yup
        .string()
        .required('Operation representative email is required')
        .email('Email is not valid'),
    operationRepresentativePhoneNumber: yup
        .string()
        .required('Operation representative phone number is required'),
        // .matches(/^\d+$/, 'Phone number must be digits only')
        // .min(8, 'Phone number must be at least 8 digits')
        // .max(15, 'Phone number must be at most 15 digits'),
        operationRepresentativeFullNameEn: yup
        .string()
        .required('Operation representative full name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only English letters are allowed'),
    operationRepresentativeFullNameAr: yup
        .string()
        .required('Operation representative full name is required')
        .matches(/^[\u0600-\u06FF\s]+$/, 'Only Arabic letters are allowed'),
    managementPhoneNumber: yup
        .string()
        .required('Management phone number is required'),
        // .matches(/^\d+$/, 'Phone number must be digits only')
        // .min(8, 'Phone number must be at least 8 digits')
        // .max(15, 'Phone number must be at most 15 digits'),
    mainBranchNameAr: yup
        .string()
        .required('Main branch name is required')
        .matches(/^[\u0600-\u06FF\s]+$/, 'Only Arabic letters are allowed'),
    mainBranchNameEn: yup
        .string()
        .required('Main branch name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only English letters are allowed'),
        branchDistrict: yup
        .string(),
    branchAddressName: yup
        .string(),
    branchStreet: yup
        .string(),
    branchBuildingNumber: yup
        .string(),
    branchAddressDescription: yup
        .string(),
    twitterSocialMediaAccount: yup
        .string(),
    instagramSocialMediaAccount: yup
        .string(),
    workingHours: yup
    .array()
        .of(
            yup.object().shape({
                day: yup.string().required('Day is required'),
                from: yup.string().required('Start time is required'),
                to: yup.string().required('End time is required'),
            })
            .test('valid-time', 'End time must be after start time', (value) => {return (value.from < value.to)})
        )
    .min(1, 'At least one working hour is required')
    .max(7, 'Maximum of 7 working hours are allowed')
    .required('Working hours are required'),
    googleMapsLocationLink: yup
        .string()
        .required('Google Maps location link is required'),
    contract: yup
        .mixed()
        .required('Please upload this file'),
    restaurantImage: yup
        .mixed()
        .required('Please upload this file'),
    commercialLicenseNumber: yup
        .mixed()
        .required('Please upload this file'),
    taxCertificateNumber: yup
        .mixed()
        .required('Please upload this file'),
});
