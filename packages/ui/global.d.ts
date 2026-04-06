declare module 'rollup-plugin-peer-deps-external';

declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.css' {
  const content: string;
  export default content;
}
