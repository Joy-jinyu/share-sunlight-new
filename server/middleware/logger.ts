import { log4j as logger } from '~/utils/log4j'

export default defineEventHandler((event) => {
  logger.info(`${event.path} - page start`)
})
