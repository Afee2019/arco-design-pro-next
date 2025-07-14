export default function checkLogin() {
  // 开发环境自动登录
  if (process.env.NODE_ENV === 'development') {
    if (typeof window !== 'undefined' && !localStorage.getItem('userStatus')) {
      localStorage.setItem('userStatus', 'login');
      localStorage.setItem('userRole', 'admin');
    }
    return true;
  }
  return localStorage.getItem('userStatus') === 'login';
}
