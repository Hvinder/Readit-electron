let readitCLose = document.createElement("div");
readitCLose.innerText = "Done";

readitCLose.style.position = "fixed";
readitCLose.style.bottom = "15px";
readitCLose.style.right = "15px";
readitCLose.style.padding = "5px 10px";
readitCLose.style.fontSize = "20px";
readitCLose.style.fontWeight = "bold";
readitCLose.style.background = "dodgerblue";
readitCLose.style.color = "white";
readitCLose.style.borderRadius = "5px";
readitCLose.style.cursor = "default";
readitCLose.style.boxShadow = "2px 2px 2px rgba(0,0,0,0.2)";
readitCLose.style.zIndex = "9999";

readitCLose.onclick = (e) => {
  window.opener.postMessage({
      action: 'delete-reader-item',
      itemIndex: '{{index}}'
  }, "*")
};

document.getElementsByTagName("body")[0].append(readitCLose);
