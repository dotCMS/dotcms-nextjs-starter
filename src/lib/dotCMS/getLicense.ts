// Internals
import dotCMSApi from '@/config/dotcmsApi'
import type { DotCMSConfigurationItem } from 'dotcms/lib/models'

/**
 * Get DotCMS license information
 */
export const getLicense = async (): Promise<
  DotCMSConfigurationItem['license'] | Error
> => {
  return dotCMSApi.config
    .get()
    .then(({ license }) => license)
    .catch((error) => {
      throw error
    })
}
