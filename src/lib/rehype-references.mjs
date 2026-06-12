// Tags "References" headings and their following list with classes
// so prose CSS can render citations compactly.
export default function rehypeReferences() {
  return (tree) => {
    const children = tree.children;
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (
        node.type === 'element' &&
        /^h[2-4]$/.test(node.tagName) &&
        textOf(node).trim().toLowerCase().replace(/:$/, '') === 'references'
      ) {
        addClass(node, 'references-heading');
        for (let j = i + 1; j < children.length; j++) {
          const next = children[j];
          if (next.type !== 'element') continue;
          if (next.tagName === 'ol' || next.tagName === 'ul') {
            addClass(next, 'references-list');
          }
          break;
        }
      }
    }
  };
}

function textOf(node) {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(textOf).join('');
  return '';
}

function addClass(node, className) {
  node.properties = node.properties || {};
  const existing = node.properties.className;
  node.properties.className = existing
    ? [].concat(existing, className)
    : [className];
}
