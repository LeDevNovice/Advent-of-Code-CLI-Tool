import { convertToMarkdown } from '../src/utils/convertToMarkdown';

describe('convertToMarkdown', () => {
  it('should convert HTML headings to Markdown headings', () => {
    const html = '<div class="day-desc"><h2>Heading</h2></div>';
    const expectedMarkdown = '## Heading';
    expect(convertToMarkdown(html)).toBe(expectedMarkdown);
  });

  it('should convert HTML paragraphs to Markdown paragraphs', () => {
    const html = '<div class="day-desc"><p>Paragraph</p></div>';
    const expectedMarkdown = 'Paragraph';
    expect(convertToMarkdown(html)).toBe(expectedMarkdown);
  });

  it('should convert HTML emphasis to Markdown emphasis', () => {
    const html = '<div class="day-desc"><p><em>Emphasis</em></p></div>';
    const expectedMarkdown = '*Emphasis*';
    expect(convertToMarkdown(html)).toBe(expectedMarkdown);
  });

  it('should convert HTML links to Markdown links', () => {
    const html = '<div class="day-desc"><a href="https://example.com">Link</a></div>';
    const expectedMarkdown = '[https://example.com](Link)';
    expect(convertToMarkdown(html)).toBe(expectedMarkdown);
  });

  it('should remove all other HTML tags', () => {
    const html = '<div class="day-desc"><div>Div content</div><span>Span content</span></div>';
    const expectedMarkdown = 'Div content\nSpan content';
    expect(convertToMarkdown(html)).toBe(expectedMarkdown);
  });

  it('should throw an error if .day-desc is not found', () => {
    const html = '<div class="other-class"><p>Content</p></div>';
    expect(() => convertToMarkdown(html)).toThrow('Could not find the problem statement.');
  });
});
