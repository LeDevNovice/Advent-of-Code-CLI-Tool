import { JSDOM } from 'jsdom';

export function convertToMarkdown(html: string): string {
  const dom = new JSDOM(html);
  const article = dom.window.document.querySelector('.day-desc');

  if (!article) {
    throw new Error('Could not find the problem statement.');
  }

  let markdown = article.innerHTML
    .replace(/<h2>/g, '## ')
    .replace(/<\/h2>/g, '\n')
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n')
    .replace(/<em>/g, '*')
    .replace(/<\/em>/g, '*')
    .replace(/<code>/g, '')
    .replace(/<\/code>/g, '')
    .replace(/<pre><code>/g, '\n')
    .replace(/<\/code><\/pre>/g, '\n\n')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>/g, '[$1](')
    .replace(/<\/a>/g, ')')
    .replace(/<[^>]*>/g, '');

  return markdown.trim();
}
