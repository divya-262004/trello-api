
interface ImportMetaEnv{
    readonly VITE_TRELLO_API_KEY:string;
    readonly VITE_TRELLO_TOKEN: string;
    readonly VITE_TRELLO_URL: string;
}

interface ImportMeta{
    readonly env:ImportMetaEnv;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.css";
