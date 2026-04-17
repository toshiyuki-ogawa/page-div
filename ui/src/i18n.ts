/**
 * i18n type
 */
type I18n = {
  /**
   * current domain
   */
  domain?: string | null

  /**
   * message table
   */
  domainMessage?: { [key: string]: { [key]: string } } | null
}

/**
 * i18n setting
 */
const i18nSetting: I18n = { }

/**
 * set cuurrent domain
 */
export function setDomain(domain: string): void {
  i18nSetting.domain = domain
}

/**
 * get current domain
 */
export function getDomain(): string | null {
  return i18nSetting.domain ?? null
}

/**
 * load domain message table
 */
async function
loadDomainMessage(): Promise<{ [key: string]: { [key]: string } } | null> {
  let result = null
  try {
    const url = 'domain-message.php' 
    const searchParams = new URLSearchParams()
    searchParams.append('message', 'domain-message.json')
    const req = await fetch(`${url}?${searchParams.toString()}`)
    if (req.ok) {
      result = await req.json()
    }
  } catch (e) {
    console.log(`got error ${e}`)
  }
  return result
}

/**
 * load i18n setting from server
 */
export async function loadI18nSetting(): Promise<boolean> {
  let result = true
  if (!i18nSetting.domainMessage) {
    const domainMessage = await loadDomainMessage()
    result = domainMessage ? true : false
    i18nSetting.domainMessage = domainMessage
  }
  return result
}


/**
 * get text from domain
 */
export function getDomainText(domain: string | null, msg: string): string {
  let result = msg
  if (domain && i18nSetting.domainMessage) {
    const msgTable = i18nSetting.domainMessage[domain]
    if (msgTable) {
      result = msgTable[msg] ?? msg
    }
  }
  return result
}

/**
 * get text from default domain table
 */
export function getText(msg: string): string {
  return getDomainText(getDomain(), msg)
}

// vi: se ts=2 sw=2 et:
