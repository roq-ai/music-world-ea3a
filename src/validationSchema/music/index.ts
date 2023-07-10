import * as yup from 'yup';

export const musicValidationSchema = yup.object().shape({
  title: yup.string().required(),
  artist_id: yup.string().nullable(),
  label_id: yup.string().nullable(),
});
