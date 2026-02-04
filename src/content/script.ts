// Put all the javascript code here, that you want to execute after page load.
document.addEventListener('click', (e) => {
  const node = document.createElement('div');

  node.style.position = 'absolute';
  node.style.left = `${e.clientX + window.scrollX}px`;
  node.style.top  = `${e.clientY + window.scrollY}px`;

  // example styling so it's visible
  node.style.width = '10px';
  node.style.height = '10px';
  node.style.background = 'red';

  document.body.appendChild(node);
});