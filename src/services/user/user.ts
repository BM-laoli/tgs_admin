import { request } from "@umijs/max";
import { PageReq } from "..";

export const userPage = async (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<any>('/api/v1/user_service/user/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};


export const createUser = async (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<any>('/api/v1/user_service/user/create_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

export const deleteUser = async (
  id?: any,
  options?: { [key: string]: any },
) => {
  return request<any>(`/api/v1/user_service/user/cancel/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
};

export const updateUser = async (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<any>('/api/v1/user_service/user/update_user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

// role CRUD
export const createRole = async (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<any>('/api/v1/user_service/role/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

export const queryRolePage = async (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<any>('/api/v1/user_service/role/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};


export const updateRole = async (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<any>('/api/v1/user_service/role/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

export const deleteRole = async (
  id?: any,
  options?: { [key: string]: any },
) => {
  return request<any>(`/api/v1/user_service/role/delete/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
};


// Permission CRUD
export const createPermission = async (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<any>('/api/v1/user_service/permission/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

export const queryPermissionPage = async (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<any>('/api/v1/user_service/permission/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};


export const updatePermission = async (
  body?: any,
  options?: { [key: string]: any },
) => {
  return request<any>('/api/v1/user_service/permission/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

export const deletePermission = async (
  id?: any,
  options?: { [key: string]: any },
) => {
  return request<any>(`/api/v1/user_service/permission/delete/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
};

export const queryPermissionById = async (
  id?: any,
  options?: { [key: string]: any },
) => {
  return request<any>(`/api/v1/user_service/permission/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
};

export const queryPermissionTree = async (
  id?: any,
  options?: { [key: string]: any },
) => {
  return request<any>(`/api/v1/user_service/permission/tree`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
};
