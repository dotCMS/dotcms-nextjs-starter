const COLUMS_TOTAL = 12

const SIDEBAR_SIZE_MAP = {
  small: 2,
  medium: 3,
  large: 4,
}

const getSidebarLayoutColumns = (sidebar: Record<string, any>) => {
  // @ts-ignore we can index with any but we need better types
  const sidebarSize = SIDEBAR_SIZE_MAP[sidebar.width]

  if (sidebar.location === 'right') {
    return {
      first: COLUMS_TOTAL - sidebarSize,
      second: sidebarSize,
    }
  }

  return {
    first: sidebarSize,
    second: COLUMS_TOTAL - sidebarSize,
  }
}

export type LayoutWithSidebarProps = {
  sidebar: Record<string, any>
  children: React.ReactNode
}

export const LayoutWithSidebar = ({
  sidebar,
  children,
}: LayoutWithSidebarProps) => {
  const columns = getSidebarLayoutColumns(sidebar)

  return (
    <>
      {/* <BootstrapRow>
                <BootstrapCol md={columns.first}>
                    {sidebar.location === 'left' ? <Sidebar {...sidebar} /> : children}
                </BootstrapCol>
                <BootstrapCol md={columns.second}>
                    {sidebar.location === 'right' ? <Sidebar {...sidebar} /> : children}
                </BootstrapCol>
            </BootstrapRow> */}
    </>
  )
}

export default LayoutWithSidebar
