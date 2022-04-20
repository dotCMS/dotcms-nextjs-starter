export interface DotCMSDetailPageProps {
  pageRender: PageRender
}

export interface PageRender {
  canCreateTemplate: boolean
  containers: Containers
  layout: Layout
  numberContents: number
  page: Page
  site: Site
  template: Template
  urlContentMap: URLContentMap
  viewAs: ViewAs
}

interface Containers {
  [key: string]: DefaultContainer
}

interface DefaultContainer {
  containerStructures: ContainerStructure[]
  rendered: Rendered
  contentlets: Contentlets
  container: Container
}

interface Container {
  archived: boolean
  categoryId: string
  deleted: boolean
  friendlyName: string
  host: Site
  iDate: number
  idate: number
  identifier: string
  inode: string
  languageId: number
  live: boolean
  locked: boolean
  map: ContainerMap
  maxContentlets: number
  modDate: number
  modUser: string
  name: string
  new: boolean
  notes: string
  owner: string
  parentPermissionable: Site
  path: string
  permissionId: string
  permissionType: string
  postLoop: string
  preLoop: string
  showOnMenu: boolean
  sortOrder: number
  source: string
  staticify: boolean
  title: string
  type: string
  useDiv: boolean
  versionId: string
  versionType: string
  working: boolean
}

interface Site {
  aliases: string
  archived: boolean
  categoryId: string
  contentTypeId: string
  default: boolean
  dotAsset: boolean
  fileAsset: boolean
  folder: string
  form: boolean
  host: string
  hostThumbnail?: string
  hostname: string
  htmlpage: boolean
  identifier: string
  indexPolicyDependencies: string
  inode: string
  keyValue: boolean
  languageId: number
  live: boolean
  locked: boolean
  lowIndexPriority: boolean
  map?: SiteMap
  modDate: number
  modUser: string
  name: string
  new: boolean
  owner: string
  parent: boolean
  permissionId: string
  permissionType: string
  persona: boolean
  sortOrder: number
  structureInode: string
  systemHost: boolean
  tagStorage: string
  title: string
  titleImage: TitleImage
  type: string
  vanityUrl: boolean
  versionId: string
  versionType: string
  working: boolean
}

interface SiteMap {
  __DOTNAME__: string
  addThis: string
  aliases: string
  description: string
  disabledWYSIWYG: any[]
  folder: string
  googleAnalytics: string
  googleMap: string
  host: string
  hostName: string
  hostname: string
  identifier: string
  inode: string
  isDefault: boolean
  isSystemHost: boolean
  keywords: string
  languageId: number
  modDate: number
  modUser: string
  nullProperties: string[]
  owner: string
  runDashboard: boolean
  sortOrder: number
  stInode: string
  tagStorage: string
  titleImage: string
  type: string
}

interface TitleImage {
  empty: boolean
  present: boolean
}

interface ContainerMap {
  deleted: boolean
  friendlyName: string
  hasLiveVersion: boolean
  iDate: number
  identifier: string
  inode: string
  live: boolean
  locked: boolean
  modDate: number
  modUser: string
  modUserName: string
  showOnMenu: boolean
  sortOrder: number
  title: string
  type: string
  working: boolean
}

interface ContainerStructure {
  id: string
  structureId: string
  containerInode: string
  containerId: string
  code: string
  contentTypeVar: string
}

interface Contentlets {
  'uuid-1': UUID1[]
}

interface UUID1 {
  hostName: string
  modDate: number
  publishDate: number
  title: string
  baseType: string
  inode: string
  archived: boolean
  path: string
  host: string
  working: boolean
  locked: boolean
  stInode: string
  contentType: string
  live: boolean
  owner: string
  identifier: string
  languageId: number
  widgetCodeJSON: Record<string, string>
  vtlFile: string
  url: string
  widgetTitle: string
  titleImage: string
  modUserName: string
  hasLiveVersion: boolean
  folder: string
  hasTitleImage: boolean
  sortOrder: number
  modUser: string
  widgetCode: string
}

