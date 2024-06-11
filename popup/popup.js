document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('mainInput');
  
    if (!inputField) {
      console.error('The input field with ID "mainInput" was not found.');
      return;
    }
  
    inputField.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const inputValue = inputField.value;
        console.log('Enter key pressed. Input value:', inputValue);
  
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tabId = tabs[0].id;
  
          // Inject content script
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['scripts/content.js']
          }, () => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              return;
            }
            
            // Send a message to the content script
            chrome.tabs.sendMessage(tabId, { action: "changeDOM", color: inputValue }, function (response) {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
              } else {
                console.log(response.result);
              }
            });
          });
        });
      }
    });
  });
  

// document.addEventListener('DOMContentLoaded', function () {
//     const inputField = document.getElementById('mainInput');
  
//     inputField.addEventListener('keydown', function (event) {
//       if (event.key === 'Enter') {
//         // Your script logic here
//         console.log('Enter key pressed');
//         // Example function call or any other logic
//         // runYourFunction();
//         highlightText(inputField.value, inputField.value)
//       }
//     });
  
//     function runYourFunction() {
//       // Your function logic here
//       console.log('Function is running');
//       alert("You pressed the enter key!");
//     }

//     function highlightText(elementId, textToHighlight) {
//         var element = document.getElementById(elementId);
//         var innerHTML = element.innerHTML;
//         var index = innerHTML.indexOf(textToHighlight);
//         if (index >= 0) { 
//             innerHTML = innerHTML.substring(0, index) + "<span id='highlight1' style='background-color: yellow;'>" + textToHighlight + "</span>" + innerHTML.substring(index + textToHighlight.length);
//             element.innerHTML = innerHTML;
//         }
//     }
//   });
  