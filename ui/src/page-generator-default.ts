import type { PageGenerator as PageGeneratorProperties } from './page-generator'

/**
 * get page-generator default properties
 */
export function getPageGeneratorDefault(): PageGeneratorProperties {
  return {
    topMargin: 5,
    bottomMargin: 5,
    leftMargin: 5,
    rightMargin: 5,
    columnGap: 0,
    rowGap: 0,
    rowsCount: 6,
    columnsCount: 3,
    gridLineWidth: 0.001
  }
}
// vi: se ts=2 sw=2 et:
