import path from 'node:path'
import log4js from 'log4js'

const config = {
  // 日志地址，默认为项目根目录下的 logs 目录
  path: path.resolve('logs'),
  // 单位字节，默认20MB，单文件超过20MB开始自动分割文件
  // app.log.1 app.log.2 app.log.3 ...
  maxLogSize: 1024 * 1024 * 10 * 5,
  name: 'app',
  level: 'info', // 'error'
}

const cfg = {
  appenders: {
    [config.name]: {
      type: 'file',
      filename: `${config.path}/${config.name}.log`,
      maxLogSize: config.maxLogSize,
      backups: 10,
      category: config.name,
    },
  },
  categories: {
    default: {
      appenders: [config.name],
      level: config.level,
    },
  },
  replaceConsole: true,
}

log4js.configure(cfg)
export const log4j = log4js.getLogger(config.name)
// log4j.level = 'debug'
