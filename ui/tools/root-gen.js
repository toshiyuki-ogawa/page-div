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
-r,--root=[DIR]       specify router root directory path.
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
    } else if ('-r' == arg || '--root' == arg) {
      if (idx < process.argv.length - 1) {
        option.rootPath = process.argv[idx + 1]
        idx++
      }
    } else if (/--root=(.+)/.test(arg)) {
      option.rootPath = RegExp.$1
    }
  }
  return option
}

/**
 * generate root path text file
 */
async function generate(option) {
  if (option.rootPath && option.outputPath) {
    let fh
    try {
      fh = await fs.open(option.outputPath, 'w')
      await fh.write(option.rootPath)
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
  if (process.env.ROOT_PATH) {
    option.rootPath = process.env.ROOT_PATH
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
