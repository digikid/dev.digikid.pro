declare global {
  interface Navigator {
    userLanguage?: string;
    browserLanguage?: string;
    systemLanguage?: string;
  }
}

export default global;
