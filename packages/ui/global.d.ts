declare module 'rollup-plugin-peer-deps-external';

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
