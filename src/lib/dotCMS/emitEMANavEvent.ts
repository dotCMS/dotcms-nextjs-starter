// Internals
import dotCMSApi from '@/config/dotcmsApi'

/**
 * When we are in EMA we need to tell dotcms that we are moving to another page,
 * we do it by emiting a custom event fom our web app
 */
export function emitEMANavEvent(url: string) {
  dotCMSApi.event.emit({
    name: 'remote-render-edit',
    data: { pathname: url },
  })
}
