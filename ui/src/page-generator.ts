import { jsPDF } from 'jspdf'
import { getNotoFontTTFBinaryString } from './google-font'

/**
 * location font size
 */
export type LocationFontSize = {
  /**
   * location
   */
  location: number[]

  /**
   * font size
   */
  fontSize: number
}

/**
 * text display
 */
export type TextDisplay = {

  /**
   * cell coordinate millimeter
   */
  location: number[]

  /**
   * font size point
   */
  fontSize: number

  /**
   * value
   */
  value: string
}

/**
 * cell text display
 */
export type CellTextDisplay = {
  
  /**
   * text display info
   */
  textDisplays: TextDisplay[]
}

/**
 * page generator properties
 */
export type PageGenerator = {
  /**
   * top mergin
   */
  topMargin?: number

  /**
   * bottom mergin
   */
  bottomMargin?: number

  /**
   * left mergin
   */
  leftMargin?: number

  /**
   * right mergin
   */
  rightMargin?: number


  /**
   * column gap
   */
  columnGap?: number

  /**
   * row gap
   */
  rowGap?: number


  /**
   * columns count
   */
  columnsCount?: number

  /**
   * rows count
   */
  rowsCount?: number

  /**
   * paper width
   */
  paperWidth?: number

  /**
   * paper height
   */
  paperHeight?: number


  /**
   * grid line width
   */
  gridLineWidth?: number
}

/**
 * get pagegenerator property key names
 */
export function getPageGeneratorNames(): string[] {
  return [
    'topMargin',
    'bottomMargin',
    'leftMargin',
    'rightMargin',
    'columnGap',
    'rowGap',
    'rowsCount',
    'columnsCount',
    'gridLineWidth'
  ] as string[]
}
 

/**
 * draw text 
 */
function drawText(
  doc: jsPDF,
  startX: number,
  startY: number,
  offsetX: number,
  offsetY: number,
  textDisplays: TextDisplay[]) {
  textDisplays.forEach(textDisplay => {
    doc.setFontSize(textDisplay.fontSize)
    const xCoord = startX + offsetX + textDisplay.location[0]!
    const yCoord = startY + offsetY + textDisplay.location[1]!
    doc.text(textDisplay.value, xCoord, yCoord)
  })

}
    

/**
 * draw lines
 */
function drawLines(
  pdf: jsPDF,
  direction: string,
  lines: number[],
  crossStart: number,
  crossEnd: number): void {

  const indices = 'x' == direction ? [1, 0] : [0, 1]
  lines.forEach(val => {
    const coord0 = [val, crossStart] as number[]
    const coord1 = [val, crossEnd] as number[]
    pdf.line(coord0[indices[0]!]!, coord0[indices[1]!]!,
      coord1[indices[0]!]!, coord1[indices[1]!]!, 'S')
  })
}


/***
 * calculate cell geometory info
 */
function calcCellGeomInfo(
  contentLength: number,
  gap: number,
  count: number): {
    position: number,
    length: number
  }[] {

  let result = []
  if (count > 1) {
    const gapLen = (count - 1) * gap
    if (gapLen < contentLength) {
      const cellLen = (contentLength - gapLen) / count
      result.push({
        position: 0,
        length: cellLen
      })
      for (let idx = 1; idx < count; idx++) {
        result.push({
          position: idx * cellLen + gap * idx,
          length: cellLen
        })
      }
    } else {
      result = calcCellGeomInfo(contentLength, gap, count - 1)   
    }
  } else {
    result.push({
      position: 0,
      length: contentLength
    }) 
  }
  return result
}

/**
 * setup pdf font 
 */
async function setupPdfFont(doc: jsPDF): Promise<void> {
  const notoTtfStr = await getNotoFontTTFBinaryString()
  doc.addFileToVFS('NotoSansJP-Regular.ttf', notoTtfStr)
  doc.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal')
  doc.setFont('NotoSansJP')
}

/**
 * draw border on page
 */
function drawBorder(
  doc: jsPDF,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  lineWidth: number,
  rowLines: number[],
  columnLines: number[]) {
  if (lineWidth > 0) {
    doc.setLineWidth(lineWidth)
    drawLines(doc, 'x', rowLines, startX, endX)
    drawLines(doc, 'y', columnLines, startY, endY)
  }
} 

/**
 * create pdf page
 */
export async function createPage(
  props: PageGenerator,
  cellTextDisplays: CellTextDisplay[]): Promise<string | null> {
  const paperWidth = props.paperWidth ?? 210
  const paperHeight = props.paperHeight ?? 297
  const paperWidthPt = (props.paperWidth ?? 210) * 2.8346456693 
  const paperHeightPt = (props.paperHeight ?? 297) * 2.8346456693 
  const rightMargin = props.rightMargin ?? 0
  const bottomMargin = props.bottomMargin ?? 0

  const startX = props.leftMargin ?? 0  
  const startY = props.topMargin ?? 0

  const endX = paperWidth - rightMargin
  const endY = paperHeight - bottomMargin

  const contentWidth = endX - startX
  const contentHeight = endY - startY 
  const columnCount = props.columnsCount ?? 1
  const rowCount = props.rowsCount ?? 1

  let result = null
  if (contentWidth > 0
    && contentHeight > 0
    && columnCount > 0
    && rowCount) {
    const columnGap = props.columnGap ?? 0
    const rowGap = props.rowGap ?? 0
    const cellGeomInfoCol = calcCellGeomInfo(
      contentWidth, columnGap, columnCount)
    const cellGeomInfoRow = calcCellGeomInfo(
      contentHeight, rowGap, rowCount)

    const columnLines = [] as number[]
    const rowLines = [] as number[]
    cellGeomInfoCol.forEach((geom, idx) => {
      const pos = startX + geom.position 
      if (pos > 0) {
        columnLines.push(pos)
      }
      if (columnGap > 0) {
        if (idx < cellGeomInfoCol.length - 1) {
          columnLines.push(pos + geom.length)
        }
      }
      if (idx == cellGeomInfoCol.length - 1 && rightMargin > 0) {
        columnLines.push(pos + geom.length)
      }
    }) 

    cellGeomInfoRow.forEach((geom, idx) => {
      const pos = startY + geom.position 
      if (pos > 0) {
        rowLines.push(pos)
      }
      if (rowGap > 0 || bottomMargin > 0) {
        rowLines.push(pos + geom.length)
      }
    })
    const doc = new jsPDF({
      unit: 'mm',
      format: [paperWidth, paperHeight] 
    })

    await setupPdfFont(doc)

    const lineWidth = props.gridLineWidth ?? 0
    drawBorder(doc, startX, startY, endX, endY,
      lineWidth, rowLines, columnLines) 
    if (cellTextDisplays.length) {
      const cellCountPerPage = cellGeomInfoCol.length * cellGeomInfoRow.length

      cellTextDisplays.forEach((item, idx) => {
        const idxInPage = idx % cellCountPerPage
        const colIdx = idxInPage % cellGeomInfoCol.length
        const rowIdx = Math.floor(idxInPage / cellGeomInfoCol.length)
        if (idxInPage == 0 && idx != 0) {
          doc.addPage([paperWidth, paperHeight])
          drawBorder(doc, startX, startY, endX, endY,
            lineWidth, rowLines, columnLines) 
        }
        drawText(
          doc,
          startX, startY,
          cellGeomInfoCol[colIdx]!.position,
          cellGeomInfoRow[rowIdx]!.position,
          item.textDisplays) 
      })
    }
    result = doc.output('datauristring') as string
  }
  return result
}


// vi: se ts=2 sw=2 et:
