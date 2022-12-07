function traverse(elm) {
  for (var i = 0; i < elm.childNodes.length; i++) {
    // recursively call to traverse
    if ((elm.nodeType = Node.ELEMENT_NODE)) {
      traverse(elm.childNodes[i]);
    }
  }

  if (elm.tagName == "SPAN") {
    if (elm.innerHTML.match(/\*\*[1,2,3,4,6,\*]/g)) console.log(elm.innerHTML);

    if (elm.innerHTML.includes("***")) {
      elm.innerHTML = elm.innerHTML.replace("***", "");
      elm.innerHTML = `<h2 class='tittel'>${elm.innerHTML}</h2>`;
    } else if (elm.innerHTML.match(/\*\*[1]/g)) {
      elm.innerHTML = elm.innerHTML.replace("**1", "");
      elm.innerHTML = `<h2 class='color1'>${elm.innerHTML}</h2>`;
    } else if (elm.innerHTML.match(/\*\*[2]/g)) {
      elm.innerHTML = elm.innerHTML.replace("**2", "");
      elm.innerHTML = `<h2 class='color2'>${elm.innerHTML}</h2>`;
    } else if (elm.innerHTML.match(/\*\*[3]/g)) {
      elm.innerHTML = elm.innerHTML.replace("**3", "");
      elm.innerHTML = `<h2 class='color3'>${elm.innerHTML}</h2>`;
    } else if (elm.innerHTML.match(/\*\*[4]/g)) {
      elm.innerHTML = elm.innerHTML.replace("**4", "");
      elm.innerHTML = `<h2 class='color4'>${elm.innerHTML}</h2>`;
    } else if (elm.innerHTML.match(/\*\*[5]/g)) {
      elm.innerHTML = elm.innerHTML.replace("**5", "");
      elm.innerHTML = `<h2 class='color5'>${elm.innerHTML}</h2>`;
    } else if (elm.innerHTML.match(/\*\*[6]/g)) {
      elm.innerHTML = elm.innerHTML.replace("**6", "");
      elm.innerHTML = `<h2 class='color6'>${elm.innerHTML}</h2>`;
    }
  }
}

function callback(mutationList, observer) {
  mutationList.forEach((mutation) => {
    switch (mutation.type) {
      case "childList":
        //        console.dir(mutation.oldValue);
        /* One or more children have been added to and/or removed
             from the tree.
             (See mutation.addedNodes and mutation.removedNodes.) */
        break;
      case "attributes":
        if (
          mutation.target &&
          mutation.target.innerText &&
          mutation.target.innerText.match(/^\*\*[1,2,3,4,5,6,\*]/g)
        ) {
          traverse(mutation.target);
          //console.dir(mutation);
        }
        break;
    }
  });
}

const observer = new MutationObserver(callback);

const observerOptions = {
  childList: true,
  attributes: true,
  characterData: true,

  // Omit (or set to false) to observe only changes to the parent node
  subtree: true,
};

observer.observe(document, observerOptions);
