let isDialogOpen = false;
let existingDialogCloseHandler = null;

export function showModal(contents, closeHandler) {
  if (isDialogOpen) {
    throw new Error("Dialog is already open");
  }
  const dialog = document.querySelector("#modalDialog");

  if (existingDialogCloseHandler !== null) {
    dialog.removeEventListener("close", existingDialogCloseHandler);
    existingDialogCloseHandler = null;
  }

  dialog.replaceChildren();
  dialog.returnValue = "";
  dialog.appendChild(contents);
  dialog.addEventListener("close", closeHandler);
  dialog.addEventListener("close", internalRecordClosed);
  existingDialogCloseHandler = closeHandler;
  dialog.showModal();
  isDialogOpen = true;
}

export function close(result) {
  if (!isDialogOpen) {
    throw new Error("Dialog is not open");
  }
  const dialog = document.querySelector("#modalDialog");
  dialog.close(result);
}

export function getReturnValue() {
  const dialog = document.querySelector("#modalDialog");
  return dialog.returnValue;
}

function internalRecordClosed() {
  isDialogOpen = false;
}
