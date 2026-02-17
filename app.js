async function loadResources() {
  const res = await fetch("resources.json");
  return res.json();
}

function renderNode(node, container, activeTag) {
  const wrapper = document.createElement("div");
  wrapper.className = "node";

  if (node.url) {
    if (
      activeTag &&
      (!node.tags || !node.tags.includes(activeTag))
    ) {
      return;
    }

    const item = document.createElement("div");
    item.className = "item";
    item.textContent = node.title;
    item.dataset.note = node.note || "";
    item.onclick = () => window.open(node.url, "_blank");

    wrapper.appendChild(item);
  } else {
    const title = document.createElement("div");
    title.textContent = node.title;
    title.style.fontWeight = "bold";
    wrapper.appendChild(title);

    (node.children || []).forEach(child =>
      renderNode(child, wrapper, activeTag)
    );
  }

  container.appendChild(wrapper);
}

function renderTree(data, tag = "") {
  const root = document.getElementById("tree");
  root.innerHTML = "";
  renderNode(data, root, tag);
}

(async function main() {
  const data = await loadResources();
  const input = document.getElementById("tagFilter");

  input.addEventListener("input", () =>
    renderTree(data, input.value.trim())
  );

  renderTree(data);
})();
