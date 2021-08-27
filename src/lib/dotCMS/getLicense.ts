// Dependencies
import type { DotCMSConfigurationItem } from 'dotcms/lib/models'

// Internals
import { dotCMS } from './'

/**
 * Get DotCMS license information
 */
export const getLicense = async (): Promise<
  DotCMSConfigurationItem['license']
> => {
  return dotCMS.config
    .get()
    .then(({ license }) => license)
    .catch((error) => {
      throw error
    })
}
