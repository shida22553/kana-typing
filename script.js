let globalFirstKeyCode = null;
let globalSecondKeyCode = null;
let globalLog = "";

window.onload = () => {
  initKeys();
  addEventListeners();
};

function initKeys() {
  for (let i = 0; i < 4; i++) {
    const rowDiv = document.querySelector(`#key-row${i}`);
    const thisRowKeys = keys.filter(key => key.y == i);
    thisRowKeys.forEach(key => {
      const keyDiv = document.createElement("div");
      keyDiv.classList.add("key");
      keyDiv.id = `key${key.id}`;
      const labelSpan = document.createElement("span");
      const label = document.createTextNode(key.label);
      labelSpan.appendChild(label);
      const kanaSpan = document.createElement("span");
      const kana = document.createTextNode(key.kana);
      kanaSpan.appendChild(kana);
      keyDiv.appendChild(labelSpan);
      keyDiv.appendChild(kanaSpan);
      rowDiv.appendChild(keyDiv);
    });
  }
};

function addEventListeners() {
  document.addEventListener("keydown", (e) => {
    console.log(e.code);
    if (globalFirstKeyCode == null) {
      globalFirstKeyCode = e.code;
      const hitKey = keys.find(key => {
        return key.codePairs.some(codePair => {
          const codePairJson = JSON.stringify(codePair);
          const inputJson = JSON.stringify([globalFirstKeyCode]);
          return codePairJson == inputJson;
        })
      });
      if (hitKey) {
        flushKey(hitKey);
        resetGlobalKeys();
      }
    } else {
      globalSecondKeyCode = e.code;
      const hitKey = keys.find(key => {
        return key.codePairs.some(codePair => {
          const codePairJson = JSON.stringify(codePair);
          const inputJson = JSON.stringify([globalFirstKeyCode, globalSecondKeyCode]);
          return codePairJson == inputJson;
        })
      });
      if (hitKey) {
        flushKey(hitKey);
      }
      resetGlobalKeys();
    }
  })
}

function resetGlobalKeys() {
  globalFirstKeyCode = null;
  globalSecondKeyCode = null;
}

function flushKey(key) {
  const keyDiv = document.querySelector(`#key${key.id}`);
  keyDiv.classList.remove("highlighted");
  window.requestAnimationFrame((time1) => {
    window.requestAnimationFrame((time2) => {
      keyDiv.classList.add('highlighted');
    });
  });
  const log = document.querySelector("#log");
  globalLog += key.kana;
  log.value = globalLog;
}
