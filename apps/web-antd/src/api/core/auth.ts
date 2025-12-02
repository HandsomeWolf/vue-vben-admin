import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录 - 对接真实后端接口
 */
export async function loginApi(data: AuthApi.LoginParams) {
  // 修改为真实后端登录接口路径
  const result = await requestClient.post<AuthApi.LoginResult>(
    '/v1/auth/signin',
    data,
  );

  // 后端返回的字段是 access_token，需要映射为前端使用的 accessToken
  return {
    accessToken: result.accessToken,
  };
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>(
    '/v1/auth/refresh',
    {
      withCredentials: true,
    },
  );
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/v1/auth/logout', {
    withCredentials: true,
  });
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/v1/auth/codes');
}
