import { request } from '@umijs/max';

export interface IUserLoginReq {
  phone: string;
  password: string;
}
export interface IUserLoginRes {
  token: string;
  userInfo: {
    username: string;
    phone: string;
    avatar: string
  };
}

export const userLogin = async (
  body?: IUserLoginReq,
  options?: { [key: string]: any },
) => {
  return request<IUserLoginRes>('/api/Auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};


export const getUserList = async (
  id?: string,
  options?: { [key: string]: any },
) => {
  return request<IUserLoginRes>('/api/v1/user_service/user/find/'+id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}