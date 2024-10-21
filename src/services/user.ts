import { request } from "@umijs/max";

export const userLogin = async  (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<API.APIResponseStructure<API.UserInfo>>('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}