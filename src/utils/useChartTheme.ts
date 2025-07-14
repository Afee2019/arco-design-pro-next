import { useSelector } from 'react-redux';
import { useMemo } from 'react';

interface RechartsTheme {
  textColor: string;
  gridColor: string;
  axisColor: string;
  tooltipBg: string;
  tooltipBorder: string;
  colors: string[];
  areaGradients: {
    [key: string]: {
      startColor: string;
      endColor: string;
    };
  };
}

const lightTheme: RechartsTheme = {
  textColor: '#1D2129',
  gridColor: '#E5E8EF',
  axisColor: '#E5E8EF',
  tooltipBg: 'white',
  tooltipBorder: '#E5E8EF',
  colors: [
    '#4080FF',
    '#722ED1',
    '#33D1C9',
    '#F77234',
    '#165DFF',
    '#249EFF',
    '#21CCFF',
    '#313CA9',
    '#86DF6C',
    '#0E42D2',
  ],
  areaGradients: {
    primary: {
      startColor: 'rgba(64, 128, 255, 0.5)',
      endColor: 'rgba(64, 128, 255, 0.1)',
    },
    secondary: {
      startColor: 'rgba(114, 46, 209, 0.5)',
      endColor: 'rgba(114, 46, 209, 0.1)',
    },
  },
};

const darkTheme: RechartsTheme = {
  textColor: '#FFFFFF',
  gridColor: '#2E3336',
  axisColor: '#2E3336',
  tooltipBg: '#17171A',
  tooltipBorder: '#2E3336',
  colors: [
    '#6495ED',
    '#9370DB',
    '#40E0D0',
    '#FF6347',
    '#4169E1',
    '#1E90FF',
    '#00CED1',
    '#4682B4',
    '#32CD32',
    '#191970',
  ],
  areaGradients: {
    primary: {
      startColor: 'rgba(100, 149, 237, 0.5)',
      endColor: 'rgba(100, 149, 237, 0.1)',
    },
    secondary: {
      startColor: 'rgba(147, 112, 219, 0.5)',
      endColor: 'rgba(147, 112, 219, 0.1)',
    },
  },
};

function useRechartsTheme(): RechartsTheme {
  const theme = useSelector((state: any) => state.theme);

  const themeObj = useMemo(() => {
    return theme === 'dark' ? darkTheme : lightTheme;
  }, [theme]);

  return themeObj;
}

// 向后兼容的别名
export const useBizTheme = useRechartsTheme;
export default useRechartsTheme;
