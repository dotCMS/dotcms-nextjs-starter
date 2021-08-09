// Internals
import { dotCMS } from './'

/**
 * When we are in EMA we need to tell dotcms that we are moving to another page,
 * we do it by emiting a custom event fom our web app
 */
export function emitEMANavEvent(url: string) {
  dotCMS.event.emit({
    name: 'remote-render-edit',
    data: { pathname: url },
  })
}
