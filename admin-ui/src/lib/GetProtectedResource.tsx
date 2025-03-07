// /lib/GetProtectedResource.tsx

import axiosInstance from '../utils/axios/axios';

export async function getProtectedResource() {
    const { data } = await axiosInstance.get('/protected');
    return data;
}
