import type { LocationFontSize } from './page-generator'

export type PostalSetting = {
  codeLocationX?: number
  codeLocationY?: number
  codeFontSize?: number
  addressLocationX?: number
  addressLocationY?: number
  addressFontSize?: number
  organizationLocationX?: number
  organizationLocationY?: number
  organizationFontSize?: number
  roleLocationX?: number
  roleLocationY?: number
  roleFontSize?: number
  nameLocationX?: number
  nameLocationY?: number
  nameFontSize?: number
}

const namesList = [
  [ 
    'codeLocationX',
    'codeLocationY',
    'codeFontSize',
    'code',
  ],
  [
    'addressLocationX',
    'addressLocationY',
    'addressFontSize',
    'address'
  ],
  [
    'organizationLocationX',
    'organizationLocationY',
    'organizationFontSize',
    'organization'
  ],
  [
    'roleLocationX',
    'roleLocationY',
    'roleFontSize',
    'role'
  ],
  [
    'nameLocationX',
    'nameLocationY',
    'nameFontSize',
    'name'
  ]
] as string[][]

/**
 * get names order
 */
export function getOrderNames(): string[] {
  return namesList.map(names => names[3]!)
}

/**
 * get properties
 */
export function getPropertiesNames(): string[] {
  const result = [] as string[]
  namesList.forEach(names => result.push(names[0]!, names[1]!, names[2]!))
  return result 
}



/**
 * convert postal setting to location font size map 
 */
export function postalSettingToLocationFontSize(
  props: PostalSetting): {
    [name: string]: LocationFontSize
  } {

  const result = { } as {
    [name: string]: LocationFontSize 
  }
  const sourceInputs = props as { [name: string]: number }
  namesList.forEach(names => {
    const x = sourceInputs[names[0]!] 
    const y = sourceInputs[names[1]!]
    const fontSize = sourceInputs[names[2]!]
    if (typeof x === 'number'
      && typeof y === 'number'
      && typeof fontSize === 'number') {
      result[names[3]!] = {
        location: [ x, y ],
        fontSize: fontSize
      }
    }
  })
  return result 
}

// vi: se ts=2 sw=2 et:
