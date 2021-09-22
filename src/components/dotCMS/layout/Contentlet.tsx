// Internals
import { getComponent } from '@/lib/dotCMS'

export type ContentletProps = {
  // TODO: add correct types with GraphQL-Codegen
  data: any
}

export const Contentlet = ({ data }: ContentletProps) => {
  let Component = getComponent(data)

  return <Component {...data} />
}

export default Contentlet
