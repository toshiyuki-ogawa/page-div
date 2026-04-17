import process from 'node:process'
import fs from 'node:fs/promises'
import path from 'node:path'


/**
 * show help message
 */
function showHelp() {

  const nodeName = path.basename(process.argv[0])
  const scriptName = path.basename(process.argv[1]) 

  const msg = `${nodeName} ${scriptName} [OPTIONS]
-h,--help             show this message.
-o,--output=[FILE]    specify output file path.
-c,--client-id=[ID]   specify client id.
`
  process.stdout.write(msg)
}

/**
 * parse command line
 */
function parseOption() {
  const option = {} 
  for (let idx = 2; idx < process.argv.length; idx++) {
    
    const arg = process.argv[idx]
    if ('-h' == arg || '--help' == arg) {
      option.showHelp = true
    } else if ('-o' == arg || '--output' == arg) {
      if (idx < process.argv.length - 1) {
        option.outputPath = process.argv[idx + 1]
        idx++
      }
    } else if (/--output=(.+)/.test(arg)) {
      option.outputPath = RegExp.$1
    } else if ('-c' == arg || '--client-id' == arg) {
      if (idx < process.argv.length - 1) {
        option.clientId = process.argv[idx + 1]
        idx++
      }
    } else if (/--client-id=(.+)/.test(arg)) {
      option.clientId = RegExp.$1
    }
  }
  return option
}

/**
 * generate root path text file
 */
async function generate(option) {
  if (option.clientId && option.outputPath) {
    let fh
    try {
      fh = await fs.open(option.outputPath, 'w')
      await fh.write(option.clientId)
    } finally {
      fh?.close()
    }
  }
}


/**
 * entry point
 */
async function mainProc() {
  let option = {} 
  if (process.env.CLIENT_ID) {
    option.clientId = process.env.CLIENT_ID
  }
  option = Object.assign(option, parseOption())
  if (option.showHelp) {
    showHelp()
  } else {
    generate(option)
  }
}

await mainProc()


// vi: se ts=2 sw=2 et:
