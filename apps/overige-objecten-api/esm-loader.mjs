// Node.js ESM loader that rewrites `classnames/bind` to `classnames/bind.js` at runtime.
// Required because @frameless/ui externalizes all deps in its Vite build, preserving the
// bare specifier in dist/index.esm.js which Node.js strict ESM cannot resolve.
// Equivalent to Next.js `transpilePackages` — fixes resolution without modifying the UI package.

export const resolve = async (specifier, context, nextResolve) => {
  if (specifier === 'classnames/bind') {
    return nextResolve('classnames/bind.js', context);
  }
  return nextResolve(specifier, context);
};
