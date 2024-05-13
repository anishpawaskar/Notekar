import axios from 'axios';

export async function fetchIMGUrl(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'k6cqqfz9');
  const { data } = await axios.post(
    'https://api.cloudinary.com/v1_1/dh8z8pstl/image/upload',
    formData,
  );
  return data?.url;
}
