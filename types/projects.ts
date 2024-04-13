export type Projects = {
    /** File path relative to `contentDirPath` */
    _id: string
    _raw: RawDocumentData
    type: string
    title: string
    description: string
    siteurl?: string | undefined
    appurl?: string | undefined
    source: string
    nativepub?: string | undefined
    nativesource?: string | undefined
    docker: string
    siteimg: string
    mobileimg?: string | undefined
    locale: string
    tags?: string[] | undefined
    skills?: string[] | undefined
    priority: number
    /** Markdown file body */
    body: Markdown
    url: string
} 

export type Markdown = {
  raw: string;
  html: string;
}

export type RawDocumentData = {
  sourceFilePath: string;
  sourceFileName: string;
  sourceFileDir: string;
  contentType: string;
  flattenedPath: string;
}