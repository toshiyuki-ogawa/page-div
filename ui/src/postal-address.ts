
import type { CellTextDisplay, TextDisplay } from './page-generator'

/**
 * create postal address cell text display
 */
export function createPostalAddressCellDisplays(): CellTextDisplay[] {
  const displayInfos = [
    [5, 5, 10], // postal code
    [5, 8, 10], // address
    [5, 12, 10], // organization
    [5, 15, 10], // role
    [5, 20, 10], // name
  ]
  const addressInfos = [
    [
      '350-1108',
      'kawagoe city isehara 5',
      'ogawa creation',
      'ceo',
      'Toshiyuki Ogawa'
    ],
    [
      '350-1108',
      'kawagoe city isehara 5',
      'ogawa creation',
      'ceo',
      'Toshiyuki Ogawa-2'
    ]
  ]

  const result = addressInfos.map(addressItem => {
    const textDisplays = addressItem.map((elem, idx) => {
      return {
        location: [ displayInfos[idx]![0]!, displayInfos[idx]![1]! ],
        fontSize: displayInfos[idx]![2]!,
        value: elem
      } as TextDisplay
    })
    return {
      textDisplays
    } 
  }) 
  return result
}


// vi: se ts=2 sw=2 et:
