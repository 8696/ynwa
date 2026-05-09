export interface NavItem {
  type: 'category' | 'tag' | 'link'
  label: string
  value: string
  target?: '_blank'
}

export interface Category {
  id: string
  name: string
  description?: string
}

export interface Tag {
  id: string
  name: string
}

export interface Article {
  id: string
  title: string
  categories: string[]
  tags: string[]
  date: string
  summary: string
  file: string
  cover: string
}

export interface DB {
  nav: NavItem[]
  categories: Category[]
  tags: Tag[]
  articles: Article[]
}

export interface PaginatedResult<T> {
  items: T[]
  current: number
  totalPages: number
  total: number
}

export interface SearchResult {
  post: Article
  matchedField: 'title' | 'summary'
}
