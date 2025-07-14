export const switchRole = (role: string) => ({
  type: 'switch-role' as const,
  payload: { role },
});

export const updateUserInfo = (userInfo: any, userLoading?: boolean) => ({
  type: 'update-userInfo' as const,
  payload: { userInfo, userLoading },
});

export const updateSettings = (settings: any) => ({
  type: 'update-settings' as const,
  payload: { settings },
});

export type ActionType =
  | ReturnType<typeof switchRole>
  | ReturnType<typeof updateUserInfo>
  | ReturnType<typeof updateSettings>;
