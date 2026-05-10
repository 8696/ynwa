/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 文章 file / cover 为 OSS 相对路径时的公网根 URL（无尾斜杠），例：https://bucket.oss-cn-shenzhen.aliyuncs.com */
  readonly VITE_PUBLIC_ASSET_BASE?: string
}

declare module 'ali-oss' {
  interface OSSOptions {
    region: string
    accessKeyId: string
    accessKeySecret: string
    bucket: string
    stsToken?: string
    secure?: boolean
  }

  interface PutResult {
    url: string
    name: string
    res: object
  }

  interface MultipartUploadResult {
    name: string
    res: object
  }

  interface MultipartUploadOptions {
    progress?: (p: number) => void
    headers?: Record<string, string>
    partSize?: number
  }

  class OSS {
    constructor(options: OSSOptions)
    put(key: string, file: File | Blob, options?: { headers?: Record<string, string> }): Promise<PutResult>
    multipartUpload(key: string, file: File, options?: MultipartUploadOptions): Promise<MultipartUploadResult>
  }

  export = OSS
}
