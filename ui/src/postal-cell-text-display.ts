import { getOrderNames } from './postal-setting'
import type { PostalSetting } from './postal-setting'
import type { CellTextDisplay, TextDisplay } from './page-generator'
import { postalSettingToLocationFontSize } from './postal-setting'

/**
 *  create cell text display  
 */
export function createCellTextDisplayFromAddress(
  postalSetting: PostalSetting,
  userAddress: string[]): CellTextDisplay {

  const locFontSizeMap = postalSettingToLocationFontSize(postalSetting)
  const settingNames = getOrderNames()

  const textDisplays = [] as TextDisplay[]
    if (settingNames.length <= userAddress.length) {
    settingNames.forEach((name, idx) => {
      const locFontSize  = locFontSizeMap[name]!
      textDisplays.push({
        ...locFontSize,
        value: userAddress[idx]! 
      })
    })
  }
  return {
    textDisplays
  }
}

/**
 *  create cell text display  
 */
export function createCellTextDisplayFromAddresses(
  postalSetting: PostalSetting,
  userAddresses: string[][]): CellTextDisplay[] {

  const result = [] as CellTextDisplay[]

  userAddresses.forEach(userAddress => {
    result.push(createCellTextDisplayFromAddress(postalSetting, userAddress))
  })
  return result
}

  

// vi: se ts=2 sw=2 et:
