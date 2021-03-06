import type { TProps } from '../types';

/** Check key in row have in filters.
 * @param row TProps
 * @param filters TProps
 * @return boolean
 */
function isInFilters(row: TProps, filters?: TProps) {
  for (let key in filters) {
    if (filters[key] instanceof RegExp) {
      const regex = new RegExp(filters[key]);
      return row[key] && regex.test(row[key]);
    }
    return row[key] && row[key] === filters[key];
  }
  return true;
}

export default isInFilters;
