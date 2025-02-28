import { dispatchLabel, generateLabel } from './generateLabel';

describe('generateLabel', () => {
  it('should generate a label from content', () => {
    const content = '<p>Test content</p>';
    const name = 'testName';
    const result = generateLabel({ content, name });
    expect(result.label).toBe('Test content');
    expect(result.name).toBe(name);
    expect(result.labelKey).toBe('richtextContent_testName');
    expect(result.content).toBe(content);
  });

  it('should handle empty content', () => {
    const content = '';
    const name = 'testName';
    const result = generateLabel({ content, name });
    expect(result.label).toBe('');
    expect(result.name).toBe(name);
    expect(result.labelKey).toBe('');
    expect(result.content).toBe(content);
  });

  it('should handle content with HTML tags', () => {
    const content = '<p><strong>Bold</strong> and <em>italic</em> text</p>';
    const name = 'testName';
    const result = generateLabel({ content, name });
    expect(result.label).toBe('Bold and italic text');
    expect(result.name).toBe(name);
    expect(result.labelKey).toBe('richtextContent_testName');
    expect(result.content).toBe(content);
  });

  it('should handle content with new lines', () => {
    const content = '<p>Line 1\nLine 2</p>';
    const name = 'testName';
    const result = generateLabel({ content, name });
    expect(result.label).toBe('Line 1 Line 2');
    expect(result.name).toBe(name);
    expect(result.labelKey).toBe('richtextContent_testName');
    expect(result.content).toBe(content);
  });

  it('should handle content with HTML entities', () => {
    const content = '<p>&lt;div&gt;HTML entities&lt;/div&gt;</p>';
    const name = 'testName';
    const result = generateLabel({ content, name });
    expect(result.label).toBe('HTML entities');
    expect(result.name).toBe(name);
    expect(result.labelKey).toBe('richtextContent_testName');
    expect(result.content).toBe(content);
  });
});
describe('dispatchLabel', () => {
  it('should dispatch a custom event with the correct label', () => {
    const mockDispatchEvent = jest.fn();
    const originalDispatchEvent = window.dispatchEvent;
    window.dispatchEvent = mockDispatchEvent;

    const content = '<p>Test content</p>';
    const name = 'testName';
    const key = 'testKey';
    const label = 'Test label';

    dispatchLabel({ content, key, label, name });

    expect(mockDispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'labelUpdated',
        detail: { key, label, name, value: content },
      }),
    );

    window.dispatchEvent = originalDispatchEvent;
  });
});
