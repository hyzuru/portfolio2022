import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export function renderPost() {
  if (document.querySelector('code')) {
    document.querySelectorAll('code').forEach((el) => {
      let content = el.outerHTML;
      let parent = el.parentElement;

      if (el.parentElement.childNodes.length === 1) {
        return (parent.innerHTML = `<pre>${content}</div>`);
      }
    });
  }
}
