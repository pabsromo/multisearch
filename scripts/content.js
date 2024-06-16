chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "changeDOM") {
      document.body.style.backgroundColor = request.color; // Example action
      console.log('hit the enter key and in content.js');
      // highlightText("examples", "Examples");
      // getAllElems();

      highlightTextNodes(request.tex);

      // // Get the body element to start traversing from
      // const bodyElement = document.body;

      // // Get all visible text from the body element
      // const allVisibleText = getAllVisibleText(bodyElement);
      // // console.log(allVisibleText);

      sendResponse({result: "DOM changed"});
    }
  });

// const article = document.querySelector("article");

// // alert("hey there!");

// // `document.querySelector` may return null if the selector doesn't match anything.
// if (article) {
//   const text = article.textContent;
//   const wordMatchRegExp = /[^\s]+/g; // Regular expression
//   const words = text.matchAll(wordMatchRegExp);
//   // matchAll returns an iterator, convert to array to get word count
//   const wordCount = [...words].length;
//   const readingTime = Math.round(wordCount / 200);
//   const badge = document.createElement("p");
//   // Use the same styling as the publish information in an article's header
//   badge.classList.add("color-secondary-text", "type--caption");
//   badge.textContent = `⏱️ ${readingTime} min read`;

//   // Support for API reference docs
//   const heading = article.querySelector("h1");
//   // Support for article docs with date
//   const date = article.querySelector("time")?.parentNode;

//   (date ?? heading).insertAdjacentElement("afterend", badge);
// }

function highlightText(elementId, textToHighlight) {
    var element = document.getElementById(elementId);
    var innerHTML = element.innerHTML;
    var index = innerHTML.indexOf(textToHighlight);
    if (index >= 0) { 
        innerHTML = innerHTML.substring(0, index) + "<span id='highlight1' style='background-color: yellow;'>" + textToHighlight + "</span>" + innerHTML.substring(index + textToHighlight.length);
        element.innerHTML = innerHTML;
    }
}

function getAllElems() {
  var all = document.getElementsByTagName("*");

  for (var i=0, max=all.length; i < max; i++) {
      console.log("------TEXT:")
      console.log(all[i].outerText);
      console.log();
  }
}

function highlightTextNodes(targetString) {
  console.log("Target string:" + targetString);
  function getVisibleTextNodes(element) {
      const textNodes = [];
      function traverse(node) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
              const style = window.getComputedStyle(node.parentElement);
              if (style.display !== 'none' && style.visibility !== 'hidden') {
                  textNodes.push(node);
              }
          } else {
              for (let child = node.firstChild; child; child = child.nextSibling) {
                  traverse(child);
              }
          }
      }
      traverse(element);
      return textNodes;
  }

  function highlightNode(node) {
      const span = document.createElement('span');
      span.classList.add('highlight');
      span.textContent = node.textContent;
      node.parentNode.replaceChild(span, node);
  }

  const textNodes = getVisibleTextNodes(document.body);
  textNodes.forEach(node => {
      if (node.textContent.includes(targetString)) {
          highlightNode(node);
      }
  });
}

// // Call the function with the target string
// highlightTextNodes('targetString');


// // Function to recursively traverse through DOM elements
// function getAllVisibleText(element) {
//   let visibleText = '';

//   // Check if the element is visible
//   function isVisible(el) {
//     return !!(
//       el.offsetWidth ||
//       el.offsetHeight ||
//       el.getClientRects().length
//     );
//   }

//   // Function to traverse through each element and gather text
//   function traverse(node) {
//     if (node.nodeType === Node.TEXT_NODE) {
//       // Text node
//       visibleText += node.textContent.trim() + ' ';
//     } else if (node.nodeType === Node.ELEMENT_NODE) {
//       // Element node
//       if (isVisible(node)) {
//         for (let child of node.childNodes) {
//           traverse(child);
//         }
//       }
//     }
//   }

//   traverse(element);
  
//   return visibleText.trim();
// }
