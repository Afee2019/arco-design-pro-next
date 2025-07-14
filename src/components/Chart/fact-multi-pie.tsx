import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Spin, Grid } from '@arco-design/web-react';
import useRechartsTheme from '@/utils/useChartTheme';
import { groupBy } from '@/utils/dataTransform';

const { Row, Col } = Grid;

interface FactMultiPieProps {
  data: any[];
  loading: boolean;
  height: number;
}

const colors = ['#249eff', '#846BCE', '#21CCFF', '#86DF6C', '#0E42D2'];

function FactMultiPie(props: FactMultiPieProps) {
  const theme = useRechartsTheme();

  // 按 category 分组数据
  const groupedData = groupBy(props.data, 'category');
  const categories = Object.keys(groupedData);

  // 计算每个饼图的大小
  const pieSize = Math.min(
    200,
    (props.height - 100) / Math.ceil(categories.length / 2),
  );

  const renderCustomLabel = (entry: any) => {
    const percent = (entry.value * 100 || 0).toFixed(2);
    return `${percent}%`;
  };

  const renderCenterLabel = (category: string) => (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="14"
      fontWeight="500"
      fill={theme.textColor}
    >
      {category}
    </text>
  );

  return (
    <Spin loading={props.loading} style={{ width: '100%' }}>
      <div style={{ height: props.height || 400, padding: '10px 0' }}>
        <Row gutter={16}>
          {categories.map((category) => {
            const categoryData = groupedData[category];
            return (
              <Col span={12} key={category}>
                <div style={{ position: 'relative', height: pieSize + 40 }}>
                  <ResponsiveContainer width="100%" height={pieSize}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={pieSize / 3}
                        innerRadius={pieSize / 4}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [
                          `${(Number(value) * 100).toFixed(2)}%`,
                          'Percentage',
                        ]}
                        contentStyle={{
                          backgroundColor: theme.tooltipBg,
                          border: `1px solid ${theme.tooltipBorder}`,
                          borderRadius: '4px',
                        }}
                      />
                      {/* 中心标签 */}
                      <g>{renderCenterLabel(category)}</g>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* 统一图例 */}
        {props.data.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginTop: '20px',
            }}
          >
            {Array.from(new Set(props.data.map((item) => item.type))).map(
              (type, index) => (
                <div
                  key={type}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: colors[index % colors.length],
                    }}
                  />
                  <span style={{ color: theme.textColor, fontSize: '12px' }}>
                    {type}
                  </span>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </Spin>
  );
}

export default FactMultiPie;
