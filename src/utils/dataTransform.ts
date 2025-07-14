/**
 * 数据转换工具函数
 * 替代 @antv/data-set 的数据处理功能
 */

export interface DataItem {
  [key: string]: any;
}

/**
 * 数据展开（fold）操作
 * 将多个字段转换为 key-value 对
 */
export function foldData(
  data: DataItem[],
  fields: string[],
  key: string = 'category',
  value: string = 'value',
): DataItem[] {
  const result: DataItem[] = [];

  data.forEach((item) => {
    fields.forEach((field) => {
      if (item[field] !== undefined) {
        const newItem = { ...item };
        delete newItem[field];
        newItem[key] = field;
        newItem[value] = item[field];
        result.push(newItem);
      }
    });
  });

  return result;
}

/**
 * 数据分组操作
 */
export function groupBy<T extends DataItem>(
  data: T[],
  keyField: string,
): Record<string, T[]> {
  return data.reduce(
    (groups, item) => {
      const key = item[keyField];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}

/**
 * 数据过滤操作
 */
export function filterData<T extends DataItem>(
  data: T[],
  predicate: (item: T) => boolean,
): T[] {
  return data.filter(predicate);
}

/**
 * 数据映射操作
 */
export function mapData<T extends DataItem, R extends DataItem>(
  data: T[],
  mapper: (item: T) => R,
): R[] {
  return data.map(mapper);
}

/**
 * 数据排序操作
 */
export function sortData<T extends DataItem>(
  data: T[],
  field: string,
  order: 'asc' | 'desc' = 'asc',
): T[] {
  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (order === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    }
  });
}

/**
 * 数据聚合操作
 */
export function aggregateData<T extends DataItem>(
  data: T[],
  groupField: string,
  aggregations: {
    field: string;
    operation: 'sum' | 'avg' | 'count' | 'max' | 'min';
    alias?: string;
  }[],
): DataItem[] {
  const grouped = groupBy(data, groupField);

  return Object.keys(grouped).map((key) => {
    const group = grouped[key];
    const result: DataItem = { [groupField]: key };

    aggregations.forEach((agg) => {
      const alias = agg.alias || `${agg.operation}_${agg.field}`;
      const values = group
        .map((item) => Number(item[agg.field]))
        .filter((v) => !isNaN(v));

      switch (agg.operation) {
        case 'sum':
          result[alias] = values.reduce((sum, val) => sum + val, 0);
          break;
        case 'avg':
          result[alias] =
            values.length > 0
              ? values.reduce((sum, val) => sum + val, 0) / values.length
              : 0;
          break;
        case 'count':
          result[alias] = group.length;
          break;
        case 'max':
          result[alias] = values.length > 0 ? Math.max(...values) : 0;
          break;
        case 'min':
          result[alias] = values.length > 0 ? Math.min(...values) : 0;
          break;
      }
    });

    return result;
  });
}

/**
 * 格式化数值为千位显示
 */
export function formatToThousands(value: number): string {
  return `${(value / 1000).toFixed(1)}k`;
}

/**
 * 格式化数值为百分比
 */
export function formatToPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

/**
 * 格式化数值为本地化字符串
 */
export function formatToLocaleString(value: number): string {
  return value.toLocaleString();
}
