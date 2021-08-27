// Internals
import Container from './Container'

// TODO: add correct types with GraphQL-Codegen
export type SidebarProps = any

export const Sidebar = (sidebar: SidebarProps) => {
  return sidebar.containers
    ? sidebar.containers.map((container: any) => (
        <Container container={container} key={container.identifier} />
      ))
    : ''
}

export default Sidebar
