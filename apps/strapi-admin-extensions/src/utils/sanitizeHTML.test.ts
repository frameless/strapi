import { sanitizeHTML } from './sanitizeHTML';

describe('sanitizeHTML', () => {
  it('should sanitize HTML', () => {
    const html = '<script>alert("test")</script>';
    const sanitizedHTML = sanitizeHTML(html);
    expect(sanitizedHTML).toBe('');
  });
  it('should sanitize HTML with style attribute', () => {
    const html = '<div style="color: red;">test</div>';
    const sanitizedHTML = sanitizeHTML(html);
    expect(sanitizedHTML).toBe('<div>test</div>');
  });
  it('should sanitize HTML with style attribute and script tag', () => {
    const html = '<div style="color: red;"><script>alert("test")</script>test</div>';
    const sanitizedHTML = sanitizeHTML(html);
    expect(sanitizedHTML).toBe('<div>test</div>');
  });
});
