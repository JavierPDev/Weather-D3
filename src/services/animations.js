/**
 * Retrigger animations on elements. Needed for unit and location change.
 * @param {String} className - Class to remove and add back
 */
export function triggerAnimations(className) {
  const elements = document.getElementsByClassName(className);
  Array.prototype.forEach.call(elements, element => {
    element.style.visibility = 'hidden';
    element.classList.remove(className);
    setTimeout(() => {
      element.classList.add(className);
      element.style.visibility = 'visible';
    }, 100);
  });
}

