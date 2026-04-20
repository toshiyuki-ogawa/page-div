import type { PostalSetting as PostalSettingProperties } from './postal-setting'

/**
 * get default postal setting
 */
export function getPostalSettingDefault(): PostalSettingProperties {
  return {
    codeLocationX: 5,
    codeLocationY: 6,
    codeFontSize: 10,
    addressLocationX: 5,
    addressLocationY: 12,
    addressFontSize: 10,
    organizationLocationX: 5,
    organizationLocationY: 22,
    organizationFontSize: 10,
    roleLocationX: 5,
    roleLocationY: 28,
    roleFontSize: 10,
    nameLocationX: 5,
    nameLocationY: 36,
    nameFontSize: 12,
    digestLocationX: 30,
    digestLocationY: 42,
    digestFontSize: 10
  }
}

// vi: se ts=2 sw=2 et:
