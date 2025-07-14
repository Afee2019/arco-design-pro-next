import defaultSettings from '../settings.json';
export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: {
    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
    permissions: Record<string, string[]>;
    role?: string;
  };
  userLoading?: boolean;
}

const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: {
    permissions: generatePermission('admin'),
    role: 'admin',
  },
};

import { generatePermission } from '@/routes';

export default function store(state = initialState, action) {
  switch (action.type) {
    case 'update-settings': {
      const { settings } = action.payload;
      return {
        ...state,
        settings,
      };
    }
    case 'update-userInfo': {
      const { userInfo = initialState.userInfo, userLoading } = action.payload;
      return {
        ...state,
        userLoading,
        userInfo,
      };
    }
    case 'switch-role': {
      const { role } = action.payload;
      // 存储到localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('userRole', role);
      }
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          role,
          permissions: generatePermission(role),
        },
      };
    }
    default:
      return state;
  }
}