interface Rendered {
  [key: string]: string
}

interface Layout {
  width?: string
  title?: string
  header: boolean
  footer: boolean
  body: Body
  sidebar?: Sidebar
}

interface Body {
  rows: Row[]
}

interface Row {
  columns: Column[]
  styleClass?: string
}

interface Column {
  containers: ContainerElement[]
  widthPercent: number
  leftOffset: number
  styleClass?: string
  preview: boolean
  width: number
  left: number
}

interface ContainerElement {
  identifier: string
  uuid: string
}

interface Sidebar {
  containers: any[]
  location: string
  width: string
  widthPercent: number
  preview: boolean
}

interface Page {
  __icon__: string
  archived: boolean
  baseType: string
  cachettl: string
  canEdit: boolean
  canLock: boolean
  canRead: boolean
  contentType: string
  deleted: boolean
  description: string
  extension: string
  folder: string
  friendlyName: string
  hasLiveVersion: boolean
  hasTitleImage: boolean
  host: string
  hostName: string
  httpsRequired: boolean
  identifier: string
  inode: string
  isContentlet: boolean
  languageId: number
  live: boolean
  liveInode: string
  locked: boolean
  lockedBy: string
  lockedByName: string
  lockedOn: number
  mimeType: string
  modDate: number
  modUser: string
  modUserName: string
  name: string
  owner: string
  pageURI: string
  pageUrl: string
  path: string
  publishDate: number
  shortyLive: string
  shortyWorking: string
  sortOrder: number
  stInode: string
  statusIcons: string
  template: string
  title: string
  titleImage: string
  type: string
  url: string
  working: boolean
  workingInode: string
  rendered: string
}

interface Template {
  iDate: number
  type: string
  owner: string
  inode: string
  identifier: string
  source: string
  title: string
  friendlyName: string
  modDate: number
  modUser: string
  sortOrder: number
  showOnMenu: boolean
  body: string
  image: string
  drawed: boolean
  drawedBody: string
  countAddContainer: number
  countContainers: number
  theme: string
  header: string
  footer: string
  template: boolean
  anonymous: boolean
  versionId: string
  versionType: string
  permissionId: string
  deleted: boolean
  working: boolean
  archived: boolean
  live: boolean
  name: string
  locked: boolean
  permissionType: string
  categoryId: string
  new: boolean
  idate: number
  canEdit: boolean
}

interface URLContentMap {
  hostName: string
  modDate: number
  publishDate: number
  blogContent?: string
  postingDate?: number
  title: string
  baseType: string
  inode: string
  archived: boolean
  host: string
  working: boolean
  locked: boolean
  stInode: string
  contentType: string
  live: boolean
  owner: string
  imageVersion: string
  identifier: string
  image: string
  imageContentAsset: string
  urlTitle: string
  languageId: number
  URL_MAP_FOR_CONTENT: string
  url: string
  tags: string
  titleImage: string
  modUserName: string
  urlMap: string
  hasLiveVersion: boolean
  folder: string
  hasTitleImage: boolean
  sortOrder: number
  modUser: string
  teaser?: string
  description?: string
  body?: string
  altTag?: string
  image2Version?: string
  productNumber?: string
  specifications1?: string
  image2ContentAsset?: string
  image2?: string
  image3?: string
  category?: Record<string, string>
  retailPrice?: string
  salePrice?: string
}

interface ViewAs {
  visitor: Visitor
  language: Language
  mode: string
}

interface Language {
  id: number
  languageCode: string
  countryCode: string
  language: string
  country: string
}

interface Visitor {
  tags: any[]
  device: string
  isNew: boolean
  userAgent: UserAgent
  personas: Record<string, unknown>
}

interface UserAgent {
  operatingSystem: string
  browser: string
  id: number
}
