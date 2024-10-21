import { request } from "@umijs/max";

export const getProductAll = async  (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<API.APIResponseStructure<any>>('/api/v1/product/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}