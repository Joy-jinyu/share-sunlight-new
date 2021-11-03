declare global {
  declare let WeixinJSBridge: any

  declare interface Document {
    attachEvent: (event: string, handle: any) => void
  }
}

export {}
